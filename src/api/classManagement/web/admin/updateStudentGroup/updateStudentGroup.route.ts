import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateStudentGroupController } from "./updateStudentGroup.controller";
import { UpdateStudentGroupRouteConfig } from "./updateStudentGroup.types";
import { updateStudentGroupValidation } from "./updateStudentGroup.validation";

registerRoute<UpdateStudentGroupRouteConfig>()({
  path: "/class/:classNewId/student/:studentNewId/group",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateStudentGroupValidation.body,
  paramSchema: updateStudentGroupValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: UpdateStudentGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
