import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { IObservationReason, observationReasonSchema } from "./observationReason.schema";
import { IFile } from "../../../../feature/sessionManagement/domain/session.entity";
import { fileSchema } from "../../announcement/comment.schema";

export interface IObservation extends IEntity {
  observationReason: IObservationReason;
  issuer: ObjectId;
  issuerType: "teacher" | "admin";
  note: string;
  students: ObjectId[];
  class: ObjectId;
  group: ObjectId;
  files: IFile[];
  session?: ObjectId;
}

export const observationSchema = createSchema<IObservation>({
  observationReason: observationReasonSchema,
  issuer: { type: mongoose.Types.ObjectId, refPath: "issuerType" },
  issuerType: { type: String },
  note: String,
  students: [{ type: mongoose.Types.ObjectId, ref: "student" }],
  class: { type: mongoose.Types.ObjectId, ref: "class" },
  group: { type: mongoose.Types.ObjectId, ref: "group" },
  files: { type: [fileSchema], default: [] },
  session: { type: mongoose.Types.ObjectId, ref: "session" },
});
