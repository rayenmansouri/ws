import { Types } from "mongoose";
import { StudentPaymentConfiguration } from "../../../feature/studentPayments/studentPaymentConfiguration.entity";
import { createMongoSchema } from "../createSchema";

export const mongoStudentPaymentConfiguration = createMongoSchema<StudentPaymentConfiguration>({
  student: {
    type: Types.ObjectId,
    ref: "student",
  },
  services: [{ name: String }],
  discount: Number,
  totalAmount: Number,
  email: String,
  phoneNumber: String,
});
