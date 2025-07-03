import mongoose from "mongoose";
import { AppVersion } from "../../../feature/masters/domain/AppVersion.entity";
import { createMongoSchema } from "../createSchema";

export const mongoAppVersionSchema = createMongoSchema<AppVersion>({
  version: String,
  os: String,
});

export const mongoAppVersionModel = mongoose.model<AppVersion>("appVersion", mongoAppVersionSchema);
