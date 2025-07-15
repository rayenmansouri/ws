import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type SubjectType = {
  name: string;
  preferredStartingHours: number[];
  illustration: string;
} & BaseEntity;

export type SubjectTypeMetaData = GenerateMetaData<SubjectType, never>;
