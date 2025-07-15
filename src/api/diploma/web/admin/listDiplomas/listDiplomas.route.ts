import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListDiplomasController } from "./listDiplomas.controller";
import { ListDiplomasRouteConfig } from "./listDiplomas.types";
import { listDiplomasValidation } from "./listDiplomas.validation";

registerRoute<ListDiplomasRouteConfig>()({
  path: "/diplomas",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listDiplomasValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.DIPLOMA },
  controller: ListDiplomasController,
  isTransactionEnabled: false,
  platform: "web",
});
