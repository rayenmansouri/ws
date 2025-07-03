import { Types } from "mongoose";
import { Invoice } from "../../../feature/studentPayments/invoice.entity";
import { createMongoSchema } from "../createSchema";

export const mongoInvoiceSchema = createMongoSchema<Invoice>({
  invoiceType: String,
  status: String,
  discount: Number,
  amount: Number,
  dates: [{ type: Date }],
  dueDate: Date,
  paidAt: Date,
  adminIdPaidBy: Types.ObjectId,
  adminIdUnPaidBy: Types.ObjectId,
  email: String,
  phoneNumber: String,
  isMerged: Boolean,
  levels: [{ type: Types.ObjectId, ref: "level" }],
  mergedInto: Types.ObjectId,
  mergedInvoices: [{ type: Types.ObjectId, ref: "invoice" }],
  parent: { type: Types.ObjectId, ref: "parent" },
  remindedByEmailAt: Date,
  remindedByPhoneAt: Date,
  services: [
    {
      _id: { type: Types.ObjectId, ref: "service" },
      amount: Number,
      discount: Number,
      month: Number,
      name: String,
      newId: String,
    },
  ],
  students: [
    {
      schoolYear: { type: Types.ObjectId, ref: "schoolYear" },
      student: { type: Types.ObjectId, ref: "student" },
    },
  ],
  paymentMethod: String,
  paymentSplits: [
    {
      adminIdPaidBy: { type: Types.ObjectId, ref: "admin" },
      adminIdUnPaidBy: { type: Types.ObjectId, ref: "admin" },
      amount: Number,
      bankCheck: { type: Types.ObjectId, ref: "bankCheck" },
      bankTransfer: { type: Types.ObjectId, ref: "bankTransfer" },
      dueDate: Date,
      paidAt: Date,
      parent: { type: Types.ObjectId, ref: "parent" },
      paymentMethod: String,
      status: String,
      unPaidAt: Date,
    },
  ],
  unPaidAt: Date,
  mergedAt: Date,
  mergedBy: { type: Types.ObjectId, ref: "admin" },
});
