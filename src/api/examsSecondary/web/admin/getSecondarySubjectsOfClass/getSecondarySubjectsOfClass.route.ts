import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSecondarySubjectsOfClassController } from "./getSecondarySubjectsOfClass.controller";
import { GetSecondarySubjectsOfClassRouteConfig } from "./getSecondarySubjectsOfClass.types";
import { getSecondarySubjectsOfClassValidation } from "./getSecondarySubjectsOfClass.validation";

registerRoute<GetSecondarySubjectsOfClassRouteConfig>()({
  path: "/secondary/classes/:classNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getSecondarySubjectsOfClassValidation.query,
  paramSchema: getSecondarySubjectsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetSecondarySubjectsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
