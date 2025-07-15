import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListGroupTypesController } from "./listGroupTypes.controller";
import { ListGroupTypesRouteConfig } from "./listGroupTypes.types";
import { listGroupTypesValidation } from "./listGroupTypes.validation";

registerRoute<ListGroupTypesRouteConfig>()({
  path: "/groups-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listGroupTypesValidation.query,
  controller: ListGroupTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
