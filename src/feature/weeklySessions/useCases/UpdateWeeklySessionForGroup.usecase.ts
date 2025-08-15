import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { WeeklySessionApplicationService } from "../applicationService/WeeklySession.application.service";
import { WeeklySession } from "../domains/weeklySession.entity";
import { WeeklySessionService } from "../domains/weeklySession.service";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";

type WeeklySessionDate = {
  day: number;
  hours: number;
  minutes: number;
};

type UpdateWeeklySessionForGroupData = Partial<{
  sessionTypeNewId: string;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  classroomNewId: string;
  week: "A" | "B" | null;
}>;

type UpdateWeeklySessionForGroupResponse = {
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
export class UpdateWeeklySessionForGroupUseCase {
  constructor(
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("SessionTypeRepo") private sessionType: SessionTypeRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("WeeklySessionApplicationService")
    private weeklySessionService: WeeklySessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(
    weeklySessionNewId: string,
    data: UpdateWeeklySessionForGroupData,
  ): Promise<UpdateWeeklySessionForGroupResponse> {
    const { sessionTypeNewId, startTime, endTime, classroomNewId, week } = data;
    const weeklySession = await this.weeklySessionRepo.findOneByNewIdOrThrow(
      weeklySessionNewId,
      "notFound.session",
    );

    if (!weeklySession.group) throw new BadRequestError("weekly session must have a group");

    const sessionType = sessionTypeNewId
      ? await this.sessionType.findOneByNewIdOrThrow(sessionTypeNewId, "notFound.sessionType")
      : undefined;

    const classroom = classroomNewId
      ? await this.classroomRepo.findOneByNewIdOrThrow(classroomNewId, "notFound.classroom")
      : null;

    let updatedStartTime = weeklySession.startTime;
    let updatedEndTime = weeklySession.endTime;
    if (data.startTime) {
      const timestamp = WeeklySessionService.covertHoursAndMinutesToTimestamp(
        data.startTime.hours,
        data.startTime.minutes,
      );

      updatedStartTime = {
        day: data.startTime.day,
        timeStamps: timestamp,
      };
    }

    if (data.endTime) {
      const timestamp = WeeklySessionService.covertHoursAndMinutesToTimestamp(
        data.endTime.hours,
        data.endTime.minutes,
      );

      updatedEndTime = {
        day: data.endTime.day,
        timeStamps: timestamp,
      };
    }

    const result = await this.validateSessionAvailability(
      { ...weeklySession, group: weeklySession.group },
      {
        newClassroomDoc: classroom,
        startTime,
        endTime,
        week,
        oldClassroomId: weeklySession.classroom,
      },
    );

    if (!result.isValid) {
      throw new BadRequestError("invalid.weeklySession", result);
    }

    await this.weeklySessionRepo.updateOneById(weeklySession._id, {
      week: data.week,
      classroom: classroom?._id,
      sessionType: sessionType?._id,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
    });

    return result;
  }

  private async validateSessionAvailability(
    currentWeeklySession: WeeklySession & { group: ID },
    data: {
      newClassroomDoc: Classroom | null;
      startTime: WeeklySessionDate | undefined;
      endTime: WeeklySessionDate | undefined;
      week: "A" | "B" | undefined | null;
      oldClassroomId: ID;
    },
  ): Promise<UpdateWeeklySessionForGroupResponse> {
    const sessionStartTime = WeeklySessionService.extractHourAndMinutesFromTimeStamps(
      currentWeeklySession.startTime.timeStamps,
    );

    const sessionEndTime = WeeklySessionService.extractHourAndMinutesFromTimeStamps(
      currentWeeklySession.endTime.timeStamps,
    );
    const isStartTimeChanged = WeeklySessionService.isPeriodChange(
      {
        day: currentWeeklySession.startTime.day,
        hours: sessionStartTime.hours,
        minutes: sessionStartTime.minutes,
      },
      data.startTime,
    );

    const isEndTimeChanged = WeeklySessionService.isPeriodChange(
      {
        day: currentWeeklySession.endTime.day,
        hours: sessionEndTime.hours,
        minutes: sessionEndTime.minutes,
      },
      data.endTime,
    );

    const isTimeChanged = isStartTimeChanged || isEndTimeChanged;
    const isWeekChanged = data.week !== currentWeeklySession.week;

    const startTime = data.startTime || {
      day: currentWeeklySession.startTime.day,
      hours: sessionStartTime.hours,
      minutes: sessionStartTime.minutes,
    };
    const endTime = data.endTime || {
      day: currentWeeklySession.endTime.day,
      hours: sessionEndTime.hours,
      minutes: sessionEndTime.minutes,
    };

    let isClassroomAvailable = true;
    if (isTimeChanged || data.newClassroomDoc || isWeekChanged) {
      isClassroomAvailable = await this.weeklySessionService.isClassroomAvailable({
        classroomId: data.newClassroomDoc?._id || data.oldClassroomId,
        startTime,
        endTime,
        week: data.week || undefined,
        groupId: currentWeeklySession.group,
        excludeWeeklySessionId: currentWeeklySession._id,
      });
    }

    let isTeacherAvailable = true;
    if (isTimeChanged || isWeekChanged) {
      isTeacherAvailable = await this.weeklySessionService.isTeacherAvailable({
        teacherId: currentWeeklySession.teacher,
        startTime,
        endTime,
        week: data.week || undefined,
        groupId: currentWeeklySession.group,
        excludeWeeklySessionId: currentWeeklySession._id,
      });
    }

    let isGroupAvailable = true;
    if (isTimeChanged || isWeekChanged) {
      isGroupAvailable = await this.weeklySessionService.isGroupAvailable({
        groupIds: [currentWeeklySession.group],
        startTime,
        endTime,
        week: data.week || undefined,
      });
    }

    const result = SessionService.evaluateSessionRequirements(
      {
        isClassGroupAvailable: true,
        isClassroomAvailable,
        isTeacherAvailable,
        isGroupsAvailable: isGroupAvailable,
        isClassAvailable: true,
      },
      this.language,
    );

    return { ...result, weeklySessionId: currentWeeklySession._id };
  }
}
