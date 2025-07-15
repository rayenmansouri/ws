import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { INVOICE_STATUS_ENUM } from "../../studentPayments/domain/invoice.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";

type DeleteInvoiceParams = {
  invoiceNewId: string;
};

@injectable()
export class DeleteInvoiceUseCase {
  constructor(@inject("InvoiceRepo") private invoiceRepo: InvoiceRepo) {}

  async execute(params: DeleteInvoiceParams): Promise<void> {
    const { invoiceNewId } = params;

    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice");

    if (invoice.status === INVOICE_STATUS_ENUM.PAID) {
      throw new BadRequestError("invoice.invoiceAlreadyPaid");
    }

    if (invoice.status === INVOICE_STATUS_ENUM.PARTIALLY_PAID) {
      throw new BadRequestError("invoice.splitAlreadyPaid");
    }

    const invoiceIdsToBeDeleted = [invoice._id].concat(invoice.mergedInvoices);

    await this.invoiceRepo.deleteManyByIds(invoiceIdsToBeDeleted);
  }
}
