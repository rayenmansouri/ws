import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSupplierController } from "./updateSupplier.controller";
import { UpdateSupplierRouteConfig } from "./updateSupplier.types";
import { updateSupplierValidation } from "./updateSupplier.validation";

registerRoute<UpdateSupplierRouteConfig>()({
  path: "/suppliers/:supplierNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSupplierValidation.body,
  paramSchema: updateSupplierValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SUPPLIER },
  controller: UpdateSupplierController,
  isTransactionEnabled: false,
  platform: "web",
});
