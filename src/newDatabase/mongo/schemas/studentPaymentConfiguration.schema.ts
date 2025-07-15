import { Types } from "mongoose";
import { StudentPaymentConfiguration } from "../../../feature/studentPayments/domain/studentPaymentConfiguration.entity";
import { createMongoSchema } from "../createSchema";
import { getEmbeddedSchema } from "../../../database/helpers/getEmbeddedSchema";
import { serviceSchema } from "../../../database/schema/finance/service.schema";

export const mongoStudentPaymentConfiguration = createMongoSchema<StudentPaymentConfiguration>({
  student: {
    type: Types.ObjectId,
    ref: "student",
  },
  discount: Number,
  totalAmount: Number,
  email: String,
  phoneNumber: String,
  emailReminder: Boolean,
  smsReminder: Boolean,
  //@ts-ignore
  services: [{ ...getEmbeddedSchema(serviceSchema), discount: Number, default: [] }],
});
