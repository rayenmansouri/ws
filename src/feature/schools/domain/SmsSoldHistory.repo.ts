import { ID } from "./../../../types/BaseEntity";
import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { MongoMasterBaseRepo } from "../../../newDatabase/mongo/repositories/MongoMasterBase.repo";
import { SmsSoldHistoryMetaData } from "./smsSoldHistory.entity";

export abstract class SmsSoldHistoryRepo extends MongoMasterBaseRepo<SmsSoldHistoryMetaData> {
  abstract listSmsSoldHistory(
    tenantId: ID,
    page?: number,
    limit?: number,
  ): Promise<ResponseWithPagination<Populate<SmsSoldHistoryMetaData, "master">>>;
}
