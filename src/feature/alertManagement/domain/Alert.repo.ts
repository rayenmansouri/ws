import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ListOptions } from "./../../../types/types";
import { AlertMetaData } from "./alert.entity";

export abstract class AlertRepo extends BaseRepo<AlertMetaData> {
  abstract listAlerts(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<AlertMetaData, "createdBy">>>;
}
