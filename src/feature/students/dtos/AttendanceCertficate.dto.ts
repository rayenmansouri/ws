import { TEstablishmentTitleEnum } from "../../levels/domains/level.entity";

export type AttendanceCertificateDTO = {
  educationDepartment: string;
  establishmentTitle: TEstablishmentTitleEnum;
  schoolId: string;
  schoolName: string;
  schoolSubdomain: string;
  schoolYearName: string;
  student: {
    fullName: string;
    birthDate: Date;
    className: string;
  };
  directorName: string | null;
};
