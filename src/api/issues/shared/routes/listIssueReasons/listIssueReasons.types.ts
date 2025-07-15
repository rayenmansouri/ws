import { IssueReason } from "../../../../../feature/issues/domain/issueReason.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListIssueReasonsValidation } from "./listIssueReasons.validation";

export type ListIssueReasonsRouteConfig = ListIssueReasonsValidation & { files: never };
export type ListIssueReasonsResponse = ResponseWithPagination<IssueReason>;
