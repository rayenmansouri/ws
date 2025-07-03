import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSubSubjectOfClassTypeController } from "./updateSubSubjectOfClassType.controller";
import { UpdateSubSubjectOfClassTypeRouteConfig } from "./updateSubSubjectOfClassType.types";
import { updateSubSubjectOfClassTypeValidation } from "./updateSubSubjectOfClassType.validation";

registerRoute<UpdateSubSubjectOfClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/sub-subjects/:subSubjectNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSubSubjectOfClassTypeValidation.body,
  paramSchema: updateSubSubjectOfClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: UpdateSubSubjectOfClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
