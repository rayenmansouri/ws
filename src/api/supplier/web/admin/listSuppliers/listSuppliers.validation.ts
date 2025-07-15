import { z } from "zod";
import { paginationOptionsValidation, validateID } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    expenseId: validateID().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListSuppliersValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listSuppliersValidation = {
  query,
};
