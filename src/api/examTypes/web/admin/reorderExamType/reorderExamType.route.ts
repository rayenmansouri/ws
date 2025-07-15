import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderExamTypeController } from "./reorderExamType.controller";
import { ReorderExamTypeRouteConfig } from "./reorderExamType.types";
import { reorderExamTypeValidation } from "./reorderExamType.validation";

registerRoute<ReorderExamTypeRouteConfig>()({
  path: "/exam-types/:examTypeNewId/reorder",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: reorderExamTypeValidation.body,
  paramSchema: reorderExamTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_TYPE },
  controller: ReorderExamTypeController,
  isTransactionEnabled: true,
  platform: "web",
});
