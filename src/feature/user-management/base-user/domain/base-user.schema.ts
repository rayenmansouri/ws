import { Schema, Types } from "mongoose";
import { UserTypeEnum } from "../../factory/enums";

export const BaseOptions = {
    discriminatorKey: "type",
    collection: "users",
    timestamps: true,
};

export const BaseUserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: Object.values(UserTypeEnum), required: true },
  roles: [{ type: Types.ObjectId, ref: "role" }],}, BaseOptions);