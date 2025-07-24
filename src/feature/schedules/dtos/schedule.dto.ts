import { TAttendanceEnum } from "../../sessionManagement/domain/session.entity";

export type ScheduleDTO<T> = T & { attendance: TAttendanceEnum | null };
