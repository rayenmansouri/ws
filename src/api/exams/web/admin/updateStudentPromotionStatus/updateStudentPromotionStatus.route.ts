import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateStudentPromotionStatusController } from "./updateStudentPromotionStatus.controller";
import { UpdateStudentPromotionStatusRouteConfig } from "./updateStudentPromotionStatus.types";
import { updateStudentPromotionStatusValidation } from "./updateStudentPromotionStatus.validation";

registerRoute<UpdateStudentPromotionStatusRouteConfig>()({
  path: "/students/:studentNewId/promotion-status",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateStudentPromotionStatusValidation.body,
  paramSchema: updateStudentPromotionStatusValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: UpdateStudentPromotionStatusController,
  isTransactionEnabled: false,
  platform: "web",
});
