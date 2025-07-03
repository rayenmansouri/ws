import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfSecondaryGroupController } from "./getGradesOfSecondaryGroup.controller";
import { GetGradesOfSecondaryGroupRouteConfig } from "./getGradesOfSecondaryGroup.types";
import { getGradesOfSecondaryGroupValidation } from "./getGradesOfSecondaryGroup.validation";

registerRoute<GetGradesOfSecondaryGroupRouteConfig>()({
  path: "/secondary/groups/:groupNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getGradesOfSecondaryGroupValidation.query,
  paramSchema: getGradesOfSecondaryGroupValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetGradesOfSecondaryGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
