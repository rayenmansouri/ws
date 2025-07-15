import { injectable } from "inversify";
import { inject } from "../../core/container/TypedContainer";
import { BaseEntity, ID } from "../../types/BaseEntity";
import { Supplier } from "./supplier.entity";
import { SupplierRepo } from "./Supplier.repo";
import { TransactionRepo } from "../transactions/transaction.repo";
import { BadRequestError } from "../../core/ApplicationErrors";

@injectable()
export class SupplierService {
  constructor(
    @inject("SupplierRepo") private supplierRepo: SupplierRepo,
    @inject("TransactionRepo") private transactionRepo: TransactionRepo,
  ) {}

  async addSupplier(
    payload: Omit<Supplier, keyof BaseEntity | "fiscalCode"> & { fiscalCode?: string },
  ): Promise<void> {
    await this.supplierRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");

    await this.supplierRepo.addOne({ ...payload, fiscalCode: payload.fiscalCode || null });
  }

  async updateSupplier(
    supplier: Supplier,
    payload: Partial<Omit<Supplier, keyof BaseEntity>>,
  ): Promise<void> {
    if (payload.name && payload.name !== supplier.name)
      await this.supplierRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");

    await this.supplierRepo.updateOneByNewId(supplier.newId, payload);
  }

  async deleteSuppliers(ids: ID[]): Promise<void> {
    const transactionWithSuppliers = await this.transactionRepo.getTransactionsBySuppliers(ids);

    if (transactionWithSuppliers.length > 0) throw new BadRequestError("transaction.haveSupplier");

    await this.supplierRepo.deleteManyByIds(ids);
  }
}
