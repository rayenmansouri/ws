import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { Group } from "../../groupManagement/domains/group.entity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ID } from "../../../types/BaseEntity";
import { WeeklySessionApplicationService } from "../applicationService/WeeklySession.application.service";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { TLanguageEnum } from "../../../translation/constants";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

type Period = { day: number; hours: number; minutes: number };

type AddWeeklySessionForGroupUseCaseRequest = {
  classroomNewId: string;
  sessionTypeNewId: string;
  startTime: Period;
  endTime: Period;
  groupNewId: string;
  week?: "A" | "B" | undefined;
};

type AddWeeklySessionForGroupUseCaseResponse = {
  isValid: boolean;
  weeklySessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};

@injectable()
export class AddWeeklySessionForGroupUseCase {
  constructor(
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("WeeklySessionApplicationService")
    private weeklySessionApplicationService: WeeklySessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(
    data: AddWeeklySessionForGroupUseCaseRequest,
  ): Promise<AddWeeklySessionForGroupUseCaseResponse> {
    const { classroomNewId, sessionTypeNewId, startTime, endTime, groupNewId } = data;

    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );
    const sessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
      sessionTypeNewId,
      "notFound.sessionType",
    );

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const result = await this.validateWeeklySessionAvailability({
      startTime,
      endTime,
      week: data.week || null,
      group,
      classroom,
      teacherId: group.teacher,
    });
    if (!result.isValid) throw new BadRequestError("invalid.session", result);

    const startTimeStamps = data.startTime.hours * 60 + data.startTime.minutes;
    const endTimeStamps = data.endTime.hours * 60 + data.endTime.minutes;

    const weeklySession = await this.weeklySessionRepo.addOne({
      group: group._id,
      sessionType: sessionType._id,
      classroom: classroom._id,
      startTime: { day: data.startTime.day, timeStamps: startTimeStamps },
      endTime: { day: data.endTime.day, timeStamps: endTimeStamps },
      teacher: group.teacher,
      week: data.week || null,
      isDraft: true,
      subjectType: null,
      subSubjectType: null,
      class: null,
      classGroup: null,
    });

    return { ...result, weeklySessionId: weeklySession._id };
  }

  private async validateWeeklySessionAvailability(data: {
    startTime: Period;
    endTime: Period;
    week: "A" | "B" | null;
    group: Group;
    classroom: Classroom;
    teacherId: ID;
  }): Promise<AddWeeklySessionForGroupUseCaseResponse> {
    const { startTime, endTime, week, group, classroom, teacherId } = data;

    const isClassroomAvailable = await this.weeklySessionApplicationService.isClassroomAvailable({
      classroomId: classroom._id,
      startTime: { day: startTime.day, hours: startTime.hours, minutes: startTime.minutes },
      endTime: { day: endTime.day, hours: endTime.hours, minutes: endTime.minutes },
      week: week || undefined,
      groupId: group._id,
    });

    const isTeacherAvailable = await this.weeklySessionApplicationService.isTeacherAvailable({
      teacherId,
      startTime: { day: startTime.day, hours: startTime.hours, minutes: startTime.minutes },
      endTime: { day: endTime.day, hours: endTime.hours, minutes: endTime.minutes },
      week: week || undefined,
      groupId: group._id,
    });

    const isGroupAvailable = await this.weeklySessionApplicationService.isGroupAvailable({
      groupIds: [group._id],
      startTime: { day: startTime.day, hours: startTime.hours, minutes: startTime.minutes },
      endTime: { day: endTime.day, hours: endTime.hours, minutes: endTime.minutes },
      week: week || undefined,
    });

    const result = SessionService.evaluateSessionRequirements(
      {
        isClassGroupAvailable: true,
        isClassAvailable: true,
        isClassroomAvailable,
        isGroupsAvailable: isGroupAvailable,
        isTeacherAvailable,
      },
      this.language,
    );

    return { ...result, weeklySessionId: null };
  }
}
