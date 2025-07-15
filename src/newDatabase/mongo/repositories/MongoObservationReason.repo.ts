import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ObservationReasonRepo } from "../../../feature/observationsReason/domains/ObservationReason.repo";
import {
  ObservationReason,
  ObservationReasonMetaData,
} from "../../../feature/observationsReason/domains/observationReason.entity";

export class MongoObservationReasonRepo
  extends MongoBaseRepo<ObservationReasonMetaData>
  implements ObservationReasonRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "observationReason", session);
  }

  async listObservationReasons(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ObservationReason>> {
    const filterQuery: FilterQuery<ObservationReason> = {};

    if (filter.search) {
      filterQuery.name = { $regex: new RegExp(filter.search, "i") };
    }

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }
}
