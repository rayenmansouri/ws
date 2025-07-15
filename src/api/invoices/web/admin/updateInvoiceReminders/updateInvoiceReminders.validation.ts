import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const body = z.object({
  email: z.string().email().nullish(),
  phoneNumber: z.string().nullish(),
});
type TBody = z.infer<typeof body>;

export type UpdateInvoiceRemindersValidation = {
  params: TParams;
  body: TBody;
  query: never;
};

export const updateInvoiceRemindersValidation = {
  params,
  body,
};
