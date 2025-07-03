import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListIssuesOfTeacherController } from "./listIssuesOfTeacher.controller";
import { ListIssuesOfTeacherRouteConfig } from "./listIssuesOfTeacher.types";
import { listIssuesOfTeacherValidation } from "./listIssuesOfTeacher.validation";

registerSharedRoute<ListIssuesOfTeacherRouteConfig>()(
  {
    path: "/issues",
    method: "get",
    querySchema: listIssuesOfTeacherValidation.query,
    controller: ListIssuesOfTeacherController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
