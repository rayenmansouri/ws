import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { VerifyCodeController } from "./verifyCode.controller";
import { VerifyCodeRouteConfig } from "./verifyCode.types";
import { verifyCodeValidation } from "./verifyCode.validation";

registerSharedRoute<VerifyCodeRouteConfig>()(
  {
    path: "/verify-code",
    method: "post",
    bodySchema: verifyCodeValidation.body,
    controller: VerifyCodeController,
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
