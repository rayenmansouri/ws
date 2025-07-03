import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ISection extends IEntity {
  name: string;
  subLevels: ObjectId[];
}

export const sectionSchema = createSchema<ISection>({
  name: String,
  subLevels: [{ type: mongoose.Types.ObjectId, ref: "subLevel" }],
});
