import { Transaction } from "../../transactions/transaction.entity";
import { Distribution, FinanceDashboardDto, LatestTransaction } from "../dtos/financeDashboard.dto";

export class FinanceDashboardMapper {
  static toDistributionDto(data: { name: string; rate: number | null }): Distribution {
    return {
      tag: data.name,
      percentage: (data.rate ?? 0) * 100,
    };
  }

  static toTransactionDto(transaction: Transaction): LatestTransaction {
    return {
      _id: transaction._id,
      name: transaction.name,
      date: transaction.paidAt,
      amount: transaction.amount,
      type: transaction.transactionType,
    };
  }

  static toFinanceDashboardDto(data: {
    incomeAmount: number;
    incomeRate: number | null;
    incomeDistribution: { name: string; rate: number | null; amount: number }[];
    expenseAmount: number;
    expenseRate: number | null;
    expenseDistribution: { name: string; rate: number | null; amount: number }[];
    revenueAmount: number;
    revenueRate: number | null;
    latestTransactions: Transaction[];
  }): FinanceDashboardDto {
    return {
      incomes: {
        amount: data.incomeAmount,
        rate: data.incomeRate,
        distribution: data.incomeDistribution.map(this.toDistributionDto),
      },
      expenses: {
        amount: data.expenseAmount,
        rate: data.expenseRate,
        distribution: data.expenseDistribution.map(this.toDistributionDto),
      },
      revenue: {
        amount: data.revenueAmount,
        rate: data.revenueRate,
      },
      latestTransactions: data.latestTransactions.map(this.toTransactionDto),
    };
  }
}
