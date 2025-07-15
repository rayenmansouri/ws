import { Types } from "mongoose";
import { Holiday } from "../../../feature/holidays/domain/holiday.entity";
import { createMongoSchema } from "../createSchema";

export const mongoHolidaySchema = createMongoSchema<Holiday>({
  name: { type: String },
  start: { type: Date },
  end: { type: Date },
  levels: [{ type: Types.ObjectId, ref: "level" }],
});
