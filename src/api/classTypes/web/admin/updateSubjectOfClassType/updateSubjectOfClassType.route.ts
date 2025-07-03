import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSubjectOfClassTypeController } from "./updateSubjectOfClassType.controller";
import { UpdateSubjectOfClassTypeRouteConfig } from "./updateSubjectOfClassType.types";
import { updateSubjectOfClassTypeValidation } from "./updateSubjectOfClassType.validation";

registerRoute<UpdateSubjectOfClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/subject-types/:subjectTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSubjectOfClassTypeValidation.body,
  paramSchema: updateSubjectOfClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: UpdateSubjectOfClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
