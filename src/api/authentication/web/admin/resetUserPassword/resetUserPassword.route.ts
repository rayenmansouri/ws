import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ResetUserPasswordController } from "./resetUserPassword.controller";
import { ResetUserPasswordRouteConfig } from "./resetUserPassword.types";
import { resetUserPasswordValidation } from "./resetUserPassword.validation";

registerRoute<ResetUserPasswordRouteConfig>()({
  path: "/users/password",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: resetUserPasswordValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PASSWORD },
  controller: ResetUserPasswordController,
  isTransactionEnabled: false,
  platform: "web",
});
