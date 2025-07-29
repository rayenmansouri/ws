import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TAttendanceEnum } from "../domain/session.entity";

export type SessionAttendanceDTO = {
  student: UserProfileDTO;
  attendance: TAttendanceEnum | null;
  previousAttendance: TAttendanceEnum | null;
}[];
