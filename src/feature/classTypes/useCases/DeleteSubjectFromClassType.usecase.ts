import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { TOPIC_TYPE_ENUM } from "../../../helpers/constants";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { DeleteSubSubjectFromClassTypeUseCase } from "./DeleteSubSubjectFromClassType.usecase";
import { SESSION_STATUS_ENUM } from "../../sessionManagement/domain/session.entity";

@injectable()
export class DeleteSubjectFromClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("DeleteSubSubjectFromClassTypeUseCase")
    private deleteSubSubjectFromClassTypeUseCase: DeleteSubSubjectFromClassTypeUseCase,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
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
    }

    const filteredSubjects = classType.subjects.filter(
      subject => subject.subjectType !== subjectType._id,
    );
    await this.classRepo.removeSubject(classIds, subjectType._id);
    await this.classTypeRepo.updateOneById(classType._id, { subjects: filteredSubjects });
  }
}
