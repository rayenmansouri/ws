import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateBarCodeConfigController } from "./updateBarCodeConfig.controller";
import { UpdateBarCodeConfigRouteConfig } from "./updateBarCodeConfig.types";
import { updateBarCodeConfigValidation } from "./updateBarCodeConfig.validation";

registerRoute<UpdateBarCodeConfigRouteConfig>()({
  path: "/bar-code/:barCodeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateBarCodeConfigValidation.body,
  paramSchema: updateBarCodeConfigValidation.params,
  controller: UpdateBarCodeConfigController,
  isTransactionEnabled: false,
  platform: "web",
});
