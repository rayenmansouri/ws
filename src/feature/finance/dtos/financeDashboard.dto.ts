import { ID } from "../../../types/BaseEntity";
import { TTransactionTypeEnum } from "../../transactions/transaction.entity";

export type Distribution = { tag: string; percentage: number };

export type transactionDistribution = {
  amount: number;
  rate: number | null;
  distribution: Distribution[];
};

export type LatestTransaction = {
  _id: ID;
  name: string;
  date: Date;
  amount: number;
  type: TTransactionTypeEnum;
};

export type FinanceDashboardDto = {
  incomes: transactionDistribution;
  expenses: transactionDistribution;
  revenue: { amount: number; rate: number | null };
  latestTransactions: LatestTransaction[];
};
