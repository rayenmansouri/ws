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
  description: z.string().min(1).optional(),
});
type TBody = z.infer<typeof body>;

export type AddTransactionValidation = {
  body: TBody;
  query: never;
  params: never;
};

export const addTransactionValidation = {
  body,
};
