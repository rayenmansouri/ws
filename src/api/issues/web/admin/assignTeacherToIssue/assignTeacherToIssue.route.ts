import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AssignTeacherToIssueController } from "./assignTeacherToIssue.controller";
import { AssignTeacherToIssueRouteConfig } from "./assignTeacherToIssue.types";
import { assignTeacherToIssueValidation } from "./assignTeacherToIssue.validation";

registerRoute<AssignTeacherToIssueRouteConfig>()({
  path: "/issues/:issueNewId/assign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: assignTeacherToIssueValidation.body,
  paramSchema: assignTeacherToIssueValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ISSUE },
  controller: AssignTeacherToIssueController,
  isTransactionEnabled: false,
  platform: "web",
});
