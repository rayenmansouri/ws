import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import {
  MonthlyOrOneTimeService,
  Service,
  ServiceMetaData,
  TServiceTypeEnum,
} from "./service.entity";

export abstract class ServiceRepo extends BaseRepo<ServiceMetaData> {
  abstract listServices(
    filter: { search?: string; showByDefault?: boolean; invoiceType?: TServiceTypeEnum },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Service>>;

  abstract countVisibleServicesByInvoiceType(invoiceType: TServiceTypeEnum): Promise<number>;
  abstract findNonExtraServicesByIdsOrThrow(ids: ID[]): Promise<MonthlyOrOneTimeService[]>;
}
