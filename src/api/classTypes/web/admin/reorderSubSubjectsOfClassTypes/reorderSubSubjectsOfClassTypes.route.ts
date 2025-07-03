import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderSubSubjectsOfClassTypesController } from "./reorderSubSubjectsOfClassTypes.controller";
import { ReorderSubSubjectsOfClassTypesRouteConfig } from "./reorderSubSubjectsOfClassTypes.types";
import { reorderSubSubjectsOfClassTypesValidation } from "./reorderSubSubjectsOfClassTypes.validation";

registerRoute<ReorderSubSubjectsOfClassTypesRouteConfig>()({
  path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/reorder",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: reorderSubSubjectsOfClassTypesValidation.body,
  paramSchema: reorderSubSubjectsOfClassTypesValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: ReorderSubSubjectsOfClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
