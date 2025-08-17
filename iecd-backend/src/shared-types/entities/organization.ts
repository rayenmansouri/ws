import { OrganizationSystemType, GradeBookTheme } from '../enums';

export type OrganizationInput = {
    name: string;
    subdomain: string;
    email: string;
    organizationSystemType: OrganizationSystemType;
    address: string;
    directorName: string;
    configName: string;
    maxStudentSeats: number;
    gradeBookTheme: GradeBookTheme;
    enableEmail: boolean;
    enableSms?: boolean;
};

export type Organization = {
  id: string;
  website: string;
  subdomain: string;
  phoneNumber: string;
  directorName: string;
  timeZone: string | null;
  logo: string | null;
  forceCloseSessionDelayInMin: number;
  openSessionDelayInMin: number;
  openSessionAdvanceInMin: number;
  maxStudentSeats: number;
  notAvailableTimes: { day: number; hours: number[] }[];
  enableEmail: boolean;
  cover: string;
} & OrganizationInput;