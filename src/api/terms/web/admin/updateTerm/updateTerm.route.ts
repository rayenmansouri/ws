import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTermController } from "./updateTerm.controller";
import { UpdateTermRouteConfig } from "./updateTerm.types";
import { updateTermValidation } from "./updateTerm.validation";

registerRoute<UpdateTermRouteConfig>()({
  path: "/terms/:termNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateTermValidation.body,
  paramSchema: updateTermValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.TERM },
  controller: UpdateTermController,
  isTransactionEnabled: true,
  platform: "web",
});
