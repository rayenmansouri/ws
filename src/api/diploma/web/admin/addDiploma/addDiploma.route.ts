import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddDiplomaController } from "./addDiploma.controller";
import { AddDiplomaRouteConfig } from "./addDiploma.types";
import { addDiplomaValidation } from "./addDiploma.validation";

registerRoute<AddDiplomaRouteConfig>()({
  path: "/diploma",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addDiplomaValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.DIPLOMA },
  controller: AddDiplomaController,
  isTransactionEnabled: false,
  platform: "web",
});
