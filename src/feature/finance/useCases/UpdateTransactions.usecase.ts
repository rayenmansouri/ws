import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";

import { ID } from "../../../types/BaseEntity";
import { Expense } from "../../expenses/domain/expense.entity";
import { ExpenseRepo } from "../../expenses/domain/Expense.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Service } from "../../studentPayments/domain/service.entity";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { SupplierRepo } from "../../supplier/Supplier.repo";
import { TransactionRepo } from "../../transactions/transaction.repo";
import { TRANSACTION_TYPE_ENUM, TTransactionTypeEnum } from "../../transactions/transaction.entity";

type UpdateTransactionsUseCaseParams = Partial<{
  transactionTypeId: ID;
  levelId: ID;
  amount: number;
  transactionType: TTransactionTypeEnum;
  paidAt: Date;
  supplierNewId: string | null;
  description: string | null;
}> & { transactionId: ID };

@injectable()
export class UpdateTransactionsUseCase {
  constructor(
    @inject("SupplierRepo") private supplierRepo: SupplierRepo,
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
    @inject("ExpenseRepo") private expenseRepo: ExpenseRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TransactionRepo") private transactionRepo: TransactionRepo,
  ) {}

  async execute(params: UpdateTransactionsUseCaseParams): Promise<void> {
    const {
      transactionTypeId,
      transactionId,
      levelId,
      amount,
      transactionType,
      paidAt,
      supplierNewId,
      description,
    } = params;

    const transaction = await this.transactionRepo.findOneByIdOrThrow(
      transactionId,
      "notFound.transaction",
    );

    let supplierId: ID | undefined;
    if (supplierNewId) {
      const supplier = await this.supplierRepo.findOneByNewIdOrThrow(
        supplierNewId,
        "notFound.supplier",
      );
      supplierId = supplier._id;
    }

    if (levelId) {
      await this.levelRepo.findOneByIdOrThrow(levelId, "notFound.level");
    }

    let expense: Expense | undefined;
    let service: Service | undefined;
    if (transactionTypeId) {
      if (transactionType == TRANSACTION_TYPE_ENUM.EXPENSE) {
        expense = await this.expenseRepo.findOneByIdOrThrow(transactionTypeId, "notFound.expense");
      } else if (transactionType == TRANSACTION_TYPE_ENUM.SERVICE) {
        service = await this.serviceRepo.findOneByIdOrThrow(transactionTypeId, "notFound.service");
      }
    }

    await this.transactionRepo.updateOneById(transaction._id, {
      level: levelId,
      transactionType,
      name: expense?.name || service?.name,
      amount,
      supplier: supplierId,
      paidAt,
      description,
    });

    return;
  }
}
