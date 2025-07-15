import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { PaymentServices } from "../../invoices/domain/payment.service";
import { PaymentStrategy, commonPaymentDto } from "../../invoices/domain/paymentStrategy";

export type cashPaymentStrategyDto = {
  paymentMethod: "cash";
} & commonPaymentDto;

@injectable()
export class CashPaymentStrategy implements PaymentStrategy {
  constructor(@inject("InvoiceRepo") private readonly invoiceRepo: InvoiceRepo) {}

  async pay(invoice: Invoice, dto: cashPaymentStrategyDto): Promise<Invoice> {
    if (invoice.paymentSplits.length === 0) {
      return await this.invoiceRepo.payInvoice({
        adminId: dto.adminId,
        parentId: dto.parentId,
        paymentMethod: dto.paymentMethod,
        invoiceId: invoice._id,
        isMerged: invoice.isMerged,
        paidAt: getCurrentTimeOfSchool(dto.tenantId),
        mergedInvoicesIds: invoice.mergedInvoices,
      });
    } else {
      if (!dto.splitIndex) throw new InternalError("split index must be provided");

      if (dto.splitIndex > invoice.paymentSplits.length)
        throw new BadRequestError("invoice.paymentSplitIndexOutOfRange");

      if (!PaymentServices.isSplitUsesPaymentMethod(invoice, dto.splitIndex, "cash"))
        throw new BadRequestError("invoice.invalidPaymentMethodForSplitPayment");

      return await this.invoiceRepo.paySplit({
        invoiceId: invoice._id,
        adminId: dto.adminId,
        parentId: dto.parentId,
        splitIndex: dto.splitIndex,
        tenantId: dto.tenantId,
        paymentMethod: dto.paymentMethod,
      });
    }
  }
}
