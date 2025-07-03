import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfSecondaryGroupController } from "./getGradesOfSecondaryGroup.controller";
import { GetGradesOfSecondaryGroupRouteConfig } from "./getGradesOfSecondaryGroup.types";
import { getGradesOfSecondaryGroupValidation } from "./getGradesOfSecondaryGroup.validation";

registerRoute<GetGradesOfSecondaryGroupRouteConfig>()({
  path: "/secondary/groups/:groupNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGradesOfSecondaryGroupValidation.query,
  paramSchema: getGradesOfSecondaryGroupValidation.params,
  controller: GetGradesOfSecondaryGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
