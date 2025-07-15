import { ID } from "./../../../types/BaseEntity";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";

import { PaymentTemplateRepo } from "../../../feature/studentPayments/domain/PaymentTemplate.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import {
  PaymentTemplate,
  PaymentTemplateMetaData,
} from "../../../feature/studentPayments/domain/paymentTemplate.entity";

export class MongoPaymentTemplateRepo
  extends MongoBaseRepo<PaymentTemplateMetaData>
  implements PaymentTemplateRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "paymentTemplate", session);
  }

  async findManyByServiceIds(serviceIds: ID[]): Promise<PaymentTemplate[]> {
    const filterQuery: FilterQuery<PaymentTemplate> = {
      "services._id": { $in: serviceIds },
    };

    return this.model.find(filterQuery).lean();
  }

  async listPaymentTemplates(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<PaymentTemplate>> {
    const filterQuery: FilterQuery<PaymentTemplate> = {};

    if (filter.search) {
      filterQuery.name = { $regex: filter.search, $options: "i" };
    }

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }

  async findNameDuplication(name: string, id: ID): Promise<PaymentTemplate | null> {
    return this.model.findOne({ name, _id: { $ne: id } });
  }
}
