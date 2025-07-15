import { Types } from "mongoose";
import { VerificationCode } from "../../../feature/authentication/domain/verificationCode.entity";
import { createMongoSchema } from "../createSchema";

export const mongoVerificationCodeSchema = createMongoSchema<VerificationCode>({
  user: { type: Types.ObjectId, refPath: "userType" },
  userType: { type: String },
  verificationCode: { type: String },
  verificationCodeExpiresAt: { type: Date },
  isUsed: { type: Boolean },
  //@ts-ignore
  parentId: { type: Types.ObjectId, ref: "parent" },
  studentId: { type: Types.ObjectId, ref: "student" },
  teacherId: { type: Types.ObjectId, ref: "teacher" },
  adminId: { type: Types.ObjectId, ref: "admin" },
});
