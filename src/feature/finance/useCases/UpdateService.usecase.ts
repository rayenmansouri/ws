import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { SchoolServicesService } from "../domains/schoolServices.service";
import { TInvoiceTypeEnum } from "../../studentPayments/domain/invoice.entity";
import { Service } from "../../studentPayments/domain/service.entity";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";

type UpdateServiceParams = {
  serviceId: ID;
  showByDefault?: boolean;
  invoiceType?: TInvoiceTypeEnum;
  amount?: number | null;
  name?: string;
  description?: string | null;
};

@injectable()
export class UpdateServiceUseCase {
  constructor(@inject("ServiceRepo") private readonly serviceRepo: ServiceRepo) {}

  async execute(data: UpdateServiceParams): Promise<void> {
    const { serviceId, showByDefault, invoiceType, amount, name, description } = data;

    const service = await this.serviceRepo.findOneByIdOrThrow(serviceId, "notFound.service");

    if (name && name !== service.name) {
      await this.serviceRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");
    }

    const totalVisibleServices = await this.serviceRepo.countVisibleServicesByInvoiceType(
      invoiceType || service.invoiceType,
    );

    SchoolServicesService.ensureMaxVisibleServices(
      { showByDefault },
      service,
      totalVisibleServices,
    );

    const newInvoiceType = invoiceType || service.invoiceType;
    const newAmount = amount ?? service.amount;

    SchoolServicesService.ensureServicesHasAmount([
      { amount: newAmount, invoiceType: newInvoiceType },
    ]);

    const updates = {
      name: name,
      description: description,
      showByDefault: showByDefault,
      invoiceType: newInvoiceType,
      amount: newAmount,
    } as Partial<Service>;

    await this.serviceRepo.updateOneById(serviceId, updates);

    return;
  }
}
