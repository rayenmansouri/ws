import { Expense } from "../../../feature/expenses/domain/expense.entity";
import { createMongoSchema } from "../createSchema";

export const mongoExpenseSchema = createMongoSchema<Expense>({
  name: String,
  description: String,
  amount: Number,
});
