import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBAveragesOfClassController } from "./getIBAveragesOfClass.controller";
import { GetIBAveragesOfClassRouteConfig } from "./getIBAveragesOfClass.types";
import { getIBAveragesOfClassValidation } from "./getIBAveragesOfClass.validation";

registerRoute<GetIBAveragesOfClassRouteConfig>()({
  path: "/ib/classes/:classNewId/averages",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getIBAveragesOfClassValidation.query,
  paramSchema: getIBAveragesOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetIBAveragesOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
