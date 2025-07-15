import moment from "moment";
import { Holiday } from "../domain/holiday.entity";
import { HolidayDto, HolidayInScheduleDto } from "../dto/Holiday.dto";

export class HolidayMapper {
  static toHolidayDto(holiday: HolidayDto): HolidayDto {
    return {
      name: holiday.name,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
      levels: holiday.levels.map(level => ({
        newId: level.newId,
        _id: level._id,
        name: level.name,
      })),
      newId: holiday.newId,
    };
  }

  static toHolidayScheduleDto(holiday: Holiday): HolidayInScheduleDto[] {
    const days = moment(holiday.end).diff(moment(holiday.start), "days");
    if (days === 0) {
      return [
        {
          name: holiday.name,
          newId: holiday.newId,
          _id: holiday._id,
          date: holiday.start,
        },
      ];
    }

    let remainingDays = moment(holiday.end);
    return Array.from({ length: days + 1 }).map(() => {
      const date = remainingDays.startOf("day").toDate();
      remainingDays = remainingDays.subtract(1, "days");
      return {
        name: holiday.name,
        newId: holiday.newId,
        _id: holiday._id,
        date,
      };
    });
  }
}
