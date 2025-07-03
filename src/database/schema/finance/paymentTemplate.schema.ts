import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { getEmbeddedSchema } from "../../helpers/getEmbeddedSchema";
import { IServiceWithDiscount } from "./Invoice.schema";
import { serviceSchema } from "./service.schema";

export interface IPaymentTemplate extends IEntity {
  name: String;
  services: IServiceWithDiscount[];
  discount: number;
  totalAmount: number;
}

export const paymentTemplateSchema = createSchema<IPaymentTemplate>({
  name: String,
  services: [{ ...getEmbeddedSchema(serviceSchema), discount: Number, default: [] }],
  discount: Number,
  totalAmount: Number,
});
