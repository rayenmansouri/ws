import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteTermController } from "./deleteTerm.controller";
import { DeleteTermRouteConfig } from "./deleteTerm.types";
import { deleteTermValidation } from "./deleteTerm.validation";

registerRoute<DeleteTermRouteConfig>()({
  path: "/terms/:termNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteTermValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.TERM },
  controller: DeleteTermController,
  isTransactionEnabled: false,
  platform: "web",
});
