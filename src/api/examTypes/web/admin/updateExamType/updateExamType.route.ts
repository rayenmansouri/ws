import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateExamTypeController } from "./updateExamType.controller";
import { UpdateExamTypeRouteConfig } from "./updateExamType.types";
import { updateExamTypeValidation } from "./updateExamType.validation";

registerRoute<UpdateExamTypeRouteConfig>()({
  path: "/examTypes/:examTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateExamTypeValidation.body,
  paramSchema: updateExamTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_TYPE },
  controller: UpdateExamTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
