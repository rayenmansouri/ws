import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ResetPasswordController } from "./resetPassword.controller";
import { ResetPasswordRouteConfig } from "./resetPassword.types";
import { resetPasswordValidation } from "./resetPassword.validation";

registerSharedRoute<ResetPasswordRouteConfig>()(
  {
    path: "/reset-password",
    method: "post",
    bodySchema: resetPasswordValidation.body,
    controller: ResetPasswordController,
    isTransactionEnabled: true,
    isPublic: true,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
