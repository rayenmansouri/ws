import { FileDetails } from "../../../core/fileManager/FileManager";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { TFeatureFlagsEnum } from "../constants/featureFlags";

export type School = {
  name: string;
  subdomain: string;
  address: string | null;
  phoneNumber: string | null;
  email: string | null;
  directorName: string | null;
  dueDate: number;
  taxRate: number;
  timeZone: string;
  currency: string;
  logo: string | null;
  forceCloseSessionDelayInMin: number;
  openSessionDelayInMin: number;
  openSessionAdvanceInMin: number;
  maxStudentSeats: number;
  notAvailableTimes: { day: number; hours: number[] }[];
  educationDepartment: TEducationDepartmentEnum;
  enableSms: boolean;
  enableEmail: boolean;
  instanceType: TInstanceTypeEnum;
  cover: string;
  // TO be removed after migration
  signature: FileDetails | null;
  financeSignature: FileDetails | null;
  academicSignature: FileDetails | null;
  gradeBookTheme: TGradeReportThemEnum;
  featureFlags: Record<TFeatureFlagsEnum, boolean>;
  schedule: {
    startHour: number;
    endHour: number;
    step: number;
    days: number[];
  };
  totalSmsSold: number;
} & BaseEntity;

export const EDUCATION_DEPARTMENT_ENUM = {
  ARIANA: "أريانة",
  BEJA: "باجة",
  BEN_AROUS: "بن عروس",
  BIZERTE: "بنزرت",
  GABES: "قابس",
  GAFSA: "قفصة",
  JENDOUBA: "جندوبة",
  KAIROUAN: "القيروان",
  KASSERINE: "القصرين",
  KEBILI: "قبلي",
  KEF: "الكاف",
  MAHDIA: "المهدية",
  MANOUBA: "منوبة",
  MEDENINE: "مدنين",
  MONASTIR: "المنستير",
  NABEUL: "نابل",
  SFAX: "صفاقس",
  SIDI_BOUZID: "سيدي بوزيد",
  SILIANA: "سليانة",
  SOUSSE: "سوسة",
  TATAOUINE: "تطاوين",
  TOZEUR: "توزر",
  TUNIS: "تونس",
  ZAGHOUAN: "زغوان",
} as const;
export type TEducationDepartmentEnum =
  (typeof EDUCATION_DEPARTMENT_ENUM)[keyof typeof EDUCATION_DEPARTMENT_ENUM];

export const INSTANCE_TYPE_ENUM = {
  DNC: "DNC", //tunis
  CAR: "CAR", //center africa
  SESAME: "SESAME", //senegal
  CERES: "CERES",
  LIBAN: "JANAH",
} as const;

export type TInstanceTypeEnum = (typeof INSTANCE_TYPE_ENUM)[keyof typeof INSTANCE_TYPE_ENUM];

export const GRADE_REPORT_THEM_ENUM = {
  YELLOW: "yellow",
  BLUE: "blue",
} as const;
export type TGradeReportThemEnum =
  (typeof GRADE_REPORT_THEM_ENUM)[keyof typeof GRADE_REPORT_THEM_ENUM];

export type SchoolMetaData = GenerateMetaData<School, never>;
