import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentProfileController } from "./getStudentProfile.controller";
import { GetStudentProfileRouteConfig } from "./getStudentProfile.types";
import { getStudentProfileValidation } from "./getStudentProfile.validation";

registerRoute<GetStudentProfileRouteConfig>()({
  path: "/students/:studentNewId/profile",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getStudentProfileValidation.params,
  querySchema: getStudentProfileValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: GetStudentProfileController,
  isTransactionEnabled: false,
  platform: "web",
});
