import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  invoices: z
    .array(validateID())
    .min(2)
    .refine(
      invoiceIds => new Set(invoiceIds.map(id => id.toString())).size === invoiceIds.length,
      "invoice ids must be unique",
    ),
});
type TBody = z.infer<typeof body>;

export type MergeInvoicesValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const mergeInvoicesValidation = {
  body,
};
