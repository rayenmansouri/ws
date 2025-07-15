import { ID } from "../../../types/BaseEntity";
import { SessionAttendanceStats } from "../../sessionManagement/domain/Session.service";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type ClassOverviewDashboardDTO = {
  _id: ID;
  newId: string;
  className: string;
  studentsCount: number;
  femalesCount: number;
  malesCount: number;
  capacity: number;
  level: string;
};

export type CurrentSessionClassDashboardDTO = {
  id: ID;
  newId: string;
  subject: string;
  teacher: UserProfileDTO | null;
  sessionType: string;
  classroom: string;
  attendanceStat: SessionAttendanceStats;
};
