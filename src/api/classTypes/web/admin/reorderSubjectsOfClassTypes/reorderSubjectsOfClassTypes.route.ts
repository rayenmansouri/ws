import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderSubjectsOfClassTypesController } from "./reorderSubjectsOfClassTypes.controller";
import { ReorderSubjectsOfClassTypesRouteConfig } from "./reorderSubjectsOfClassTypes.types";
import { reorderSubjectsOfClassTypesValidation } from "./reorderSubjectsOfClassTypes.validation";

registerRoute<ReorderSubjectsOfClassTypesRouteConfig>()({
  path: "/classTypes/:classTypeNewId/subjects/reorder",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: reorderSubjectsOfClassTypesValidation.body,
  querySchema: reorderSubjectsOfClassTypesValidation.query,
  paramSchema: reorderSubjectsOfClassTypesValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: ReorderSubjectsOfClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
