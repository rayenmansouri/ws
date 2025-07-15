import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAnnualAveragesOfClassController } from "./getAnnualAveragesOfClass.controller";
import { GetAnnualAveragesOfClassRouteConfig } from "./getAnnualAveragesOfClass.types";
import { getAnnualAveragesOfClassValidation } from "./getAnnualAveragesOfClass.validation";

registerRoute<GetAnnualAveragesOfClassRouteConfig>()({
  path: "/classes/:classNewId/annual-averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getAnnualAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAnnualAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
