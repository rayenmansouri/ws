import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";

export type GradeReportTemplate = {
  name: string;
  subjectTypes: ID[];
  classTypes: ID[];
  isDefault: boolean;
  isBuiltIn: boolean;
} & BaseEntity;

export type GradeReportTemplateMetaData = GenerateMetaData<
  GradeReportTemplate,
  {
    subjectTypes: SubjectType[];
    classTypes: ClassType[];
  }
>;
