import { IssueDTO } from "../../../../../feature/issues/dtos/issue.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListIssuesOfTeacherValidation } from "./listIssuesOfTeacher.validation";

export type ListIssuesOfTeacherRouteConfig = ListIssuesOfTeacherValidation & { files: never };
export type ListIssuesOfTeacherResponse = ResponseWithPagination<IssueDTO>;
