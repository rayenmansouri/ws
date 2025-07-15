import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteDiplomaController } from "./deleteDiploma.controller";
import { DeleteDiplomaRouteConfig } from "./deleteDiploma.types";
import { deleteDiplomaValidation } from "./deleteDiploma.validation";

registerRoute<DeleteDiplomaRouteConfig>()({
  path: "/diplomas",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deleteDiplomaValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.DIPLOMA },
  controller: DeleteDiplomaController,
  isTransactionEnabled: false,
  platform: "web",
});
