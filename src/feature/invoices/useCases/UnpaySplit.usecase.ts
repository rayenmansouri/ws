import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Admin } from "../../admins/domain/admin.entity";
import { School } from "../../schools/domain/school.entity";
import { BankCheckRepo } from "../../studentPayments/domain/BankCheck.repo";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { Invoice, INVOICE_STATUS_ENUM } from "../../studentPayments/domain/invoice.entity";
import { BankTransferRepo } from "../../invoices/domain/BankTransfer.repo";

export type unpaySplitUseCaseRequestDto = {
  invoiceNewId: string;
  splitIndex: number;
  admin: Pick<Admin, "_id">;
};
@injectable()
export class UnpaySplitUseCase {
  constructor(
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("School") private school: School,
    @inject("BankCheckRepo") private bankCheckRepo: BankCheckRepo,
    @inject("BankTransferRepo") private bankTransferRepo: BankTransferRepo,
  ) {}

  async execute(dto: unpaySplitUseCaseRequestDto): Promise<void> {
    const { admin, splitIndex, invoiceNewId } = dto;
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice", {
      populate: ["students.student"],
    });

    const paymentSlitIndex = splitIndex - 1;

    InvoiceService.ensureSplitPaymentCanBeUnpaid(invoice, paymentSlitIndex);
    const currentDate = getCurrentTimeOfSchool(this.school._id);
    const paymentSplitToUnpay = invoice.paymentSplits[paymentSlitIndex];
    const newPaymentSplits: Invoice["paymentSplits"] = invoice.paymentSplits.map((split, index) => {
      if (index != paymentSlitIndex) return split;
      return {
        _id: split._id,
        bankCheck: null,
        bankTransfer: null,
        adminIdPaidBy: null,
        paidAt: null,
        parent: null,
        amount: split.amount,
        paymentMethod: split.paymentMethod,
        dueDate: split.dueDate,
        status: INVOICE_STATUS_ENUM.UNPAID,
        adminIdUnPaidBy: admin._id,
        unPaidAt: currentDate,
      };
    });

    const isEverySplitUnpaid = newPaymentSplits.every(
      split => split.status === INVOICE_STATUS_ENUM.UNPAID,
    );

    await this.invoiceRepo.updateOneById(invoice._id, {
      paymentSplits: newPaymentSplits,
      status: isEverySplitUnpaid ? INVOICE_STATUS_ENUM.UNPAID : INVOICE_STATUS_ENUM.PARTIALLY_PAID,
      paidAt: null,
      adminIdPaidBy: null,
      unPaidAt: currentDate,
      adminIdUnPaidBy: admin._id,
    });

    const bankCheckId = paymentSplitToUnpay.bankCheck;
    const bankTransferId = paymentSplitToUnpay.bankTransfer;
    if (bankCheckId) await this.bankCheckRepo.deleteOneById(bankCheckId);
    if (bankTransferId) await this.bankTransferRepo.deleteOneById(bankTransferId);

    return;
  }
}
