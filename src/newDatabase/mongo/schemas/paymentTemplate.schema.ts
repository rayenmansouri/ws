import { Types } from "mongoose";
import { PaymentTemplate } from "../../../feature/studentPayments/domain/paymentTemplate.entity";
import { createMongoSchema } from "../createSchema";

export const mongoPaymentTemplateSchema = createMongoSchema<PaymentTemplate>({
  name: String,
  services: [
    {
      _id: { type: Types.ObjectId, ref: "service" },
      name: String,
      amount: Number,
      newId: String,
      discount: Number,
    },
  ],
  discount: Number,
  totalAmount: Number,
});
