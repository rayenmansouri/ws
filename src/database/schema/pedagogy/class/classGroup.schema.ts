import { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface IClassGroup extends IEntity {
  name: string;
  class: ObjectId;
  students: ObjectId[];
}

export const classGroupSchema = createSchema<IClassGroup>({
  name: {
    type: String,
    unique: false,
  },
  class: {
    type: Types.ObjectId,
    ref: "class",
  },
  students: [
    {
      type: Types.ObjectId,
      ref: "student",
      default: [],
    },
  ],
});
