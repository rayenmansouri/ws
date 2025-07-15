import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateDiplomaController } from "./updateDiploma.controller";
import { UpdateDiplomaRouteConfig } from "./updateDiploma.types";
import { updateDiplomaValidation } from "./updateDiploma.validation";

registerRoute<UpdateDiplomaRouteConfig>()({
  path: "/diplomas/:diplomaNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateDiplomaValidation.body,
  paramSchema: updateDiplomaValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.DIPLOMA },
  controller: UpdateDiplomaController,
  isTransactionEnabled: false,
  platform: "web",
});
