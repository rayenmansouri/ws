import { TGradeReportThemEnum } from "../domain/school.entity";
import { ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { TFeatureFlagsEnum } from "../constants/featureFlags";
import { TInstanceTypeEnum } from "../domain/school.entity";

export type SchoolDTO = {
  _id: ID;
  newId: string;
  name: string;
  subdomain: string;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  logo: string | null;
  dueDate: number;
  taxRate: number;
  maxStudentSeats: number;
  educationDepartment: string | null;
  enableSms: boolean;
  enableEmail: boolean;
  instanceType: TInstanceTypeEnum;
  gradeBookTheme: TGradeReportThemEnum;
  featureFlags: Record<TFeatureFlagsEnum, boolean>;
  financeSignature: IFile | null;
  academicSignature: IFile | null;
  directorName: string | null;
  schedule: {
    startHour: number;
    endHour: number;
    days: number[];
    step: string;
  };
  totalSmsSold: number;
};
