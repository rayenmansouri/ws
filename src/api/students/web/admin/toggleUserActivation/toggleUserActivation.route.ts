import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ToggleUserActivationController } from "./toggleUserActivation.controller";
import { ToggleUserActivationRouteConfig } from "./toggleUserActivation.types";
import { toggleUserActivationValidation } from "./toggleUserActivation.validation";

registerRoute<ToggleUserActivationRouteConfig>()({
  path: "/users/activation",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: toggleUserActivationValidation.body,
  controller: ToggleUserActivationController,
  isTransactionEnabled: false,
  platform: "web",
});
