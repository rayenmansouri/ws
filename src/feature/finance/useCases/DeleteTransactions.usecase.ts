import { injectable } from "inversify/lib/inversify";
import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { TransactionRepo } from "../../transactions/transaction.repo";

type DeleteTransactionsUseCaseParams = {
  transactionIds: ID[];
};

@injectable()
export class DeleteTransactionsUseCase {
  constructor(@inject("TransactionRepo") private transactionRepo: TransactionRepo) {}

  async execute(params: DeleteTransactionsUseCaseParams): Promise<void> {
    const { transactionIds } = params;
    await this.transactionRepo.findManyByIdsOrThrow(transactionIds, "notFound.transaction");
    await this.transactionRepo.deleteManyByIds(transactionIds);

    return;
  }
}
