import moment from "moment";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { BaseEntity } from "../../../types/BaseEntity";
import { Session, SESSION_STATUS_ENUM } from "../../sessionManagement/domain/session.entity";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { WeeklySession } from "../../weeklySessions/domains/weeklySession.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";

export class WeeklyScheduleService {
  static findUpcomingWeekdayDate(startDate: Date, targetWeekday: number): Date {
    const firstDay = startDate.getDay();
    const daysToAdd = (targetWeekday - firstDay + 7) % 7;
    return moment(startDate).add(daysToAdd, "days").toDate();
  }

  static calculateScheduleTimeFrames(
    targetWeekday: number,
    range: { startDate: Date; endDate: Date },
  ): Date[] {
    const firstDateInTimeFrames = this.findUpcomingWeekdayDate(range.startDate, targetWeekday);

    const days: Date[] = [];

    const currentDate = moment(firstDateInTimeFrames);

    while (currentDate.isBefore(range.endDate) || currentDate.isSame(range.endDate, "day")) {
      days.push(currentDate.toDate());
      currentDate.add(7, "days");
    }

    return days;
  }

  static isSessionInHoliday(sessionDate: Date, holidays: { start: Date; end: Date }[]): boolean {
    return holidays.some(holiday => {
      return sessionDate >= holiday.start && sessionDate <= holiday.end;
    });
  }

  static isCurrentWeekMatching(
    firstSunday: Date,
    currentSessionDate: Date,
    sessionWeek: "A" | "B" | null,
  ): boolean {
    if (!sessionWeek) return true;
    const start = moment(firstSunday);
    const current = moment(currentSessionDate);

    const differenceInDays = current.diff(start, "days");
    const restOfDivision = differenceInDays % 14;

    const week = restOfDivision < 6 ? "A" : "B";
    return sessionWeek === week;
  }

  static ensureSchoolYearNotEnded(schoolYear: SchoolYear, currentTimeOfSchool: Date): void {
    const isSchoolYearEnd = schoolYear.endDate.getTime() < currentTimeOfSchool.getTime();

    if (isSchoolYearEnd) throw new BadRequestError("schoolYear.hasEnded");
  }

  static generateSessionsFromWeeklySessions(data: {
    weeklySessionToBePublished: Omit<WeeklySession, keyof BaseEntity>[];
    sessionTypes: SessionType[];
    schoolYear: SchoolYear;
    holidays: [];
    currentTimeOfSchool: Date;
    firstSundayOfSchoolYear: Date;
  }): Omit<Session, keyof BaseEntity>[] {
    const {
      weeklySessionToBePublished,
      sessionTypes,
      schoolYear,
      holidays,
      currentTimeOfSchool,
      firstSundayOfSchoolYear,
    } = data;
    const sessionPayloads: Omit<Session, keyof BaseEntity>[] = [];

    for (const weeklySession of weeklySessionToBePublished) {
      const sessionType = sessionTypes.find(
        sessionType => sessionType._id === weeklySession.sessionType,
      )!;

      const dates = WeeklyScheduleService.calculateScheduleTimeFrames(weeklySession.startTime.day, {
        startDate: schoolYear.startDate,
        endDate: schoolYear.endDate,
      });

      dates.forEach(date => {
        const isSessionTimePassed = moment(date)
          .add(weeklySession.startTime.timeStamps, "minutes")
          .isBefore(currentTimeOfSchool);

        if (isSessionTimePassed) return;

        const isSessionInHoliday = WeeklyScheduleService.isSessionInHoliday(date, holidays);
        if (isSessionInHoliday) return;

        const isCurrentWeekMatching = WeeklyScheduleService.isCurrentWeekMatching(
          firstSundayOfSchoolYear,
          date,
          weeklySession.week,
        );
        if (!isCurrentWeekMatching) return;

        const startTime = moment(date).add(weeklySession.startTime.timeStamps, "minutes").toDate();
        const endTime = moment(date).add(weeklySession.endTime.timeStamps, "minutes").toDate();

        sessionPayloads.push({
          class: weeklySession.class,
          week: weeklySession.week,
          sessionType: sessionType,
          startTime,
          endTime,
          attendence: {},
          files: [],
          notes: [],
          sessionSummary: null,
          status: SESSION_STATUS_ENUM.WAITING,
          launchTime: null,
          closeTime: null,
          isClosedForced: false,
          reasonForCanceling: null,
          canceledBy: null,
          isTeacherPaid: false,
          teacher: weeklySession.teacher,
          subjectType: weeklySession.subjectType,
          subSubjectType: weeklySession.subSubjectType,
          classGroup: weeklySession.classGroup,
          group: weeklySession.group,
          classroom: weeklySession.classroom,
        });
      });
    }

    return sessionPayloads;
  }

  static getMaxRangeDate(ranges: { startDate: Date; endDate: Date }[]): {
    startDate: Date;
    endDate: Date;
  } {
    if (ranges.length === 0) throw new BadRequestError("No ranges provided");
    const durations = ranges.map(range => {
      const startDate = moment(range.startDate);
      const endDate = moment(range.endDate);
      return endDate.diff(startDate, "milliseconds");
    });

    const maxDuration = Math.max(...durations);
    const index = durations.findIndex(duration => duration === maxDuration);

    const maxRange = ranges.at(index);

    if (!maxRange) throw new BadRequestError("No range found for the maximum duration");

    return maxRange;
  }
}
