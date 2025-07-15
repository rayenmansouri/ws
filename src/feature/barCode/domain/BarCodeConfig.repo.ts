import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { BarCodeConfigMetaData } from "./barCodeConfig.entity";

export abstract class BarCodeConfigRepo extends BaseRepo<BarCodeConfigMetaData> {
  abstract list(
    filter: { name?: string } & ListOptions,
  ): Promise<ResponseWithPagination<BarCodeConfigMetaData["entity"]>>;
}
