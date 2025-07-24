import { injectable } from "inversify";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { TOPIC_TYPE_ENUM } from "../../../helpers/constants";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { SESSION_STATUS_ENUM } from "../../sessionManagement/domain/session.entity";

@injectable()
export class DeleteSubSubjectFromClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(classTypeNewId: string, subSubjectTypeNewId: string): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const subSubjectType = await this.subSubjectTypeRepo.findOneByNewIdOrThrow(
      subSubjectTypeNewId,
      "notFound.subSubjectType",
    );

    const subject = classType.subjects.find(
      subject =>
        !!subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectType._id),
    );

    if (!subject) throw new BadRequestError("notFound.subSubjectType");

    const classDoc = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classDoc) throw new BadRequestError("class.alreadyGenerated");

    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    classDocs.forEach(classDoc => {
      const teacherOfSubject = classDoc.subSubjectTeacherMap[subSubjectType._id.toString()];

      if (!!teacherOfSubject) throw new BadRequestError("subject.stillTaught");
    });

    const filteredSubjects = classType.subjects.map(subject => {
      if (subject.subjectType === subject.subjectType) {
        const filetedSubSubjects = subject.subSubjects.filter(
          subSubject => subSubject.subSubjectType !== subSubjectType._id,
        );
        return { ...subject, subSubjects: filetedSubSubjects };
      }
      return subject;
    });

    await this.classTypeRepo.updateOneById(classType._id, { subjects: filteredSubjects });
    const classIds = classDocs.map(classDoc => classDoc._id);
    await this.classRepo.removeSubSubject(classIds, subSubjectType._id);

    const sessions = await this.sessionRepo.find({
      classIds: classIds,
      topicId: subSubjectType._id,
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      status: SESSION_STATUS_ENUM.WAITING,
    });

    await this.sessionRepo.deleteManyByIds(sessions.map(session => session._id));
    await this.weeklySessionRepo.deleteManyByClassesAndTopic(
      classIds,
      subSubjectType._id,
      TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
    );

    const subSubject = subject.subSubjects.find(
      subSubject => subSubject.subSubjectType === subSubjectType._id,
    );

    if (!subSubject) throw new InternalError("SubSubject Not Found");
  }
}
