import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteTeacherPaymentTransactionController } from "./deleteTeacherPaymentTransaction.controller";
import { DeleteTeacherPaymentTransactionRouteConfig } from "./deleteTeacherPaymentTransaction.types";
import { deleteTeacherPaymentTransactionValidation } from "./deleteTeacherPaymentTransaction.validation";

registerRoute<DeleteTeacherPaymentTransactionRouteConfig>()({
  path: "/teacher/payment/transaction/:teacherPaymentId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deleteTeacherPaymentTransactionValidation.body,
  paramSchema: deleteTeacherPaymentTransactionValidation.params,
  authorization: { action: ACTION_ENUM.PAY, resource: RESOURCES_ENUM.TEACHER },
  controller: DeleteTeacherPaymentTransactionController,
  isTransactionEnabled: false,
  platform: "web",
});
