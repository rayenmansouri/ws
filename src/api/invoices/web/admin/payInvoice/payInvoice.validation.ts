import { z } from "zod";
import { validateDate, validateID, validateNewId } from "../../../../../core/validator";

const basePaymentSchema = z.object({
  parentId: validateID(),
  splitIndex: z.number().min(1).optional(),
  paymentMethod: z.enum(["cash", "bankCheck", "bankTransfer"]),
});

const cashPaymentSchema = basePaymentSchema.extend({
  paymentMethod: z.literal("cash"),
});

const bankCheckPaymentSchema = basePaymentSchema.extend({
  paymentMethod: z.literal("bankCheck"),
  fullName: z.string().min(1),
  checkNumber: z
    .string()
    .length(7)
    .regex(/^[0-9]\d{6}/, "invalid checkNumber"),
  bankName: z.string(),
  withdrawDate: validateDate().optional(),
});

const bankTransferPaymentSchema = basePaymentSchema.extend({
  paymentMethod: z.literal("bankTransfer"),
  fullName: z.string().min(1),
  amount: z.number().min(1),
  transactionReference: z.string().min(1).optional(),
  transferDate: validateDate(),
  bankName: z.string().optional(),
});

const payInvoiceSchema = z.discriminatedUnion("paymentMethod", [
  cashPaymentSchema,
  bankCheckPaymentSchema,
  bankTransferPaymentSchema,
]);

const body = payInvoiceSchema;

type TBody = z.infer<typeof body>;

const params = z.object({
  invoiceNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export type PayInvoiceValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const payInvoiceValidation = {
  body,
  params,
};
