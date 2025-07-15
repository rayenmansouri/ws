import { IssueDTO } from "./../../../../../feature/issues/dtos/issue.dto";
import { FilesInRequest } from "./../../../../../types/app-request";
import { AddIssueValidation } from "./addIssue.validation";

export type AddIssueRouteConfig = AddIssueValidation & {
  files: FilesInRequest<"attachments">;
};

export type AddIssueResponse = IssueDTO;
