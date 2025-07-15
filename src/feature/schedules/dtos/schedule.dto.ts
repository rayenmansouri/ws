import { TAttendanceEnum } from "../../../database/schema/pedagogy/session/session.schema";

export type ScheduleDTO<T> = T & { attendance: TAttendanceEnum | null };
