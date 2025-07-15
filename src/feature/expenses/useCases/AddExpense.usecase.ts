import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExpenseRepo } from "../domain/Expense.repo";

type AddExpenseUseCaseRequest = {
  name: string;
  description?: string;
  amount?: number;
};

@injectable()
export class AddExpenseUseCase {
  constructor(@inject("ExpenseRepo") private expenseRepo: ExpenseRepo) {}

  async execute(expense: AddExpenseUseCaseRequest): Promise<void> {
    await this.expenseRepo.ensureFieldUniqueness("name", expense.name, "alreadyUsed.name");

    await this.expenseRepo.addOne({
      name: expense.name,
      description: expense.description || null,
      amount: expense.amount !== undefined ? expense.amount : null,
    });
  }
}
