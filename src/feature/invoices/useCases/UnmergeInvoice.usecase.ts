import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";

export type unmergeInvoiceUseCaseRequestDto = {
  invoiceNewId: string;
};
@injectable()
export class UnmergeInvoiceUseCase {
  constructor(@inject("InvoiceRepo") private invoiceRepo: InvoiceRepo) {}

  async execute(dto: unmergeInvoiceUseCaseRequestDto): Promise<void> {
    const { invoiceNewId } = dto;
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice");

    InvoiceService.ensureInvoicesCanBeUnMerged(invoice);

    await this.invoiceRepo.updateManyByIds(invoice.mergedInvoices, {
      isMerged: false,
      mergedInto: null,
    });

    await this.invoiceRepo.deleteOneById(invoice._id);
    return;
  }
}
