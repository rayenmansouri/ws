import { GenerateMetaData } from "../../core/populateTypes";
import { BaseEntity, ID } from "../../types/BaseEntity";
import { Expense } from "../expenses/domain/expense.entity";

export type Supplier = { fiscalCode: string | null; expenses: ID[]; name: string } & BaseEntity;

export type SupplierMetaData = GenerateMetaData<Supplier, { expenses: Expense[] }>;
