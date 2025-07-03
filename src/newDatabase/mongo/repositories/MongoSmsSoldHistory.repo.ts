import { ID } from "./../../../types/BaseEntity";
import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "./../types";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SmsSoldHistoryMetaData } from "../../../feature/schools/domain/smsSoldHistory.entity";
import { SmsSoldHistoryRepo } from "../../../feature/schools/domain/SmsSoldHistory.repo";
import { mongoSmsSoldHistoryModel } from "./../schemas/smsSoldHistory.schema";
import { MongoMasterBaseRepo } from "./MongoMasterBase.repo";

export class MongoSmsSoldHistoryRepo
  extends MongoMasterBaseRepo<SmsSoldHistoryMetaData>
  implements SmsSoldHistoryRepo
{
  constructor(
    @inject("MasterConnection") private connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, mongoSmsSoldHistoryModel, session);
  }

  async listSmsSoldHistory(
    tenantId: ID,
    page?: number,
    limit?: number,
  ): Promise<ResponseWithPagination<Populate<SmsSoldHistoryMetaData, "master">>> {
    return this.findManyWithPagination(
      {
        school: tenantId,
      },
      {
        populate: ["master"],
        page: page ?? 1,
        limit: limit ?? 10,
      },
    );
  }
}
