import { Types } from "mongoose";
import { TeacherPaymentConfiguration } from "../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";
import { createMongoSchema } from "../createSchema";

export const mongoTeacherPaymentConfigurationSchema =
  createMongoSchema<TeacherPaymentConfiguration>({
    teacher: { type: Types.ObjectId, ref: "teacher" },
    amount: Number,
    attachment: [{ public_id: String, url: String, name: String }],
    bankAccountId: String,
    contractType: String,
    paymentType: String,
  });
