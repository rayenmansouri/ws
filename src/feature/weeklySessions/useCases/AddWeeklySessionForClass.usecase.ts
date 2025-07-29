import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { Class } from "../../classes/domain/class.entity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../../helpers/constants";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { WeeklySessionApplicationService } from "../applicationService/WeeklySession.application.service";
import { WeeklySessionService } from "../domains/weeklySession.service";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";

type TAddWeeklySessionForClassData = {
  topicTypeNewId: string;
  topicType: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType">;
  sessionTypeNewId: string;
  startTime: { day: number; hours: number; minutes: number };
  endTime: { day: number; hours: number; minutes: number };
  classroomNewId: string;
  classGroupNewId: string | null;
  week: "A" | "B" | null;
  classNewId: string;
};

type TAddWeeklySessionForClassResponse = {
  isValid: boolean;
  weeklySessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
    classGroup: string | null;
  };
};

@injectable()
export class AddWeeklySessionForClassUseCase {
  constructor(
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("WeeklySessionApplicationService")
    private weeklySessionApplicationService: WeeklySessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(data: TAddWeeklySessionForClassData): Promise<TAddWeeklySessionForClassResponse> {
    WeeklySessionService.validateWeeklySessionDate(data.startTime, data.endTime);

    const topicRepo =
      data.topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE
        ? this.subjectTypeRepo
        : this.subSubjectTypeRepo;

    const topicType = await topicRepo.findOneByNewIdOrThrow(
      data.topicTypeNewId,
      "notFound.topicType",
    );

    const sessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
      data.sessionTypeNewId,
      "notFound.sessionType",
    );

    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      data.classroomNewId,
      "notFound.classroom",
    );

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(data.classNewId, "notFound.class");

    const assignedTeacher =
      classDoc.subjectTeacherMap[topicType._id] || classDoc.subSubjectTeacherMap[topicType._id];

    if (!assignedTeacher) throw new BadRequestError("teacher.notAssignedToClass");

    const classGroup = data.classGroupNewId
      ? await this.classGroupRepo.findOneByNewIdOrThrow(data.classGroupNewId, "notFound.group")
      : null;

    if (classGroup && classDoc.classGroups.includes(classGroup?._id))
      throw new BadRequestError("invalid.group");

    const result = await this.validateWeeklySessionAvailability({
      startTime: data.startTime,
      endTime: data.endTime,
      week: data.week,
      classDoc,
      classroom,
      classGroup,
      teacherId: assignedTeacher,
    });

    if (!result.isValid) throw new BadRequestError("invalid.weeklySession", result);

    const startTimeStamps = data.startTime.hours * 60 + data.startTime.minutes;
    const endTimeStamps = data.endTime.hours * 60 + data.endTime.minutes;

    const weeklySession = await this.weeklySessionRepo.addOne({
      sessionType: sessionType._id,
      subjectType: null,
      subSubjectType: null,
      [data.topicType]: topicType._id,
      group: null,
      startTime: { day: data.startTime.day, timeStamps: startTimeStamps },
      endTime: { day: data.endTime.day, timeStamps: endTimeStamps },
      teacher: assignedTeacher,
      class: classDoc._id,
      classroom: classroom._id,
      classGroup: classGroup?._id || null,
      isDraft: true,
      week: data.week,
    });

    return {
      isValid: true,
      weeklySessionId: weeklySession._id,
      errors: {
        teacher: null,
        classroom: null,
        class: null,
        group: null,
        classGroup: null,
      },
    };
  }

  private async validateWeeklySessionAvailability(data: {
    startTime: TAddWeeklySessionForClassData["startTime"];
    endTime: TAddWeeklySessionForClassData["endTime"];
    week: "A" | "B" | null;
    classDoc: Class;
    classroom: Classroom;
    classGroup: ClassGroup | null;
    teacherId: ID;
  }): Promise<TAddWeeklySessionForClassResponse> {
    const { startTime, endTime, week, classDoc, classroom, classGroup, teacherId } = data;
    const classGroupId = classGroup?._id;

    const isTeacherAvailable = await this.weeklySessionApplicationService.isTeacherAvailable({
      teacherId,
      classId: classDoc._id,
      startTime,
      endTime,
      week: data.week || undefined,
    });

    const isClassroomAvailable = await this.weeklySessionApplicationService.isClassroomAvailable({
      classroomId: classroom._id,
      classId: classDoc._id,
      startTime,
      endTime,
      week: week || undefined,
    });

    const isClassAvailable = await this.weeklySessionApplicationService.isClassAvailable({
      classIds: [classDoc._id],
      startTime,
      endTime,
      week: week || undefined,
      classGroupId,
    });

    const result = SessionService.evaluateSessionRequirements(
      {
        isClassGroupAvailable: classGroupId ? isClassAvailable : true,
        isClassAvailable,
        isClassroomAvailable,
        isGroupsAvailable: true,
        isTeacherAvailable,
      },
      this.language,
    );
    if (result.isValid) return { ...result, weeklySessionId: null };

    return { ...result, weeklySessionId: null };
  }
}
