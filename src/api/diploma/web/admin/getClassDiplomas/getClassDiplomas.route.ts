import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetClassDiplomasController } from "./getClassDiplomas.controller";
import { GetClassDiplomasRouteConfig } from "./getClassDiplomas.types";
import { getClassDiplomasValidation } from "./getClassDiplomas.validation";

registerRoute<GetClassDiplomasRouteConfig>()({
  path: "/classes/:classNewId/diplomas",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getClassDiplomasValidation.query,
  paramSchema: getClassDiplomasValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.DIPLOMA },
  controller: GetClassDiplomasController,
  isTransactionEnabled: false,
  platform: "web",
});
