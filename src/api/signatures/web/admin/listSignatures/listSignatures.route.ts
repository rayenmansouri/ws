import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSignaturesController } from "./listSignatures.controller";
import { ListSignaturesRouteConfig } from "./listSignatures.types";
import { listSignaturesValidation } from "./listSignatures.validation";

registerRoute<ListSignaturesRouteConfig>()({
  path: "/signatures",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSignaturesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SIGNATURE },
  controller: ListSignaturesController,
  isTransactionEnabled: false,
  platform: "web",
});
