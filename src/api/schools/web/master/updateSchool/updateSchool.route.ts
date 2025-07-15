import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSchoolController } from "./updateSchool.controller";
import { UpdateSchoolRouteConfig } from "./updateSchool.types";
import { updateSchoolValidation } from "./updateSchool.validation";

registerRoute<UpdateSchoolRouteConfig>()({
  path: "/schools/:schoolNewId",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateSchoolValidation.body,
  paramSchema: updateSchoolValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL },
  controller: UpdateSchoolController,
  isTransactionEnabled: false,
  platform: "web",
});
