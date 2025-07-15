import { ID } from "../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { PaymentTemplate, PaymentTemplateMetaData } from "./paymentTemplate.entity";

export abstract class PaymentTemplateRepo extends BaseRepo<PaymentTemplateMetaData> {
  abstract listPaymentTemplates(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<PaymentTemplate>>;
  abstract findNameDuplication(name: string, id: ID): Promise<PaymentTemplate | null>;
  abstract findManyByServiceIds(serviceIds: ID[]): Promise<PaymentTemplate[]>;
}
