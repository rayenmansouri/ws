import { z } from "zod";
import { validateDate, validateID, validateNewId } from "../../../../../core/validator";
import { TRANSACTION_TYPE_ENUM } from "../../../../../feature/transactions/transaction.entity";

const body = z.object({
  transaction: validateID(),
  level: validateID(),
  amount: z.coerce.number().positive(),
  transactionType: z.nativeEnum(TRANSACTION_TYPE_ENUM),
  paidAt: validateDate(),
  supplier: validateNewId().optional(),
  description: z.string().min(1).nullish(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  transactionId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UpdateTransactionsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTransactionsValidation = {
  body,
  params,
};
