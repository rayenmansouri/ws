import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type Expense = {
  name: string;
  description: string | null;
  amount: number | null;
} & BaseEntity;

export type ExpenseMetaData = GenerateMetaData<Expense, never>;
