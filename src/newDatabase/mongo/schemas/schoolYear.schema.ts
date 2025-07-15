import { Types } from "mongoose";
import { SchoolYear } from "../../../feature/schoolYears/domain/schoolYear.entity";
import { Term } from "../../../feature/terms/domains/term.entity";
import { createMongoSchema } from "../createSchema";

const termInSchoolYearSchema = createMongoSchema<Term & { startDate: Date; endDate: Date }>({
  name: String,
  coefficient: Number,
  startDate: Date,
  endDate: Date,
});

export const mongoSchoolYearSchema = createMongoSchema<SchoolYear>({
  name: String,
  startDate: Date,
  endDate: Date,
  terms: [termInSchoolYearSchema],
  level: { type: Types.ObjectId, ref: "level" },
});
