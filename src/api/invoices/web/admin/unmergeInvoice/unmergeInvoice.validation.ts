import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnmergeInvoiceValidation = {
  params: TParams;
  body: never;
  query: never;
};

export const unmergeInvoiceValidation = {
  params,
};
