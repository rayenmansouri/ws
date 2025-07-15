import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  MonthlyOrOneTimeService,
  Service,
  SERVICE_TYPE_ENUM,
  ServiceMetaData,
  TServiceTypeEnum,
} from "../../../feature/studentPayments/domain/service.entity";
import { ServiceRepo } from "../../../feature/studentPayments/domain/Service.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { NotFoundError } from "../../../core/ApplicationErrors";

export class MongoServiceRepo extends MongoBaseRepo<ServiceMetaData> implements ServiceRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "service", session);
  }

  async findNonExtraServicesByIdsOrThrow(ids: ID[]): Promise<MonthlyOrOneTimeService[]> {
    const filterQuery: FilterQuery<Service> = {
      _id: { $in: ids },
      invoiceType: { $ne: SERVICE_TYPE_ENUM.EXTRA },
    };

    const services = await this.model.find(filterQuery).session(this.session);

    if (services.length !== ids.length) throw new NotFoundError("notFound.service");

    return services as MonthlyOrOneTimeService[];
  }

  async countVisibleServicesByInvoiceType(invoiceType: TServiceTypeEnum): Promise<number> {
    const filterQuery: FilterQuery<Service> = {
      invoiceType,
      showByDefault: true,
    };
    return this.model.countDocuments(filterQuery).session(this.session);
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
