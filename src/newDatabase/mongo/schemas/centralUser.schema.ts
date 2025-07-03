import { Schema } from "mongoose";
import { autoLeanAndConvertObjectId } from "../../../helpers/databaseHooks";
import { CentralUser } from "../../../feature/users/domain/centralUser.entity";

export const mongoCentralUserSchema = new Schema<CentralUser>(
  {
    email: String,
    phoneNumber: String,
    tenantId: String,
    userId: String,
  },
  { versionKey: false },
);

autoLeanAndConvertObjectId(mongoCentralUserSchema);
