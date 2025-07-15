import mongoose, { Types } from "mongoose";
import { Student } from "../../../feature/students/domain/student.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

export const mongoStudentSchema = createMongoSchema<Student>({
  firstName: String,
  lastName: String,
  avatar: newfileSchema,
  fullName: String,
  gender: String,
  address1: String,
  address2: String,
  phoneNumber: String,
  birthDate: Date,
  level: { type: mongoose.Types.ObjectId, ref: "level" },
  classType: { type: mongoose.Types.ObjectId, ref: "classType" },
  nextClassType: { type: mongoose.Types.ObjectId, ref: "classType" },
  email: { type: String },
  password: String,
  parents: [{ type: mongoose.Types.ObjectId, ref: "parent" }],
  passwordChangedAt: Date,
  uniqueId: String,
  roles: [{ type: Types.ObjectId }],
  isArchived: Boolean,
  archivedAt: Date,
  isActive: Boolean,
});
