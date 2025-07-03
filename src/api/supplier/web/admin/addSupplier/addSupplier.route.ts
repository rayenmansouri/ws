import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSupplierController } from "./addSupplier.controller";
import { AddSupplierRouteConfig } from "./addSupplier.types";
import { addSupplierValidation } from "./addSupplier.validation";

registerRoute<AddSupplierRouteConfig>()({
  path: "/supplier",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSupplierValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SUPPLIER },
  controller: AddSupplierController,
  isTransactionEnabled: false,
  platform: "web",
});
