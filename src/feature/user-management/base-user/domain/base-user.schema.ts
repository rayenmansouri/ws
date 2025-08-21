import mongoose, { Schema, Types } from "mongoose";
import { UserTypeEnum } from "../../factory/enums";
import { BaseUser } from "./base-user.entity";
import { createCompleteSchema } from "../../../../core/database/schema";
import { RoleKey } from "../../../roles/role.schema";
import { DiscriminatorKey } from "../../factory/discriminator";

export const BaseOptions = {
    discriminatorKey: "type",
    collection: "users",
    timestamps: true,
};

export const BaseUserKey = "users";

export const BaseUserSchema = createCompleteSchema<BaseUser>({
    name: BaseUserKey,
    schemaDefinition: new Schema<BaseUser>({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      gender: { type: String, required: true },
      birthDate: { type: Date, required: true },
      type: { type: String, enum: Object.values(DiscriminatorKey), required: true },
      roles: [{ type: Types.ObjectId, ref: RoleKey }],
      password: { type: String, required: true },
      schoolSubdomain: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      fullName: { 
        type: String, 
        required: false,
        default: function() {
          return `${this.firstName} ${this.lastName}`;
        }
      },
      passwordChangedAt: { type: Date, required: false },
      avatar: {
        link: { type: String, required: false },
        name: { type: String, required: false },
        path: { type: String, required: false },
        uploadedAt: { type: Date, required: false },
        size: { type: Number, required: false },
        mimeType: { type: String, required: false },
      },
    },BaseOptions)
});

export const BaseUserModel = mongoose.model<BaseUser>("BaseUser", BaseUserSchema);
