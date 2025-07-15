import { injectable } from "inversify/lib/inversify";
import { ID } from "../../../types/BaseEntity";

import { inject } from "../../../core/container/TypedContainer";
import { SupplierRepo } from "../../supplier/Supplier.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { TransactionRepo } from "../../transactions/transaction.repo";
import { ExpenseRepo } from "../../expenses/domain/Expense.repo";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { School } from "../../schools/domain/school.entity";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { TRANSACTION_TYPE_ENUM, TTransactionTypeEnum } from "../../transactions/transaction.entity";

export type AddTransactionUseCaseDto = {
  transactionTypeId: ID;
  levelId: ID;
  amount: number;
  transactionType: TTransactionTypeEnum;
  paidAt: Date;
  supplierNewId: string | null;
  description: string | null;
  adminId: ID;
};
@injectable()
export class AddTransactionUseCase {
  constructor(
    @inject("SupplierRepo") private supplierRepo: SupplierRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TransactionRepo") private transactionRepo: TransactionRepo,
    @inject("ExpenseRepo") private expenseRepo: ExpenseRepo,
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
    @inject("School") private school: School,
  ) {}

  async execute(params: AddTransactionUseCaseDto): Promise<void> {
    const {
      transactionTypeId,
      levelId,
      amount,
      transactionType,
      paidAt,
      supplierNewId,
      description,
      adminId,
    } = params;

    const supplier = supplierNewId
      ? await this.supplierRepo.findOneByNewIdOrThrow(supplierNewId, "notFound.supplier")
      : null;

    const level = await this.levelRepo.findOneByIdOrThrow(levelId, "notFound.level");

    const currentTransactionType =
      transactionType === TRANSACTION_TYPE_ENUM.EXPENSE
        ? await this.expenseRepo.findOneByIdOrThrow(transactionTypeId, "notFound.expense")
        : await this.serviceRepo.findOneByIdOrThrow(transactionTypeId, "notFound.service");

    await this.transactionRepo.addOne({
      level: level._id,
      transactionType,
      name: currentTransactionType.name,
      amount,
      admin: adminId,
      supplier: supplier?._id || null,
      paidAt,
      recordedAt: getCurrentTimeOfSchool(this.school._id),
      description,
    });

    return;
  }
}
