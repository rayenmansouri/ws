import { BankCheck } from "../../studentPayments/domain/bankCheck.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BankCheckRepo } from "../../studentPayments/domain/BankCheck.repo";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { PaymentServices } from "../../invoices/domain/payment.service";
import { PaymentStrategy, commonPaymentDto } from "../../invoices/domain/paymentStrategy";

export interface BankCheckPaymentStrategyDto extends commonPaymentDto {
  paymentMethod: "bankCheck";
  fullName: string;
  checkNumber: string;
  bankName: string;
  withdrawDate?: Date;
}

@injectable()
export class BankCheckStrategy implements PaymentStrategy {
  constructor(
    @inject("InvoiceRepo") private readonly invoiceRepo: InvoiceRepo,
    @inject("BankCheckRepo") private readonly bankCheckRepo: BankCheckRepo,
  ) {}

  async pay(invoice: Invoice, dto: BankCheckPaymentStrategyDto): Promise<Invoice> {
    if (invoice.paymentSplits.length === 0) {
      return await this.handleFullPayment(invoice, dto);
    } else {
      return await this.handleSplitPayment(invoice, dto);
    }
  }

  private async handleFullPayment(
    invoice: Invoice,
    dto: BankCheckPaymentStrategyDto,
  ): Promise<Invoice> {
    const amount = invoice.amount;
    await this.createBankCheck(invoice, dto, amount);

    return await this.invoiceRepo.payInvoice({
      adminId: dto.adminId,
      parentId: dto.parentId,
      paymentMethod: dto.paymentMethod,
      invoiceId: invoice._id,
      isMerged: invoice.isMerged,
      paidAt: getCurrentTimeOfSchool(dto.tenantId),
      mergedInvoicesIds: invoice.mergedInvoices,
    });
  }

  private async handleSplitPayment(
    invoice: Invoice,
    dto: BankCheckPaymentStrategyDto,
  ): Promise<Invoice> {
    PaymentServices.validateSplitIndex(invoice, dto.splitIndex);

    if (!PaymentServices.isSplitUsesPaymentMethod(invoice, dto.splitIndex!, "bankCheck"))
      throw new BadRequestError("invoice.invalidPaymentMethodForSplitPayment");

    const splitAmount = invoice.paymentSplits[dto.splitIndex! - 1].amount;
    const bankCheck = await this.createBankCheck(invoice, dto, splitAmount);

    return await this.invoiceRepo.paySplit({
      invoiceId: invoice._id,
      adminId: dto.adminId,
      parentId: dto.parentId,
      splitIndex: dto.splitIndex!,
      tenantId: dto.tenantId,
      paymentMethod: dto.paymentMethod,
      bankCheckId: bankCheck._id,
    });
  }

  private async createBankCheck(
    invoice: Invoice,
    dto: BankCheckPaymentStrategyDto,
    amount: number,
  ): Promise<BankCheck> {
    return await this.bankCheckRepo.addOne({
      withdrawDate: dto.withdrawDate || null,
      fullName: dto.fullName,
      phoneNumber: dto.phoneNumber,
      checkNumber: dto.checkNumber,
      bankName: dto.bankName,
      amount,
      invoice: invoice._id,
      status: "not used",
    });
  }
}
