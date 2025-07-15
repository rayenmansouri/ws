import { injectable } from "inversify/lib/inversify";
import { ExpenseRepo } from "../domain/Expense.repo";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class DeleteExpenseUseCase {
  constructor(@inject("ExpenseRepo") private expenseRepo: ExpenseRepo) {}

  async execute(expenseNewId: string): Promise<void> {
    await this.expenseRepo.findOneByNewIdOrThrow(expenseNewId, "notFound.expense");

    await this.expenseRepo.deleteOneByNewId(expenseNewId);
  }
}
