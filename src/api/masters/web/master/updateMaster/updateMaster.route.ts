import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateMasterController } from "./updateMaster.controller";
import { UpdateMasterRouteConfig } from "./updateMaster.types";
import { updateMasterValidation } from "./updateMaster.validation";

registerRoute<UpdateMasterRouteConfig>()({
  path: "/masters/:masterNewId",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateMasterValidation.body,
  paramSchema: updateMasterValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.MASTER },
  controller: UpdateMasterController,
  isTransactionEnabled: false,
  platform: "web",
});
