import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ForgetPasswordController } from "./forgetPassword.controller";
import { ForgetPasswordRouteConfig } from "./forgetPassword.types";
import { forgetPasswordValidation } from "./forgetPassword.validation";

registerSharedRoute<ForgetPasswordRouteConfig>()(
  {
    path: "/forget-password",
    method: "post",
    bodySchema: forgetPasswordValidation.body,
    controller: ForgetPasswordController,
    isTransactionEnabled: false,
    isPublic: true,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
