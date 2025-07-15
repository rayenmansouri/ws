import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetInvoicePdfDataValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getInvoicePdfDataValidation = {
  params,
};
