import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  expenseNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteExpenseValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteExpenseValidation = {
  params,
};
