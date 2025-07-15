import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { ObservationReason, ObservationReasonMetaData } from "./observationReason.entity";

export abstract class ObservationReasonRepo extends BaseRepo<ObservationReasonMetaData> {
  abstract listObservationReasons(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ObservationReason>>;
}
