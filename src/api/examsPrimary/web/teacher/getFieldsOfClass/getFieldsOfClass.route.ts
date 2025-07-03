import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetFieldsOfClassController } from "./getFieldsOfClass.controller";
import { GetFieldsOfClassRouteConfig } from "./getFieldsOfClass.types";
import { getFieldsOfClassValidation } from "./getFieldsOfClass.validation";

registerRoute<GetFieldsOfClassRouteConfig>()({
  path: "/primary/classes/:classNewId/fields",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getFieldsOfClassValidation.query,
  paramSchema: getFieldsOfClassValidation.params,
  controller: GetFieldsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
