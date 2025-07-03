import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListClassTypesController } from "./listClassTypes.controller";
import { ListClassTypesRouteConfig } from "./listClassTypes.types";
import { listClassTypesValidation } from "./listClassTypes.validation";

registerRoute<ListClassTypesRouteConfig>()({
  path: "/class-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listClassTypesValidation.query,
  controller: ListClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
