import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExpenseRepo } from "../domain/Expense.repo";

type UpdateExpenseUseCaseRequest = {
  name?: string;
  description?: string | null;
  amount?: number | null;
};

@injectable()
export class UpdateExpenseUseCase {
  constructor(@inject("ExpenseRepo") private expenseRepo: ExpenseRepo) {}

  async execute(expenseNewId: string, payload: UpdateExpenseUseCaseRequest): Promise<void> {
    const expense = await this.expenseRepo.findOneByNewIdOrThrow(expenseNewId, "notFound.expense");

    if (payload.name && payload.name !== expense.name)
      await this.expenseRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");

    await this.expenseRepo.updateOneByNewId(expenseNewId, {
      name: payload.name,
      description: payload.description,
      amount: payload.amount,
    });
  }
}
