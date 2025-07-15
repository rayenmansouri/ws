import { BadRequestError } from "./../../../core/ApplicationErrors";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { PaymentTemplateRepo } from "../../studentPayments/domain/PaymentTemplate.repo";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { ID } from "./../../../types/BaseEntity";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";

export type updatePaymentTemplateRequestDto = {
  paymentTemplateId: ID;
  name?: string;
  services:
    | {
        id: ID;
        discount: number;
      }[];
  discount: number;
};

@injectable()
export class UpdatePaymentTemplateUseCase {
  constructor(
    @inject("PaymentTemplateRepo") private readonly paymentTemplateRepo: PaymentTemplateRepo,
    @inject("ServiceRepo") private readonly serviceRepo: ServiceRepo,
  ) {}

  async execute(dto: updatePaymentTemplateRequestDto): Promise<void> {
    const paymentTemplate = await this.paymentTemplateRepo.findOneByIdOrThrow(
      dto.paymentTemplateId,
      "notFound.paymentTemplate",
    );

    if (dto.name) {
      const existingPaymentTemplateWithTheSameName =
        await this.paymentTemplateRepo.findNameDuplication(dto.name, paymentTemplate._id);
      if (existingPaymentTemplateWithTheSameName) throw new BadRequestError("alreadyUsed.name");
    }

    const serviceIds = dto.services.map(service => service.id);

    const services = await this.serviceRepo.findManyByIdsOrThrow(serviceIds, "notFound.service");

    let totalAmount: number = 0;
    SchoolServicesService.ensureServicesHasAmount(services);

    const servicePayload = services.map((service, i) => {
      const amount = service.amount!;
      const discount = dto.services[i].discount;
      totalAmount += amount * (1 - discount / 100);
      return { ...service, discount, amount };
    });

    const discount = dto.discount || paymentTemplate.discount;

    const finalAmount = +(totalAmount * (1 - discount / 100)).toFixed(2);

    await this.paymentTemplateRepo.updateOneById(dto.paymentTemplateId, {
      name: dto.name,
      services: servicePayload,
      totalAmount: finalAmount,
    });
  }
}
