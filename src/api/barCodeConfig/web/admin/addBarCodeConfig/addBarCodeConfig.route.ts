import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddBarCodeConfigController } from "./addBarCodeConfig.controller";
import { AddBarCodeConfigRouteConfig } from "./addBarCodeConfig.types";
import { addBarCodeConfigValidation } from "./addBarCodeConfig.validation";

registerRoute<AddBarCodeConfigRouteConfig>()({
  path: "/bar-code",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addBarCodeConfigValidation.body,
  controller: AddBarCodeConfigController,
  isTransactionEnabled: false,
  platform: "web",
});
