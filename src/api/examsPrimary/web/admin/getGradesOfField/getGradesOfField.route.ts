import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfFieldController } from "./getGradesOfField.controller";
import { GetGradesOfFieldRouteConfig } from "./getGradesOfField.types";
import { getGradesOfFieldValidation } from "./getGradesOfField.validation";

registerRoute<GetGradesOfFieldRouteConfig>()({
  path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getGradesOfFieldValidation.query,
  paramSchema: getGradesOfFieldValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetGradesOfFieldController,
  isTransactionEnabled: false,
  platform: "web",
});
