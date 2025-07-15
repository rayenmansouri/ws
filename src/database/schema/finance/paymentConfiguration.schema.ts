import { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { getEmbeddedSchema } from "../../helpers/getEmbeddedSchema";
import { IServiceWithDiscount } from "./Invoice.schema";
import { serviceSchema } from "./service.schema";
import mongoose from "mongoose";

export interface IPaymentConfiguration extends IEntity {
  services: IServiceWithDiscount[];
  emailReminder: boolean;
  email: string | null;
  smsReminder: boolean;
  phoneNumber: string | null;
  discount: number;
  totalAmount: number;
  student: ObjectId;
}

export const paymentConfigurationSchema = createSchema<IPaymentConfiguration>({
  services: [{ ...getEmbeddedSchema(serviceSchema), discount: Number, default: [] }],
  emailReminder: { type: Boolean, default: false },
  email: { type: String, default: null },
  smsReminder: { type: Boolean, default: false },
  phoneNumber: { type: String, default: null },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  student: { type: mongoose.Types.ObjectId, ref: "student" },
});
