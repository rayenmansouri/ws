import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSuppliersController } from "./listSuppliers.controller";
import { ListSuppliersRouteConfig } from "./listSuppliers.types";
import { listSuppliersValidation } from "./listSuppliers.validation";

registerRoute<ListSuppliersRouteConfig>()({
  path: "/suppliers",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSuppliersValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SUPPLIER },
  controller: ListSuppliersController,
  isTransactionEnabled: false,
  platform: "web",
});
