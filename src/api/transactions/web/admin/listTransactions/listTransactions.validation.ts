import { z } from "zod";
import { paginationOptionsValidation, validateID } from "../../../../../core/validator";
import { TRANSACTION_TYPE_ENUM } from "../../../../../feature/transactions/transaction.entity";

const query = z
  .object({
    search: z.string().optional(),
    transactionType: z.nativeEnum(TRANSACTION_TYPE_ENUM).optional(),
    level: validateID().optional(),
    description: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListTransactionsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listTransactionsValidation = {
  query,
};
