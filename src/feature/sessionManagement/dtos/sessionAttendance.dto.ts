import { TAttendanceEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type SessionAttendanceDTO = {
  student: UserProfileDTO;
  attendance: TAttendanceEnum | null;
  previousAttendance: TAttendanceEnum | null;
}[];
