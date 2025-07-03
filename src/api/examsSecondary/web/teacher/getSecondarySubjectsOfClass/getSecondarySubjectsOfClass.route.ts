import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSecondarySubjectsOfClassController } from "./getSecondarySubjectsOfClass.controller";
import { GetSecondarySubjectsOfClassRouteConfig } from "./getSecondarySubjectsOfClass.types";
import { getSecondarySubjectsOfClassValidation } from "./getSecondarySubjectsOfClass.validation";

registerRoute<GetSecondarySubjectsOfClassRouteConfig>()({
  path: "/secondary/classes/:classNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getSecondarySubjectsOfClassValidation.query,
  paramSchema: getSecondarySubjectsOfClassValidation.params,
  controller: GetSecondarySubjectsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
