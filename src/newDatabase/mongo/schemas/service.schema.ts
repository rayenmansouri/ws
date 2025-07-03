import { Service } from "../../../feature/studentPayments/service.entity";
import { createMongoSchema } from "../createSchema";

export const mongoServiceSchema = createMongoSchema<Service>({
  name: String,
  description: String,
  showByDefault: Boolean,
  amount: Number,
  invoiceType: String,
});
