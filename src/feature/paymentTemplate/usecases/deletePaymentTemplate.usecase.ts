import { ID } from "./../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { PaymentTemplateRepo } from "../../studentPayments/domain/PaymentTemplate.repo";

export type deletePaymentTemplateRequestDto = {
  paymentTemplateIds: ID[];
};
@injectable()
export class DeletePaymentTemplateUseCase {
  constructor(
    @inject("PaymentTemplateRepo") private readonly paymentTemplateRepo: PaymentTemplateRepo,
  ) {}

  async execute(dto: deletePaymentTemplateRequestDto): Promise<void> {
    await this.paymentTemplateRepo.findManyByIdsOrThrow(
      dto.paymentTemplateIds,
      "notFound.paymentTemplate",
    );

    await this.paymentTemplateRepo.deleteManyByIds(dto.paymentTemplateIds);
  }
}
