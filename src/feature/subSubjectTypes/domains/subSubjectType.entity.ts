import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type SubSubjectType = {
  name: string;
  preferredStartingHours: number[];
  illustration: string;
} & BaseEntity;

export type SubSubjectTypeMetaData = GenerateMetaData<SubSubjectType, never>;
