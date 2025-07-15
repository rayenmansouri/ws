import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { WeeklySessionApplicationService } from "../applicationService/WeeklySession.application.service";
import { WeeklySession } from "../domains/weeklySession.entity";
import { WeeklySessionService } from "../domains/weeklySession.service";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";

type WeeklySessionDate = {
  day: number;
  hours: number;
  minutes: number;
};

type UpdateWeeklySessionForClassData = Partial<{
  sessionTypeNewId: string;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  classroomNewId: string;
  classGroupNewId: string | null;
  week: "A" | "B" | null;
}>;

type TUpdateWeeklySessionForClassResponse = {
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
export class UpdateWeeklySessionForClassUseCase {
  constructor(
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("SessionTypeRepo") private sessionType: SessionTypeRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("ClassGroupRepo") private groupRepo: ClassGroupRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("WeeklySessionApplicationService")
    private weeklySessionApplicationService: WeeklySessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
  ) {}

  async execute(
    weeklySessionNewId: string,
    data: UpdateWeeklySessionForClassData,
  ): Promise<TUpdateWeeklySessionForClassResponse> {
    const weeklySession = await this.weeklySessionRepo.findOneByNewIdOrThrow(
      weeklySessionNewId,
      "notFound.weeklySession",
    );

    if (!weeklySession.class) throw new BadRequestError("weeklySession.cannotBeUpdated");

    const { sessionTypeNewId, startTime, endTime, classroomNewId, classGroupNewId, week } = data;

    const sessionType = sessionTypeNewId
      ? await this.sessionType.findOneByNewIdOrThrow(sessionTypeNewId, "notFound.sessionType")
      : null;

    const classroom = classroomNewId
      ? await this.classroomRepo.findOneByNewIdOrThrow(classroomNewId, "notFound.classroom")
      : null;

    const classGroup = classGroupNewId
      ? await this.classGroupRepo.findOneByNewIdOrThrow(classGroupNewId, "notFound.group")
      : null;

    const result = await this.validateSessionAvailability(
      { ...weeklySession, class: weeklySession.class },
      {
        classroomDoc: classroom,
        classGroupDoc: classGroup,
        startTime: startTime || null,
        endTime: endTime || null,
        week: week || null,
      },
    );

    if (!result.isValid) throw new BadRequestError("invalid.weeklySession", result);

    const startTimeStamps =
      data.startTime &&
      WeeklySessionService.covertHoursAndMinutesToTimestamp(
        data.startTime.hours,
        data.startTime.minutes,
      );

    const endTimeStamps =
      data.endTime &&
      WeeklySessionService.covertHoursAndMinutesToTimestamp(
        data.endTime.hours,
        data.endTime.minutes,
      );

    await this.weeklySessionRepo.updateOneById(weeklySession._id, {
      sessionType: sessionType?._id,
      classroom: classroom?._id,
      classGroup: classGroup?._id,
      startTime: startTime ? { day: startTime.day, timeStamps: startTimeStamps! } : undefined,
      endTime: endTime ? { day: endTime.day, timeStamps: endTimeStamps! } : undefined,
      week,
    });

    return result;
  }

  async validateSessionAvailability(
    currentWeeklySession: WeeklySession & { class: ID },
    data: {
      classroomDoc: Classroom | null;
      classGroupDoc: ClassGroup | null;
      startTime: WeeklySessionDate | null;
      endTime: WeeklySessionDate | null;
      week: "A" | "B" | null;
    },
  ): Promise<TUpdateWeeklySessionForClassResponse> {
    const isClassGroupAvailable = data.classGroupDoc
      ? await this.validateNewClassGroup(currentWeeklySession, {
          ...data,
          classGroupDoc: data.classGroupDoc,
        })
      : true;

    const isClassroomAvailable = data.classroomDoc
      ? await this.validateNewClassroom(currentWeeklySession, {
          ...data,
          classroomDoc: data.classroomDoc,
        })
      : true;

    const isTeacherAvailable = await this.validateTeacherAvailability(currentWeeklySession, data);
    const isClassAvailable = await this.validateClassAvailability(currentWeeklySession, data);

    const result = SessionService.evaluateSessionRequirements(
      {
        isGroupsAvailable: true,
        isClassGroupAvailable,
        isClassroomAvailable,
        isClassAvailable,
        isTeacherAvailable,
      },
      this.language,
    );

    return { ...result, weeklySessionId: currentWeeklySession._id };
  }

  private async validateNewClassGroup(
    currentWeeklySession: WeeklySession & { class: ID },
    data: {
      classGroupDoc: ClassGroup;
      startTime: WeeklySessionDate | null;
      endTime: WeeklySessionDate | null;
      week: "A" | "B" | null;
    },
  ): Promise<boolean> {
    const { classGroupDoc, startTime, endTime, week } = data;
    const { day: startDay, timeStamps: startTimeStamps } = currentWeeklySession.startTime;
    const { hours: startHours, minutes: startMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(startTimeStamps);

    const { day: endDay, timeStamps: endTimeStamps } = currentWeeklySession.endTime;
    const { hours: endHours, minutes: endMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(endTimeStamps);

    const isStartTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.startTime.day, hours: startHours, minutes: startMinutes },
      startTime || undefined,
    );
    const isEndTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.endTime.day, hours: endHours, minutes: endMinutes },
      endTime || undefined,
    );

    const hasSessionTimeChanged = isStartTimeChange || isEndTimeChange;
    const isWeekChanged = week !== currentWeeklySession.week;
    const isClassGroupChanged = classGroupDoc._id !== currentWeeklySession.classGroup;
    if (!isClassGroupChanged && !hasSessionTimeChanged && !isWeekChanged) return true;

    const isClassGroupAvailable = await this.weeklySessionApplicationService.isClassAvailable({
      classIds: [currentWeeklySession.class],
      startTime: data.startTime || { day: startDay, hours: startHours, minutes: startMinutes },
      endTime: data.endTime || { day: endDay, hours: endHours, minutes: endMinutes },
      week: week || currentWeeklySession.week || undefined,
      classGroupId: data.classGroupDoc._id,
    });

    return isClassGroupAvailable;
  }

  private async validateNewClassroom(
    currentWeeklySession: WeeklySession & { class: ID },
    data: {
      classroomDoc: Classroom;
      startTime: WeeklySessionDate | null;
      endTime: WeeklySessionDate | null;
      week: "A" | "B" | null;
    },
  ): Promise<boolean> {
    const { classroomDoc, startTime, endTime, week } = data;

    const { day: startDay, timeStamps: startTimeStamps } = currentWeeklySession.startTime;

    const { hours: startHours, minutes: startMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(startTimeStamps);

    const { day: endDay, timeStamps: endTimeStamps } = currentWeeklySession.endTime;
    const { hours: endHours, minutes: endMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(endTimeStamps);

    const isStartTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.startTime.day, hours: startHours, minutes: startMinutes },
      startTime || undefined,
    );
    const isEndTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.endTime.day, hours: endHours, minutes: endMinutes },
      endTime || undefined,
    );

    const hasSessionTimeChanged = isStartTimeChange || isEndTimeChange;
    const isClassroomChanged = classroomDoc._id !== currentWeeklySession.classroom;
    const isWeekChanged = week !== currentWeeklySession.week;

    if (!isClassroomChanged && !hasSessionTimeChanged && !isWeekChanged) return true;

    const isClassroomAvailable = await this.weeklySessionApplicationService.isClassroomAvailable({
      classId: currentWeeklySession.class,
      startTime: data.startTime || { day: startDay, hours: startHours, minutes: startMinutes },
      endTime: data.endTime || { day: endDay, hours: endHours, minutes: endMinutes },
      week: week || currentWeeklySession.week || undefined,
      classroomId: data.classroomDoc._id,
      excludeWeeklySessionId: currentWeeklySession._id,
    });

    return isClassroomAvailable;
  }

  private async validateTeacherAvailability(
    currentWeeklySession: WeeklySession & { class: ID },
    data: {
      startTime: WeeklySessionDate | null;
      endTime: WeeklySessionDate | null;
      week: "A" | "B" | null;
    },
  ): Promise<boolean> {
    const { startTime, endTime, week } = data;

    const { day: startDay, timeStamps: startTimeStamps } = currentWeeklySession.startTime;
    const { hours: startHours, minutes: startMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(startTimeStamps);

    const { day: endDay, timeStamps: endTimeStamps } = currentWeeklySession.endTime;
    const { hours: endHours, minutes: endMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(endTimeStamps);

    const isStartTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.startTime.day, hours: startHours, minutes: startMinutes },
      startTime || undefined,
    );
    const isEndTimeChange = WeeklySessionService.isPeriodChange(
      { day: currentWeeklySession.endTime.day, hours: endHours, minutes: endMinutes },
      endTime || undefined,
    );

    const hasSessionTimeChanged = isStartTimeChange || isEndTimeChange;
    const isWeekChanged = week !== currentWeeklySession.week;
    if (!hasSessionTimeChanged && !isWeekChanged) return true;

    const isTeacherAvailable = await this.weeklySessionApplicationService.isTeacherAvailable({
      classId: currentWeeklySession.class,
      startTime: data.startTime || { day: startDay, hours: startHours, minutes: startMinutes },
      endTime: data.endTime || { day: endDay, hours: endHours, minutes: endMinutes },
      week: week || currentWeeklySession.week || undefined,
      teacherId: currentWeeklySession.teacher,
      excludeWeeklySessionId: currentWeeklySession._id,
    });

    return isTeacherAvailable;
  }

  private async validateClassAvailability(
    currentWeeklySession: WeeklySession & { class: ID },
    data: {
      startTime: WeeklySessionDate | null;
      endTime: WeeklySessionDate | null;
      week: "A" | "B" | null;
    },
  ): Promise<boolean> {
    const { startTime, endTime, week } = data;

    const hasSessionTimeChanged = !!startTime || !!endTime;
    const isWeekChanged = week !== currentWeeklySession.week;
    if (!hasSessionTimeChanged && !isWeekChanged) return true;

    const { day: startDay, timeStamps: startTimeStamps } = currentWeeklySession.startTime;
    const { hours: startHours, minutes: startMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(startTimeStamps);

    const { day: endDay, timeStamps: endTimeStamps } = currentWeeklySession.endTime;
    const { hours: endHours, minutes: endMinutes } =
      WeeklySessionService.extractHourAndMinutesFromTimeStamps(endTimeStamps);

    const isClassAvailable = await this.weeklySessionApplicationService.isClassAvailable({
      classIds: [currentWeeklySession.class],
      startTime: data.startTime || { day: startDay, hours: startHours, minutes: startMinutes },
      endTime: data.endTime || { day: endDay, hours: endHours, minutes: endMinutes },
      week: week || currentWeeklySession.week || undefined,
      classGroupId: currentWeeklySession.classGroup || undefined,
    });

    return isClassAvailable;
  }
}
