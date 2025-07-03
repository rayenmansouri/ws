import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ResendInvitationController } from "./resendInvitation.controller";
import { ResendInvitationRouteConfig } from "./resendInvitation.types";
import { resendInvitationValidation } from "./resendInvitation.validation";

registerRoute<ResendInvitationRouteConfig>()({
  path: "/users/resend-invitation",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: resendInvitationValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PASSWORD },
  controller: ResendInvitationController,
  isTransactionEnabled: true,
  platform: "web",
});
