import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetPrimaryAveragesOfClassController } from "./getPrimaryAveragesOfClass.controller";
import { GetPrimaryAveragesOfClassRouteConfig } from "./getPrimaryAveragesOfClass.types";
import { getPrimaryAveragesOfClassValidation } from "./getPrimaryAveragesOfClass.validation";

registerRoute<GetPrimaryAveragesOfClassRouteConfig>()({
  path: "/primary/classes/:classNewId/averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getPrimaryAveragesOfClassValidation.query,
  paramSchema: getPrimaryAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetPrimaryAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
