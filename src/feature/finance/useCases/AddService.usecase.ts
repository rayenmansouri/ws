import { injectable } from "inversify/lib/inversify";
import { TInvoiceTypeEnum } from "../../studentPayments/domain/invoice.entity";
import { inject } from "../../../core/container/TypedContainer";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";

export type AddServiceUseCaseDto = {
  name: string;
  description: string | null;
  showByDefault: boolean;
  invoiceType: TInvoiceTypeEnum;
  amount?: number;
};

@injectable()
export class AddServiceUseCase {
  constructor(@inject("ServiceRepo") private serviceRepo: ServiceRepo) {}

  async execute(input: AddServiceUseCaseDto): Promise<void> {
    const { name, description, showByDefault, invoiceType, amount } = input;

    await this.serviceRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");

    await this.serviceRepo.addOne({
      name,
      description,
      showByDefault,
      invoiceType,
      amount: amount ?? null,
    });

    return;
  }
}
