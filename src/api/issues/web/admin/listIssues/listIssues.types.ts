import { IssueDTO } from "../../../../../feature/issues/dtos/issue.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListIssuesValidation } from "./listIssues.validation";

export type ListIssuesRouteConfig = ListIssuesValidation & { files: never };
export type ListIssuesResponse = ResponseWithPagination<IssueDTO>;
