import { injectable } from "inversify";
import { uniq } from "lodash";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { SESSION_STATUS_ENUM } from "../../../database/schema/pedagogy/session/session.schema";
import { ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { DeleteSubSubjectFromClassTypeUseCase } from "./DeleteSubSubjectFromClassType.usecase";

@injectable()
export class DeleteSubjectFromClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("DeleteSubSubjectFromClassTypeUseCase")
    private deleteSubSubjectFromClassTypeUseCase: DeleteSubSubjectFromClassTypeUseCase,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(classTypeNewId: string, subjectTypeNewId: string): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new BadRequestError("notFound.subject");

    const classDoc = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classDoc) throw new BadRequestError("class.alreadyGenerated");

    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    const hasSubSubjects = subject.subSubjects.length > 0;
    if (!hasSubSubjects) {
      classDocs.forEach(classDoc => {
        const teacherOfSubject = classDoc.subjectTeacherMap[subjectType._id.toString()];

        if (!!teacherOfSubject) throw new BadRequestError("subject.stillTaught");
      });
    }

    const classIds = classDocs.map(classDoc => classDoc._id);

    if (hasSubSubjects) {
      const subSubjectIds = subject.subSubjects.map(subSubject => subSubject.subSubjectType);

      const subSubjectTypes = await this.subSubjectTypeRepo.findManyByIds(subSubjectIds);

      const deleteSubSubjectFromClassTypePromises = subSubjectTypes.map(subSubjectType =>
        this.deleteSubSubjectFromClassTypeUseCase.execute(classTypeNewId, subSubjectType.newId),
      );

      await Promise.all(deleteSubSubjectFromClassTypePromises);
    } else {
      const sessions = await this.sessionRepo.find({
        classIds,
        topicId: subjectType._id,
        topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
        status: SESSION_STATUS_ENUM.WAITING,
      });

      await this.sessionRepo.deleteManyByIds(sessions.map(session => session._id));
      await this.weeklySessionRepo.deleteManyByClassesAndTopic(
        classIds,
        subjectType._id,
        TOPIC_TYPE_ENUM.SUBJECT_TYPE,
      );

      const examTypeIds: ID[] = subject.exams.map(exam => exam.examType);

      await this.examGradeRepo.deleteManyBySubject({
        classIds,
        subjectTypeId: subjectType._id,
        examTypeIds,
      });

      await this.gradeBookObservationRepo.deleteManyByClassAndTopic(
        classIds,
        subjectType._id,
        TOPIC_TYPE_ENUM.SUBJECT_TYPE,
      );

      const homeworkDocs = await this.homeworkRepo.findManyByClassesAndTopic(
        classIds,
        subjectType._id,
        TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      );

      const homeworkPublicIds = homeworkDocs.flatMap(homework =>
        homework.files.map(file => file.public_id),
      );

      const sessionHomeworks = sessions.flatMap(session =>
        session.homeworkGiven.concat(session.homeworkToDo),
      );

      const publicIds = sessionHomeworks
        .flatMap(homework => homework.files.map(file => file.public_id))
        .concat(homeworkPublicIds);

      await this.fileManager.deleteFiles(uniq(publicIds));
    }

    const filteredSubjects = classType.subjects.filter(
      subject => subject.subjectType !== subjectType._id,
    );
    await this.classRepo.removeSubject(classIds, subjectType._id);
    await this.classTypeRepo.updateOneById(classType._id, { subjects: filteredSubjects });
  }
}
