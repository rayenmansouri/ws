import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCambridgeAnnualAveragesOfClassController } from "./getCambridgeAnnualAveragesOfClass.controller";
import { GetCambridgeAnnualAveragesOfClassRouteConfig } from "./getCambridgeAnnualAveragesOfClass.types";
import { getCambridgeAnnualAveragesOfClassValidation } from "./getCambridgeAnnualAveragesOfClass.validation";

registerRoute<GetCambridgeAnnualAveragesOfClassRouteConfig>()({
  path: "/cambridge/classes/:classNewId/annual-averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getCambridgeAnnualAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetCambridgeAnnualAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
