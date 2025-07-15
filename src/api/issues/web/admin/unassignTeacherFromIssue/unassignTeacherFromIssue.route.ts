import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnassignTeacherFromIssueController } from "./unassignTeacherFromIssue.controller";
import { UnassignTeacherFromIssueRouteConfig } from "./unassignTeacherFromIssue.types";
import { unassignTeacherFromIssueValidation } from "./unassignTeacherFromIssue.validation";

registerRoute<UnassignTeacherFromIssueRouteConfig>()({
  path: "/issues/:issueNewId/unassign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unassignTeacherFromIssueValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ISSUE },
  controller: UnassignTeacherFromIssueController,
  isTransactionEnabled: true,
  platform: "web",
});
