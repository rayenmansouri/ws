import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type ExamType = {
  name: string;
  rank: number;
} & BaseEntity;

export type ExamTypeMetaData = GenerateMetaData<ExamType, never>;
