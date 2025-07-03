import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { LoginByStudentController } from "./loginByStudent.controller";
import { LoginByStudentRouteConfig } from "./loginByStudent.types";
import { loginByStudentValidation } from "./loginByStudent.validation";

registerSharedRoute<LoginByStudentRouteConfig>()(
  {
    path: "/login",
    method: "post",
    bodySchema: loginByStudentValidation.body,
    controller: LoginByStudentController,
    isTransactionEnabled: false,
    isPublic: true,
  },
  [{ endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] }],
);
