import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetInvoiceDetailsValidation = {
  params: TParams;
  query: never;
  body: never;
};

export const getInvoiceDetailsValidation = {
  params,
};
