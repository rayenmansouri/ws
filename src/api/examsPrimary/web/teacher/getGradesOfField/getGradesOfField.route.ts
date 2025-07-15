import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfFieldController } from "./getGradesOfField.controller";
import { GetGradesOfFieldRouteConfig } from "./getGradesOfField.types";
import { getGradesOfFieldValidation } from "./getGradesOfField.validation";

registerRoute<GetGradesOfFieldRouteConfig>()({
  path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGradesOfFieldValidation.query,
  paramSchema: getGradesOfFieldValidation.params,
  controller: GetGradesOfFieldController,
  isTransactionEnabled: false,
  platform: "web",
});
