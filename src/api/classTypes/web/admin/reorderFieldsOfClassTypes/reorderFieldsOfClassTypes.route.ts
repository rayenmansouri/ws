import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderFieldsOfClassTypesController } from "./reorderFieldsOfClassTypes.controller";
import { ReorderFieldsOfClassTypesRouteConfig } from "./reorderFieldsOfClassTypes.types";
import { reorderFieldsOfClassTypesValidation } from "./reorderFieldsOfClassTypes.validation";

registerRoute<ReorderFieldsOfClassTypesRouteConfig>()({
  path: "/classTypes/:classTypeNewId/fields/reorder",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: reorderFieldsOfClassTypesValidation.params,
  bodySchema: reorderFieldsOfClassTypesValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: ReorderFieldsOfClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
