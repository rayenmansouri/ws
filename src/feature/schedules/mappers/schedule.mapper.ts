import { TAttendanceEnum } from "../../sessionManagement/domain/session.entity";
import { ScheduleDTO } from "../dtos/schedule.dto";

export class ScheduleMapper {
  static toScheduleDTO<T>(schedule: T, attendance: TAttendanceEnum | null): ScheduleDTO<T> {
    return { ...schedule, attendance };
  }
}
