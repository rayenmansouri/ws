import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type GroupType = {
  name: string;
  coefficient: number | null;
  illustration: string;
} & BaseEntity;

export type GroupTypeMetaData = GenerateMetaData<GroupType, never>;
