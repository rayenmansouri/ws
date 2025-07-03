import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBAnnualAveragesOfClassController } from "./getIBAnnualAveragesOfClass.controller";
import { GetIBAnnualAveragesOfClassRouteConfig } from "./getIBAnnualAveragesOfClass.types";
import { getIBAnnualAveragesOfClassValidation } from "./getIBAnnualAveragesOfClass.validation";

registerRoute<GetIBAnnualAveragesOfClassRouteConfig>()({
  path: "/ib/classes/:classNewId/annual-averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getIBAnnualAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetIBAnnualAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
