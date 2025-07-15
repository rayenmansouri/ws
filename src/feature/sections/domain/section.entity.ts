import { GenerateMetaData } from "../../../core/populateTypes";
import { ID, BaseEntity } from "../../../types/BaseEntity";
import { SubLevel } from "../../subLevels/domains/subLevel.entity";

export type Section = {
  name: string;
  subLevels: ID[];
} & BaseEntity;

export type SectionMetaData = GenerateMetaData<Section, { subLevels: SubLevel[] }>;
