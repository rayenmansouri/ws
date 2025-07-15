import { ID } from "./../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { PaymentTemplateRepo } from "../../studentPayments/domain/PaymentTemplate.repo";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { MonthlyOrOneTimeService } from "../../studentPayments/domain/service.entity";

export type addPaymentTemplateRequestDto = {
  name: string;
  discount: number;
  services: {
    id: ID;
    discount: number;
  }[];
};

@injectable()
export class AddPaymentTemplateUseCase {
  constructor(
    @inject("ServiceRepo") private readonly serviceRepo: ServiceRepo,
    @inject("PaymentTemplateRepo") private readonly paymentTemplateRepo: PaymentTemplateRepo,
  ) {}

  async execute(dto: addPaymentTemplateRequestDto): Promise<void> {
    const servicesIds = dto.services.map(service => service.id);
    const services = await this.serviceRepo.findManyByIdsOrThrow(servicesIds, "notFound.service");

    SchoolServicesService.ensureServicesHasAmount(services);

    const servicePayload = SchoolServicesService.attachServicesWithDiscount(
      dto.services,
      services as MonthlyOrOneTimeService[],
    );

    const totalAmount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
      servicePayload,
      dto.discount,
    );

    await this.paymentTemplateRepo.addOne({
      ...dto,
      services: servicePayload,
      totalAmount,
    });
  }
}
