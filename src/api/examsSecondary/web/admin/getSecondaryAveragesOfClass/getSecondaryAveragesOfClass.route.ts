import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSecondaryAveragesOfClassController } from "./getSecondaryAveragesOfClass.controller";
import { GetSecondaryAveragesOfClassRouteConfig } from "./getSecondaryAveragesOfClass.types";
import { getSecondaryAveragesOfClassValidation } from "./getSecondaryAveragesOfClass.validation";

registerRoute<GetSecondaryAveragesOfClassRouteConfig>()({
  path: "/secondary/classes/:classNewId/averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getSecondaryAveragesOfClassValidation.query,
  paramSchema: getSecondaryAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetSecondaryAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
