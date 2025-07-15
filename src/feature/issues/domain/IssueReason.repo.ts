import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { IssueReason, IssueReasonMetaData } from "./issueReason.entity";

export abstract class IssueReasonRepo extends BaseRepo<IssueReasonMetaData> {
  abstract listIssueReasons: (options: ListOptions) => Promise<ResponseWithPagination<IssueReason>>;
}
