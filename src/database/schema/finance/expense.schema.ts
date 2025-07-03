import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";

export interface IExpense extends IEntity {
  name: string;
  description: string;
  amount?: number;
}

export const expenseSchema = createSchema<IExpense>({
  name: String,
  description: String,
  amount: Number,
});
