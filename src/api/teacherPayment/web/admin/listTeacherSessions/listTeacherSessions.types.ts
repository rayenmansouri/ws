import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListTeacherSessionsValidation } from "./listTeacherSessions.validation";

export type ListTeacherSessionsRouteConfig = ListTeacherSessionsValidation & {
  files: never;
};

export type ListTeacherSessionsResponse = ResponseWithPagination<{
  _id: string;
  newId: string;
  sessionType: string;
  sessionDate: string;
  className: string;
  status: string;
}>;
