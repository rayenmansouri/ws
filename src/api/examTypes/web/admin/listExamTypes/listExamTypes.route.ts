import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListExamTypesController } from "./listExamTypes.controller";
import { ListExamTypesRouteConfig } from "./listExamTypes.types";
import { listExamTypesValidation } from "./listExamTypes.validation";

registerRoute<ListExamTypesRouteConfig>()({
  path: "/exam-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listExamTypesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_TYPE },
  controller: ListExamTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
