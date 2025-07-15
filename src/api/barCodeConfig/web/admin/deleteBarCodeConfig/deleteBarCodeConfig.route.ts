import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteBarCodeConfigController } from "./deleteBarCodeConfig.controller";
import { DeleteBarCodeConfigRouteConfig } from "./deleteBarCodeConfig.types";
import { deleteBarCodeConfigValidation } from "./deleteBarCodeConfig.validation";

registerRoute<DeleteBarCodeConfigRouteConfig>()({
  path: "/bar-code/:barCodeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteBarCodeConfigValidation.params,
  controller: DeleteBarCodeConfigController,
  isTransactionEnabled: false,
  platform: "web",
});
