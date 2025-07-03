import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  amount: z.coerce.number().positive().nullable().optional(),
  description: z.string().min(0).max(255).nullable().optional(),
  name: z.string().max(100).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  expenseNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateExpenseValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateExpenseValidation = {
  body,
  params,
};
