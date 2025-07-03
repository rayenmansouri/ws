import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateCurrentUserPasswordController } from "./updateCurrentUserPassword.controller";
import { UpdateCurrentUserPasswordRouteConfig } from "./updateCurrentUserPassword.types";
import { updateCurrentUserPasswordValidation } from "./updateCurrentUserPassword.validation";

registerSharedRoute<UpdateCurrentUserPasswordRouteConfig>()(
  {
    path: "/password",
    method: "patch",
    bodySchema: updateCurrentUserPasswordValidation.body,
    controller: UpdateCurrentUserPasswordController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
