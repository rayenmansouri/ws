import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSubSubjectToClassTypeController } from "./addSubSubjectToClassType.controller";
import { AddSubSubjectToClassTypeRouteConfig } from "./addSubSubjectToClassType.types";
import { addSubSubjectToClassTypeValidation } from "./addSubSubjectToClassType.validation";

registerRoute<AddSubSubjectToClassTypeRouteConfig>()({
  path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/subSubjects",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSubSubjectToClassTypeValidation.body,
  paramSchema: addSubSubjectToClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: AddSubSubjectToClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
