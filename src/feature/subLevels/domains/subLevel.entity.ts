import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";

export type SubLevel = {
  name: string;
  hasSections: boolean;
  level: Level;
  rank: number;
} & BaseEntity;

export type SubLevelMetaData = GenerateMetaData<
  SubLevel,
  { "level.currentSchoolYear.level": Level }
>;
