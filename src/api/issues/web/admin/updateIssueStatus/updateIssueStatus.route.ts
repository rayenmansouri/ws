import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateIssueStatusController } from "./updateIssueStatus.controller";
import { UpdateIssueStatusRouteConfig } from "./updateIssueStatus.types";
import { updateIssueStatusValidation } from "./updateIssueStatus.validation";

registerRoute<UpdateIssueStatusRouteConfig>()({
  path: "/issues/:issueNewId/status",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateIssueStatusValidation.body,
  paramSchema: updateIssueStatusValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ISSUE },
  controller: UpdateIssueStatusController,
  isTransactionEnabled: false,
  platform: "web",
});
