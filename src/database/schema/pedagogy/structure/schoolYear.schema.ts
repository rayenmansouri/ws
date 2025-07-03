import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { ITerm, termSchema } from "./term.schema";

export interface ISchoolYear extends IEntity {
  name: string;
  startDate: Date;
  endDate: Date;
  terms: ITerm[];
  level: ObjectId;
}

export const schoolYearSchema = createSchema<ISchoolYear>({
  name: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  terms: [termSchema],
  level: { type: mongoose.Types.ObjectId, ref: "level" },
});
