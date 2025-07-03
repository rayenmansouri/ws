import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";

export interface IVerificationCode extends IEntity {
  parentId: ObjectId;
  studentId: ObjectId;
  teacherId: ObjectId;
  adminId: ObjectId;
  verificationCode: string;
  verificationCodeExpiresAt: Date;
  isUsed: boolean;
  user: ObjectId;
  userType: string;
}

export const verificationCodeSchema = createSchema<IVerificationCode>({
  parentId: { type: mongoose.Types.ObjectId, ref: "parent" },
  studentId: { type: mongoose.Types.ObjectId, ref: "student" },
  teacherId: { type: mongoose.Types.ObjectId, ref: "teacher" },
  adminId: { type: mongoose.Types.ObjectId, ref: "admin" },
  user: { type: mongoose.Types.ObjectId, refPath: "userType" },
  userType: { type: String },
  verificationCode: String,
  verificationCodeExpiresAt: Date,
  isUsed: {
    type: Boolean,
    default: false,
  },
});
