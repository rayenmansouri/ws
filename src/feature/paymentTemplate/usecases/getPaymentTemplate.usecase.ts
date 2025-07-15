import { PaymentTemplate } from "./../../studentPayments/domain/paymentTemplate.entity";
import { ID } from "./../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { PaymentTemplateRepo } from "../../studentPayments/domain/PaymentTemplate.repo";

export type getPaymentTemplateRequestDto = {
  paymentTemplate: ID;
};

@injectable()
export class GetPaymentTemplateUseCase {
  constructor(
    @inject("PaymentTemplateRepo") private readonly paymentTemplate: PaymentTemplateRepo,
  ) {}

  async execute(dto: getPaymentTemplateRequestDto): Promise<PaymentTemplate> {
    return await this.paymentTemplate.findOneByIdOrThrow(
      dto.paymentTemplate,
      "notFound.paymentTemplate",
    );
  }
}
