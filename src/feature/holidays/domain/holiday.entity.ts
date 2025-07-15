import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";

export type Holiday = {
  name: string;
  start: Date;
  end: Date;
  levels: ID[];
} & BaseEntity;

export type HolidayMetaData = GenerateMetaData<Holiday, { levels: Level[] }>;
