import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteMasterController } from "./deleteMaster.controller";
import { DeleteMasterRouteConfig } from "./deleteMaster.types";
import { deleteMasterValidation } from "./deleteMaster.validation";

registerRoute<DeleteMasterRouteConfig>()({
  path: "/masters/:masterNewId",
  method: "delete",
  endUser: END_USER_ENUM.MASTER,
  paramSchema: deleteMasterValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.MASTER },
  controller: DeleteMasterController,
  isTransactionEnabled: false,
  platform: "web",
});
