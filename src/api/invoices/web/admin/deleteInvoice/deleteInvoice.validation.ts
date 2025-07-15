import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteInvoiceValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteInvoiceValidation = {
  params,
};
