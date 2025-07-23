import { Types } from "mongoose";
import { SchoolYear } from "../../../feature/schoolYears/domain/schoolYear.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSchoolYearSchema = createMongoSchema<SchoolYear>({
  name: String,
  startDate: Date,
  endDate: Date,
  level: { type: Types.ObjectId, ref: "level" },
});
