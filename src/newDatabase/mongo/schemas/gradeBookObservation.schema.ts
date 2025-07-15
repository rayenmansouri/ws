import { Schema, Types } from "mongoose";
import { GradeBookObservation } from "../../../feature/gradeBookObservation/gradeBookObservation.entity";
import { createMongoSchema } from "../createSchema";

export const mongoGradeBookObservationSchema = createMongoSchema<GradeBookObservation>({
  topicId: { type: Types.ObjectId, refPath: "topicType" },
  topicType: String,
  class: { type: Types.ObjectId, ref: "class" },
  term: { type: Types.ObjectId, ref: "term" },
  observations: Schema.Types.Mixed,
  ibInvestments: Schema.Types.Mixed,
});
