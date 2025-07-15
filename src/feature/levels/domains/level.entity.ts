import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";

export const EXAM_GRADE_SYSTEM_ENUM = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  AUTOMATIC_PROMOTION: "AUTOMATIC_PROMOTION",
} as const;
export type TExamGradeSystemEnum =
  (typeof EXAM_GRADE_SYSTEM_ENUM)[keyof typeof EXAM_GRADE_SYSTEM_ENUM];

export const ESTABLISHMENT_TITLE_ENUM = {
  PRIVATE_PRIMARY: "PRIVATE_PRIMARY",
  PRIVATE_SECONDARY: "PRIVATE_SECONDARY",
  PRIVATE_MIDDLE: "PRIVATE_MIDDLE",
} as const;
export type TEstablishmentTitleEnum =
  (typeof ESTABLISHMENT_TITLE_ENUM)[keyof typeof ESTABLISHMENT_TITLE_ENUM];

export type Level = {
  name: string;
  currentSchoolYear: SchoolYear;
  rank: number;
  color: string;
  establishmentTitle: TEstablishmentTitleEnum | null;
  examGradeSystem: TExamGradeSystemEnum | null;
} & BaseEntity;

export type LevelMetaData = GenerateMetaData<
  Level,
  {
    "currentSchoolYear.level": Level;
  }
>;
