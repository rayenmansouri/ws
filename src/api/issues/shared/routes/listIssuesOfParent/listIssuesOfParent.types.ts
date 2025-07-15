import { IssueDTO } from "../../../../../feature/issues/dtos/issue.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListIssuesOfParentValidation } from "./listIssuesOfParent.validation";

export type ListIssuesOfParentRouteConfig = ListIssuesOfParentValidation & { files: never };
export type ListIssuesOfParentResponse = ResponseWithPagination<IssueDTO>;
