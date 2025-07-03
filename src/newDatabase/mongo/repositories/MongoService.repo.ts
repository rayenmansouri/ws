import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Service, ServiceMetaData } from "../../../feature/studentPayments/service.entity";
import { ServiceRepo } from "../../../feature/studentPayments/Service.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoServiceRepo extends MongoBaseRepo<ServiceMetaData> implements ServiceRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "service", session);
  }

  async listServices(
    filter: { search?: string; showByDefault?: boolean; invoiceType?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Service>> {
    const filterQuery: FilterQuery<Service> = {};

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    if (filter.showByDefault !== undefined) filterQuery.showByDefault = filter.showByDefault;

    if (filter.invoiceType) filterQuery.invoiceType = filter.invoiceType;

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }
}
