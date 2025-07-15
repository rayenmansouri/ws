import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListBankChecksValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listBankChecksValidation = {
  query,
};
