import { TEstablishmentTitleEnum } from "../../levels/domains/level.entity";

export type StudentDiplomaDTO = {
  schoolId: string;
  studentFullName: string;
  className: string;
  establishmentTitle: TEstablishmentTitleEnum;
  educationDepartment: string;
  schoolYearName: string;
  termName: string;
  diplomaName: string;
  schoolName: string;
  directorName: string | null;
  diplomaTemplate: string;
};
