import { ID } from "../../../types/BaseEntity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TabName } from "../useCases/getAdminDashboard.usecase";

export type AdminDashboardDTO = {
  totalClasses: number;
  totalStudentsCount: number;
  unaffectedStudentsCount: number;
  affectedStudentsCount: number;
  totalParents: number;
  totalTeachers: number;
  staffCount: number;
  levels: { name: string; _id: ID }[];
  subLevels: {
    name: string;
    totalClasses: number;
    totalStudents: number;
    affectedStudents: number;
    unaffectedStudents: number;
    newId: string;
  }[];
  tabStats: {
    tabName: TabName;
    chartData: { tag: string; percentage: number }[];
    tableData: (AttendanceTable | ObservationGivenTable | SessionCanceledTable)[];
  };
};

export type AttendanceTable = {
  _id: ID;
  newId: string;
  studentFullName: string | null;
  studentAvatar: string | null;
  className: string;
  sessionDate: Date;
  status: string;
};

export type ObservationGivenTable = {
  _id: ID;
  newId: string;
  students: UserProfileDTO[];
  issuerFullName: string | null;
  issuerAvatar: string | null;
  reason: string | null;
  urgency: string;
};

export type SessionCanceledTable = {
  _id: ID;
  newId: string;
  teacherFullName: string | null;
  teacherAvatar: string | null;
  sessionStartDate: Date;
  reasonForCanceling: string;
  className: string;
  topicName: string;
};
