import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";
import { Term } from "../../terms/domains/term.entity";

export type SchoolYear = {
  name: string;
  startDate: Date;
  endDate: Date;
  terms: (Term & { startDate: Date; endDate: Date })[];
  level: ID;
} & BaseEntity;

export type SchoolYearMetaData = GenerateMetaData<SchoolYear, { level: Level }>;
