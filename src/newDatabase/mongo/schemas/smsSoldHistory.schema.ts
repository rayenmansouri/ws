import { Types } from "mongoose";
import mongoose from "mongoose";
import { SmsSoldHistory } from "../../../feature/schools/domain/smsSoldHistory.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSmsSoldHistorySchema = createMongoSchema<SmsSoldHistory>({
  addedAt: Date,
  smsCount: Number,
  operation: String,
  master: { type: Types.ObjectId, ref: "masters" },
  school: { type: Types.ObjectId, ref: "school" },
});

export const mongoSmsSoldHistoryModel = mongoose.model<SmsSoldHistory>(
  "smsSoldHistories",
  mongoSmsSoldHistorySchema,
);
