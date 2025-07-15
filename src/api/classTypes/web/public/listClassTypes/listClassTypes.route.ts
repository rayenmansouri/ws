import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListClassTypesController } from "./listClassTypes.controller";
import { ListClassTypesRouteConfig } from "./listClassTypes.types";
import { listClassTypesValidation } from "./listClassTypes.validation";

registerRoute<ListClassTypesRouteConfig>()({
  path: "/class-types",
  method: "get",
  isPublic: true,
  endUser: undefined,
  querySchema: listClassTypesValidation.query,
  controller: ListClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
