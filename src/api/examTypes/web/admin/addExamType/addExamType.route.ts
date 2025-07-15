import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddExamTypeController } from "./addExamType.controller";
import { AddExamTypeRouteConfig } from "./addExamType.types";
import { addExamTypeValidation } from "./addExamType.validation";

registerRoute<AddExamTypeRouteConfig>()({
  path: "/exam-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addExamTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.EXAM_TYPE },
  controller: AddExamTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
