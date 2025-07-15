import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { SESSION_STATUS_ENUM } from "../../../database/schema/pedagogy/session/session.schema";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { School } from "../../schools/domain/school.entity";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SessionApplicationService } from "../applicationServices/Session.application.service";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";

type AddSessionForClassDtoRequest = {
  topicType: OmitFromEnum<TTopicTypeEnum, "group">;
  topicNewId: string;
  sessionTypeNewId: string;
  startTime: Date;
  endTime: Date;
  classGroupNewId?: string;
  classNewId: string;
  classroomNewId: string;
};

type AddSessionForClassDtoResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    classGroup: string | null;
    group: string | null;
  };
};

@injectable()
export class AddSessionForClassUseCase {
  constructor(
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SessionTypeRepo") private SessionTypeRepo: SessionTypeRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SessionApplicationService")
    private sessionApplicationService: SessionApplicationService,
    @inject("School") private school: School,
    @inject("Language") private language: TLanguageEnum,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(data: AddSessionForClassDtoRequest): Promise<AddSessionForClassDtoResponse> {
    const { topicType, topicNewId, startTime, endTime, sessionTypeNewId, classroomNewId } = data;

    const currentTimeOfSchool = getCurrentTimeOfSchool(this.school._id);

    SessionService.ensureSessionRangeValid({ startTime, endTime }, currentTimeOfSchool);

    const topicRepo =
      topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE ? this.subjectTypeRepo : this.subSubjectTypeRepo;

    const classGroup = data.classGroupNewId
      ? await this.classGroupRepo.findOneByNewIdOrThrow(data.classGroupNewId, "notFound.classGroup")
      : null;

    const topic = await topicRepo.findOneByNewIdOrThrow(topicNewId, `notFound.${topicType}`);

    const sessionType = await this.SessionTypeRepo.findOneByNewIdOrThrow(
      sessionTypeNewId,
      "notFound.sessionType",
    );

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(data.classNewId, "notFound.class");

    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );

    const teacherId =
      classDoc.subjectTeacherMap[topic._id] || classDoc.subSubjectTeacherMap[topic._id];

    if (!teacherId) throw new BadRequestError("session.notTeacherAssigned");

    const sessionValidationResult = await this.validateSessionAvailability({
      startTime: startTime,
      endTime: endTime,
      classId: classDoc._id,
      classGroupId: classGroup?._id,
      classroomId: classroom._id,
      teacherId: teacherId,
    });

    const isValid = sessionValidationResult.isValid;

    if (!isValid) throw new BadRequestError("invalid.session", sessionValidationResult);

    const sessionDoc = await this.sessionRepo.addOne({
      status: SESSION_STATUS_ENUM.WAITING,
      sessionType,
      startTime,
      endTime,
      teacher: teacherId,
      class: classDoc._id,
      classroom: classroom._id,
      classGroup: classGroup?._id || null,
      subjectType: topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE ? topic._id : null,
      subSubjectType: topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE ? topic._id : null,
      group: null,
      files: [],
      attendence: {},
      notes: [],
      sessionSummary: null,
      homeworkGiven: [],
      homeworkToDo: [],
      launchTime: null,
      closeTime: null,
      week: null,
      isClosedForced: false,
      reasonForCanceling: null,
      canceledBy: null,
      isTeacherPaid: false,
    });

    return { ...sessionValidationResult, sessionId: sessionDoc._id };
  }

  private async validateSessionAvailability(data: {
    startTime: Date;
    endTime: Date;
    classId: ID;
    classGroupId: ID | undefined;
    classroomId: ID;
    teacherId: ID;
  }): Promise<AddSessionForClassDtoResponse> {
    const { startTime, endTime, classId, classGroupId, classroomId, teacherId } = data;

    const isClassroomAvailable = await this.sessionApplicationService.isClassroomAvailable({
      classroomId: classroomId,
      startDate: startTime,
      endDate: endTime,
    });

    const isTeacherAvailable = await this.sessionApplicationService.isTeacherAvailable({
      teacherId,
      startDate: startTime,
      endDate: endTime,
    });

    const isClassGroupAvailable = classGroupId
      ? await this.sessionApplicationService.isClassGroupAvailable({
          classGroupId: classGroupId,
          startDate: startTime,
          endDate: endTime,
        })
      : true;

    const isClassAvailable = !classGroupId
      ? await this.sessionApplicationService.isClassAvailable({
          classIds: [classId],
          startDate: startTime,
          endDate: endTime,
        })
      : true;

    const sessionEvaluationResult = SessionService.evaluateSessionRequirements(
      {
        isClassAvailable,
        isClassGroupAvailable,
        isTeacherAvailable,
        isClassroomAvailable,
        isGroupsAvailable: true,
      },
      this.language,
    );

    return { ...sessionEvaluationResult, sessionId: null };
  }
}
