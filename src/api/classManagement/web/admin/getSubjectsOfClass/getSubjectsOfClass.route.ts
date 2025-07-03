import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSubjectsOfClassController } from "./getSubjectsOfClass.controller";
import { GetSubjectsOfClassRouteConfig } from "./getSubjectsOfClass.types";
import { getSubjectsOfClassValidation } from "./getSubjectsOfClass.validation";

registerRoute<GetSubjectsOfClassRouteConfig>()({
  path: "/class/:classNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getSubjectsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: GetSubjectsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
