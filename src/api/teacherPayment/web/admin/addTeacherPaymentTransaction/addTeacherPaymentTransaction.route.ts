import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTeacherPaymentTransactionController } from "./addTeacherPaymentTransaction.controller";
import { AddTeacherPaymentTransactionRouteConfig } from "./addTeacherPaymentTransaction.types";
import { addTeacherPaymentTransactionValidation } from "./addTeacherPaymentTransaction.validation";

registerRoute<AddTeacherPaymentTransactionRouteConfig>()({
  path: "/teachers/:teacherNewId/payment/transaction",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addTeacherPaymentTransactionValidation.body,
  paramSchema: addTeacherPaymentTransactionValidation.params,
  authorization: { action: ACTION_ENUM.PAY, resource: RESOURCES_ENUM.TEACHER },
  controller: AddTeacherPaymentTransactionController,
  isTransactionEnabled: false,
  platform: "web",
});
