import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSuppliersController } from "./deleteSuppliers.controller";
import { DeleteSuppliersRouteConfig } from "./deleteSuppliers.types";
import { deleteSuppliersValidation } from "./deleteSuppliers.validation";

registerRoute<DeleteSuppliersRouteConfig>()({
  path: "/suppliers",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deleteSuppliersValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SUPPLIER },
  controller: DeleteSuppliersController,
  isTransactionEnabled: false,
  platform: "web",
});
