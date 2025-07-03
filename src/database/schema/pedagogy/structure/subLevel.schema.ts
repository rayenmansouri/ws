import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { ILevel, levelSchema } from "./level.schema";

export interface ISubLevel extends IEntity {
  name: string;
  hasSections: boolean;
  level: ILevel;
  rank: number;
}

export const subLevelSchema = createSchema<ISubLevel>({
  name: String,
  hasSections: Boolean,
  level: levelSchema,
  rank: { type: Number, required: true },
});
