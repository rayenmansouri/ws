import { z } from "zod";

const body = z.object({
  amount: z.coerce.number().positive().optional(),
  description: z.string().min(0).max(255).optional(),
  name: z.string().max(100),
});
type TBody = z.infer<typeof body>;

export type AddExpenseValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addExpenseValidation = {
  body,
};
