import { Types } from "mongoose";
import { PreRegistration } from "../../../feature/preRegistration/domains/preRegistration.entity";
import { createMongoSchema } from "../createSchema";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";

export const mongoPreRegistrationSchema = createMongoSchema<PreRegistration>({
  classType: { type: Types.ObjectId, ref: "classType" },
  communicationType: String,
  isRegister: Boolean,
  level: { type: Types.ObjectId, ref: "level" },
  otherComment: String,
  parentAddress: String,
  parentEmail: String,
  parentFirstName: String,
  parentFullName: String,
  parentLastName: String,
  parentPhoneNumber: String,
  job: String,
  nationality: String,
  preferredLanguage: String,
  previousSchoolInfo: String,
  status: String,
  studentAddress: String,
  studentBirthDate: Date,
  studentEmail: String,
  studentFirstName: String,
  studentFullName: String,
  studentGender: String,
  studentLastName: String,
  studentPhoneNumber: String,
  studentEnrollmentReason: String,
  birthCertificate: [fileSchema],
  previousTranscripts: [fileSchema],
  spokenLanguages: [{ type: String }],
});
