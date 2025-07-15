import { TAttendanceEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { ScheduleDTO } from "../dtos/schedule.dto";

export class ScheduleMapper {
  static toScheduleDTO<T>(schedule: T, attendance: TAttendanceEnum | null): ScheduleDTO<T> {
    return { ...schedule, attendance };
  }
}
