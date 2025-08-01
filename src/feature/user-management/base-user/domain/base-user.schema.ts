import { Types } from "mongoose";
import { UserTypeEnum } from "../../factory/enums";
import { BaseUser } from "./base-user.entity";
import { createCompleteSchema } from "../../../../core/database/schema";

export const BaseOptions = {
    discriminatorKey: "type",
    collection: "users",
    timestamps: true,
};

export const BaseUserSchema = createCompleteSchema<BaseUser>({
    name: "BaseUser",
    schemaDefinition: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      type: { type: String, enum: Object.values(UserTypeEnum), required: true },
      roles: [{ type: Types.ObjectId, ref: "role" }],
      password: { type: String, required: true },
      schoolSubdomain: { type: String, required: true },
      fullName: { type: String, required: true },
      passwordChangedAt: { type: Date, required: false },
    },
    options: BaseOptions,
});
