import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCambridgeAveragesOfClassController } from "./getCambridgeAveragesOfClass.controller";
import { GetCambridgeAveragesOfClassRouteConfig } from "./getCambridgeAveragesOfClass.types";
import { getCambridgeAveragesOfClassValidation } from "./getCambridgeAveragesOfClass.validation";

registerRoute<GetCambridgeAveragesOfClassRouteConfig>()({
  path: "/cambridge/classes/:classNewId/averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getCambridgeAveragesOfClassValidation.query,
  paramSchema: getCambridgeAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetCambridgeAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
