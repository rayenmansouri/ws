import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListBarCodeConfigController } from "./listBarCodeConfig.controller";
import { ListBarCodeConfigRouteConfig } from "./listBarCodeConfig.types";
import { listBarCodeConfigValidation } from "./listBarCodeConfig.validation";

registerRoute<ListBarCodeConfigRouteConfig>()({
  path: "/bar-code",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listBarCodeConfigValidation.query,
  controller: ListBarCodeConfigController,
  isTransactionEnabled: false,
  platform: "web",
});
