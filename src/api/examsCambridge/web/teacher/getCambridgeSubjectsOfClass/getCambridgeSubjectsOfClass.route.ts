import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCambridgeSubjectsOfClassController } from "./getCambridgeSubjectsOfClass.controller";
import { GetCambridgeSubjectsOfClassRouteConfig } from "./getCambridgeSubjectsOfClass.types";
import { getCambridgeSubjectsOfClassValidation } from "./getCambridgeSubjectsOfClass.validation";

registerRoute<GetCambridgeSubjectsOfClassRouteConfig>()({
  path: "/cambridge/classes/:classNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getCambridgeSubjectsOfClassValidation.query,
  paramSchema: getCambridgeSubjectsOfClassValidation.params,
  controller: GetCambridgeSubjectsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
