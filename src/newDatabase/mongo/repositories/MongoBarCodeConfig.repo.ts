import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  BarCodeConfig,
  BarCodeConfigMetaData,
} from "../../../feature/barCode/domain/barCodeConfig.entity";
import { BarCodeConfigRepo } from "../../../feature/barCode/domain/BarCodeConfig.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoBarCodeConfigRepo
  extends MongoBaseRepo<BarCodeConfigMetaData>
  implements BarCodeConfigRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "barCodeConfig", session);
  }
  async list(
    filter: { name?: string } & ListOptions,
  ): Promise<ResponseWithPagination<BarCodeConfigMetaData["entity"]>> {
    const query: FilterQuery<BarCodeConfig> = {};

    if (filter.name) query.name = { $regex: filter.name, $options: "i" };

    return await this.findManyWithPagination(query, filter);
  }
}
