import { IssueDTO } from "../../../../../feature/issues/dtos/issue.dto";
import { GetOneIssueValidation } from "./getOneIssue.validation";

export type GetOneIssueRouteConfig = GetOneIssueValidation & { files: never };
export type GetOneIssueResponse = IssueDTO;
