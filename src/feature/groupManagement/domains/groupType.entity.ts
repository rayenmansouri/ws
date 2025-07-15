import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ExamType } from "../../examTypes/domains/examType.entity";

export type GroupType = {
  name: string;
  coefficient: number | null;
  exams: { examType: ID; coefficient: number }[];
  illustration: string;
} & BaseEntity;

export type GroupTypeMetaData = GenerateMetaData<
  GroupType,
  {
    "exams.examType": ExamType;
  }
>;
