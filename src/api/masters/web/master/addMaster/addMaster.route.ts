import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddMasterController } from "./addMaster.controller";
import { AddMasterRouteConfig } from "./addMaster.types";
import { addMasterValidation } from "./addMaster.validation";

registerRoute<AddMasterRouteConfig>()({
  path: "/masters",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: addMasterValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.MASTER },
  controller: AddMasterController,
  isTransactionEnabled: false,
  platform: "web",
});
