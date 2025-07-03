import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { IssueReasonRepo } from "../../../feature/issues/domain/IssueReason.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import {
  IssueReason,
  IssueReasonMetaData,
} from "../../../feature/issues/domain/issueReason.entity";

export class MongoIssueReasonRepo
  extends MongoBaseRepo<IssueReasonMetaData>
  implements IssueReasonRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "issueReason", session);
  }

  async listIssueReasons(options: ListOptions): Promise<ResponseWithPagination<IssueReason>> {
    const data = await this.findManyWithPagination({}, options);

    return data;
  }
}
