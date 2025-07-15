import moment from "moment";
import { BadRequestError } from "../../../core/ApplicationErrors";

type Period = {
  day: number;
  hours: number;
  minutes: number;
};
export class WeeklySessionService {
  static validateWeeklySessionDate(
    start: { day: number; hours: number; minutes: number },
    end: { day: number; hours: number; minutes: number },
  ): void {
    const startTimeStamps = start.hours * 60 + start.minutes;
    const endTimeStamps = end.hours * 60 + end.minutes;
    if (startTimeStamps > endTimeStamps) {
      throw new BadRequestError("session.startTimeMustBeBeforeEndTime");
    }
  }

  static extractHourAndMinutesFromTimeStamps(timeStamps: number): {
    hours: number;
    minutes: number;
  } {
    const hours = Math.floor(timeStamps / 60);
    const minutes = timeStamps % 60;
    return { hours, minutes };
  }

  static covertHoursAndMinutesToTimestamp(hours: number, minutes: number): number {
    return hours * 60 + minutes;
  }

  static isPeriodChange(oldPeriod: Period, newPeriod: Period | undefined): boolean {
    if (!newPeriod) return false;

    const oldTimeStamps = moment
      .duration({
        days: oldPeriod.day,
        hours: oldPeriod.hours,
        minutes: oldPeriod.minutes,
      })
      .asSeconds();

    const newTimeStamps = moment
      .duration({
        days: newPeriod.day,
        hours: newPeriod.hours,
        minutes: newPeriod.minutes,
      })
      .asSeconds();
    return oldTimeStamps !== newTimeStamps;
  }
}
