import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { School } from "../../schools/domain/school.entity";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { INVOICE_STATUS_ENUM } from "../../studentPayments/domain/invoice.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type unpayInvoiceUseCaseRequestDto = {
  invoiceNewId: string;
  admin: Pick<BaseUser, "_id">;
};
@injectable()
export class UnpayInvoiceUseCase {
  constructor(
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("School") private school: School,
  ) {}

  async execute(dto: unpayInvoiceUseCaseRequestDto): Promise<void> {
    const { invoiceNewId } = dto;
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice");

    const currentTime = getCurrentTimeOfSchool(this.school._id);

    const isInvoiceDueDatePassed = invoice.dueDate.getTime() <= currentTime.getTime();

    const invoiceStatus = isInvoiceDueDatePassed
      ? INVOICE_STATUS_ENUM.OVERDUE
      : INVOICE_STATUS_ENUM.UNPAID;

    const updatedPaymentSplits = invoice.paymentSplits.map(split => ({
      ...split,
      status: INVOICE_STATUS_ENUM.UNPAID,
      unPaidAt: currentTime,
      adminIdUnPaidBy: dto.admin._id,
    }));

    await this.invoiceRepo.updateOneById(invoice._id, {
      status: invoiceStatus,
      paymentSplits: updatedPaymentSplits,
      paidAt: null,
      adminIdPaidBy: null,
      unPaidAt: currentTime,
      adminIdUnPaidBy: dto.admin._id,
    });

    return;
  }
}
