import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";

export type updateInvoiceRemindersUseCaseRequestDto = {
  invoiceNewId: string;
  email: string | null | undefined;
  phoneNumber: string | null | undefined;
};
@injectable()
export class UpdateInvoiceRemindersUseCase {
  constructor(@inject("InvoiceRepo") private invoiceRepo: InvoiceRepo) {}

  async execute(dto: updateInvoiceRemindersUseCaseRequestDto): Promise<void> {
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(
      dto.invoiceNewId,
      "notFound.invoice",
    );

    await this.invoiceRepo.updateOneById(invoice._id, {
      email: dto.email,
      phoneNumber: dto.phoneNumber,
    });
    return;
  }
}
