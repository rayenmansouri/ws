import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { BankTransferRepo } from "../../invoices/domain/BankTransfer.repo";
import { PaymentServices } from "../../invoices/domain/payment.service";
import { PaymentStrategy, commonPaymentDto } from "../../invoices/domain/paymentStrategy";
import { BankTransfer } from "../../invoices/domain/bankTransfer.entity";

export interface BankTransferStrategyDto extends commonPaymentDto {
  paymentMethod: "bankTransfer";
  fullName: string;
  amount: number;
  transactionReference?: string;
  transferDate: Date;
  bankName?: string;
}

@injectable()
export class BankTransferStrategy implements PaymentStrategy {
  constructor(
    @inject("InvoiceRepo") private readonly invoiceRepo: InvoiceRepo,
    @inject("BankTransferRepo") private readonly bankTransferRepo: BankTransferRepo,
  ) {}

  async pay(invoice: Invoice, dto: BankTransferStrategyDto): Promise<Invoice> {
    if (invoice.paymentSplits.length === 0) {
      return await this.handleFullPayment(invoice, dto);
    } else {
      return await this.handleSplitPayment(invoice, dto);
    }
  }

  private async handleFullPayment(
    invoice: Invoice,
    dto: BankTransferStrategyDto,
  ): Promise<Invoice> {
    const amount = invoice.amount;
    await this.createBankTransfer(invoice, dto, amount);

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
    dto: BankTransferStrategyDto,
  ): Promise<Invoice> {
    PaymentServices.validateSplitIndex(invoice, dto.splitIndex);

    if (!PaymentServices.isSplitUsesPaymentMethod(invoice, dto.splitIndex!, "bankTransfer"))
      throw new BadRequestError("invoice.invalidPaymentMethodForSplitPayment");

    const splitAmount = invoice.paymentSplits[dto.splitIndex! - 1].amount;
    const bankTransfer = await this.createBankTransfer(invoice, dto, splitAmount);

    return await this.invoiceRepo.paySplit({
      invoiceId: invoice._id,
      adminId: dto.adminId,
      parentId: dto.parentId,
      splitIndex: dto.splitIndex!,
      tenantId: dto.tenantId,
      paymentMethod: dto.paymentMethod,
      bankCheckId: bankTransfer._id,
    });
  }

  private async createBankTransfer(
    invoice: Invoice,
    dto: BankTransferStrategyDto,
    amount: number,
  ): Promise<BankTransfer> {
    if (dto.transactionReference)
      await this.bankTransferRepo.ensureFieldUniqueness(
        "transactionReference",
        dto.transactionReference,
        "invoice.transactionReferenceAlreadyExists",
      );

    return await this.bankTransferRepo.addOne({
      transactionReference: dto.transactionReference || null,
      transferDate: dto.transferDate,
      fullName: dto.fullName,
      bankName: dto.bankName || null,
      amount,
      invoice: invoice._id,
      isDeleted: false,
    });
  }
}
