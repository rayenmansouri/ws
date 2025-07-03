import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ForwardIssueController } from "./forwardIssue.controller";
import { ForwardIssueRouteConfig } from "./forwardIssue.types";
import { forwardIssueValidation } from "./forwardIssue.validation";

registerRoute<ForwardIssueRouteConfig>()({
  path: "/issues/:issueNewId/forward",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: forwardIssueValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ISSUE },
  controller: ForwardIssueController,
  isTransactionEnabled: true,
  platform: "web",
});
