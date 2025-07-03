import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteExamTypeController } from "./deleteExamType.controller";
import { DeleteExamTypeRouteConfig } from "./deleteExamType.types";
import { deleteExamTypeValidation } from "./deleteExamType.validation";

registerRoute<DeleteExamTypeRouteConfig>()({
  path: "/exam-types/:examTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteExamTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.EXAM_TYPE },
  controller: DeleteExamTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
