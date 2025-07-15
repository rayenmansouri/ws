import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { PayTeacherController } from "./payTeacher.controller";
import { PayTeacherRouteConfig } from "./payTeacher.types";
import { payTeacherValidation } from "./payTeacher.validation";

registerRoute<PayTeacherRouteConfig>()({
  path: "/teachers/:teacherNewId/pay",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: payTeacherValidation.body,
  paramSchema: payTeacherValidation.params,
  authorization: { action: ACTION_ENUM.PAY, resource: RESOURCES_ENUM.TEACHER },
  controller: PayTeacherController,
  isTransactionEnabled: true,
  platform: "web",
});
