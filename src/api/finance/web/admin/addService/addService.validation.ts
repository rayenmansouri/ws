import { z } from "zod";
import { INVOICE_TYPE_ENUM } from "../../../../../feature/studentPayments/domain/invoice.entity";

const baseService = z.object({
  name: z.string().min(3),
  description: z.string().nullish(),
  showByDefault: z.boolean().optional(),
});

const extraService = z.object({
  invoiceType: z.literal(INVOICE_TYPE_ENUM.EXTRA),
  amount: z.coerce.number().positive().optional(),
});

export const monthlyOrOneTimeService = z.object({
  invoiceType: z.enum([INVOICE_TYPE_ENUM.MONTHLY, INVOICE_TYPE_ENUM.ONE_TIME]),
  amount: z.coerce.number().positive(),
});

const body = baseService.and(extraService.or(monthlyOrOneTimeService));
type TBody = z.infer<typeof body>;

export type AddServiceValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addServiceValidation = {
  body,
};
