import { Alert } from "../../../feature/alertManagement/domain/alert.entity";
import { createMongoSchema } from "../createSchema";
import { Types } from "mongoose";

export const mongoAlertSchema = createMongoSchema<Alert>({
  types: {
    notification: Boolean,
    sms: Boolean,
  },
  content: String,
  users: [
    {
      userId: {
        type: Types.ObjectId,
        refPath: "users.userType",
      },
      userType: String,
    },
  ],
  status: String,
  scheduledAt: Date,
  sentAt: Date,
  createdBy: { type: Types.ObjectId, ref: "admin" },
});
