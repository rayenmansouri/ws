import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { TransactionRepo } from "../../transactions/transaction.repo";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { TeacherPaymentHistoryRepo } from "../../teacherPayment/domain/TeacherPaymentHistory.repo";
import { ID } from "../../../types/BaseEntity";
import moment from "moment";
import { TLanguageEnum } from "../../../translation/constants";
import { divide } from "lodash";
import { FinanceService } from "../domains/financeDashboard.service";
import { translate } from "../../../translation/helper/translate";
import { FinanceDashboardMapper } from "../mappers/financeDashboard.mapper";
import { FinanceDashboardDto } from "../dtos/financeDashboard.dto";
import { TRANSACTION_TYPE_ENUM } from "../../transactions/transaction.entity";

export type GetFinanceDashboardParams = {
  startDate: Date;
  endDate: Date;
  levelIds: ID[];
};

@injectable()
export class GetFinanceDashboardUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TransactionRepo") private transactionRepo: TransactionRepo,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("TeacherPaymentHistoryRepo")
    private teacherPaymentHistoryRepo: TeacherPaymentHistoryRepo,
    @inject("Language") private language: TLanguageEnum,
  ) {}

  async execute(params: GetFinanceDashboardParams): Promise<FinanceDashboardDto> {
    const { startDate, endDate, levelIds } = params;

    const previousStartDate = moment(startDate).subtract(1, "year").toDate();

    const previousEndDate = moment(endDate).subtract(1, "year").toDate();

    await this.levelRepo.findManyByIdsOrThrow(levelIds, "notFound.level");

    const currentTransactionAmountByTypePromise =
      this.transactionRepo.getTransactionTotalAmountByType(startDate, endDate, levelIds);
    const previousTransactionAmountByTypePromise =
      this.transactionRepo.getTransactionTotalAmountByType(
        previousStartDate,
        previousEndDate,
        levelIds,
      );

    const totalAmountInEachServicePromise = this.invoiceRepo.calculateServicesTotalAmount(
      startDate,
      endDate,
      levelIds,
    );

    const currentTotalInvoiceAmountPromise = this.invoiceRepo.getTotalInvoicesAmount(
      startDate,
      endDate,
      levelIds,
    );

    const previousTotalInvoiceAmountPromise = this.invoiceRepo.getTotalInvoicesAmount(
      previousStartDate,
      previousEndDate,
      levelIds,
    );

    const currentTeacherTotalSalaryPromise =
      this.teacherPaymentHistoryRepo.calculateTotalTeachersSalary(startDate, endDate, levelIds);

    const previousTeacherTotalSalaryPromise =
      this.teacherPaymentHistoryRepo.calculateTotalTeachersSalary(
        previousStartDate,
        previousEndDate,
        levelIds,
      );

    const [
      currentTransactionAmountByType,
      previousTransactionAmountByType,
      totalAmountInEachService,
      currentTotalInvoiceAmount,
      previousTotalInvoiceAmount,
      currentTeacherTotalSalary,
      previousTeacherTotalSalary,
    ] = await Promise.all([
      currentTransactionAmountByTypePromise,
      previousTransactionAmountByTypePromise,
      totalAmountInEachServicePromise,
      currentTotalInvoiceAmountPromise,
      previousTotalInvoiceAmountPromise,
      currentTeacherTotalSalaryPromise,
      previousTeacherTotalSalaryPromise,
    ]);

    const currentExpenseTransactionAmount =
      currentTransactionAmountByType.find(
        transaction => transaction.transactionType === TRANSACTION_TYPE_ENUM.EXPENSE,
      )?.totalAmount ?? 0;

    const currentTotalExpenseAmount = currentExpenseTransactionAmount + currentTeacherTotalSalary;

    // total invoices amount without tax rate
    const totalServicesAmount = totalAmountInEachService.reduce(
      (acc, service) => acc + service.amount,
      0,
    );

    const currentServiceTransactionAmount =
      currentTransactionAmountByType.find(
        transaction => transaction.transactionType === TRANSACTION_TYPE_ENUM.SERVICE,
      )?.totalAmount ?? 0;

    const currentTotalIncomeAmountWithTaxRate = currentServiceTransactionAmount + currentTotalInvoiceAmount; //prettier-ignore

    const currentTotalIncomeAmountWithoutTaxRate = currentServiceTransactionAmount + totalServicesAmount; //prettier-ignore

    const previousExpenseTransactionAmount =
      previousTransactionAmountByType.find(
        transaction => transaction.transactionType === TRANSACTION_TYPE_ENUM.EXPENSE,
      )?.totalAmount ?? 0;

    const previousTotalExpenseAmount = previousExpenseTransactionAmount + previousTeacherTotalSalary; //prettier-ignore

    const previousServicesTransactionAmount =
      previousTransactionAmountByType.find(
        transaction => transaction.transactionType === TRANSACTION_TYPE_ENUM.SERVICE,
      )?.totalAmount ?? 0;

    const previousTotalIncomeAmountWithTaxRate = previousServicesTransactionAmount + previousTotalInvoiceAmount; //prettier-ignore

    const expenseTransactionDistributionPromise = this.transactionRepo.getTransactionsDistribution(
      { startDate, endDate },
      levelIds,
      { transactionType: "expense", totalAmount: currentTotalExpenseAmount },
    );
    const serviceTransactionDistributionPromise = this.transactionRepo.getTransactionsDistribution(
      { startDate, endDate },
      levelIds,
      { transactionType: "service", totalAmount: currentTotalIncomeAmountWithoutTaxRate },
    );

    const [expenseTransactionDistribution, serviceTransactionDistribution] = await Promise.all([
      expenseTransactionDistributionPromise,
      serviceTransactionDistributionPromise,
    ]);

    const invoiceServicesDistribution = totalAmountInEachService.map(service => ({
      name: service.name,
      rate: divide(service.amount, currentTotalIncomeAmountWithoutTaxRate),
      amount: service.amount,
    }));

    const incomeDistribution = FinanceService.sortDistribution([
      ...serviceTransactionDistribution,
      ...invoiceServicesDistribution,
    ]);

    const expenseDistribution = FinanceService.sortDistribution([
      ...expenseTransactionDistribution,
      {
        name: translate("teacher.salary", this.language)!,
        rate: divide(currentTeacherTotalSalary, currentTotalExpenseAmount),
        amount: currentTeacherTotalSalary,
      },
    ]).filter(item => item.amount > 0);

    const incomeRate = FinanceService.calculateRate(
      currentTotalIncomeAmountWithTaxRate,
      previousTotalIncomeAmountWithTaxRate,
    );
    const expenseRate = FinanceService.calculateRate(
      currentTotalExpenseAmount,
      previousTotalExpenseAmount,
    );

    const totalCurrentRevenue = currentTotalIncomeAmountWithTaxRate - currentTotalExpenseAmount;
    const totalPreviousRevenue = previousTotalIncomeAmountWithTaxRate - previousTotalExpenseAmount;
    const revenueRate = FinanceService.calculateRate(totalCurrentRevenue, totalPreviousRevenue);

    const transactions = await this.transactionRepo.getLatestTransactionByRange(
      startDate,
      endDate,
      levelIds,
    );

    return FinanceDashboardMapper.toFinanceDashboardDto({
      incomeAmount: currentTotalIncomeAmountWithTaxRate,
      incomeRate,
      incomeDistribution,
      expenseAmount: currentTotalExpenseAmount,
      expenseRate: expenseRate != null ? expenseRate * -1 : null,
      expenseDistribution,
      revenueAmount: totalCurrentRevenue,
      revenueRate,
      latestTransactions: transactions,
    });
  }
}
