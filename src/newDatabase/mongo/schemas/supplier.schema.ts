import mongoose from "mongoose";
import { Supplier } from "../../../feature/supplier/supplier.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSupplierSchema = createMongoSchema<Supplier>({
  fiscalCode: String,
  name: String,
  expenses: [{ type: mongoose.Types.ObjectId, ref: "expense" }],
});
