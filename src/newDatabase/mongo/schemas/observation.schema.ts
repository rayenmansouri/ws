import { Types } from "mongoose";
import { Observation } from "../../../feature/observations/domain/observation.entity";
import { newfileSchema } from "../../../types/entities";
import { createMongoSchema } from "../createSchema";
import { mongoObservationReasonSchema } from "./observationReason.schema";

export const mongoObservationSchema = createMongoSchema<Observation>({
  observationReason: mongoObservationReasonSchema,
  issuer: { type: Types.ObjectId, refPath: "issuerType" },
  issuerType: { type: String },
  note: String,
  students: [{ type: Types.ObjectId, ref: "student" }],
  class: { type: Types.ObjectId, ref: "class" },
  group: { type: Types.ObjectId, ref: "group" },
  files: [newfileSchema],
  session: { type: Types.ObjectId, ref: "session" },
});
