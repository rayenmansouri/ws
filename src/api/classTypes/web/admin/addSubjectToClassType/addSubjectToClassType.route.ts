import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSubjectToClassTypeController } from "./addSubjectToClassType.controller";
import { AddSubjectToClassTypeRouteConfig } from "./addSubjectToClassType.types";
import { addSubjectToClassTypeValidation } from "./addSubjectToClassType.validation";

registerRoute<AddSubjectToClassTypeRouteConfig>()({
  path: "/classTypes/:classTypeNewId/subjects",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSubjectToClassTypeValidation.body,
  paramSchema: addSubjectToClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: AddSubjectToClassTypeController,
  isTransactionEnabled: true,
  platform: "web",
});
