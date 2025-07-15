import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSchoolController } from "./addSchool.controller";
import { AddSchoolRouteConfig } from "./addSchool.types";
import { addSchoolValidation } from "./addSchool.validation";

registerRoute<AddSchoolRouteConfig>()({
  path: "/schools",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: addSchoolValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SCHOOL },
  controller: AddSchoolController,
  isTransactionEnabled: true,
  platform: "web",
});
