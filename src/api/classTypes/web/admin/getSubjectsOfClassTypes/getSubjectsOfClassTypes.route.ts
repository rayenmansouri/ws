import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSubjectsOfClassTypesController } from "./getSubjectsOfClassTypes.controller";
import { GetSubjectsOfClassTypesRouteConfig } from "./getSubjectsOfClassTypes.types";
import { getSubjectsOfClassTypesValidation } from "./getSubjectsOfClassTypes.validation";

registerRoute<GetSubjectsOfClassTypesRouteConfig>()({
  path: "/classTypes/:classTypeNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getSubjectsOfClassTypesValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: GetSubjectsOfClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
