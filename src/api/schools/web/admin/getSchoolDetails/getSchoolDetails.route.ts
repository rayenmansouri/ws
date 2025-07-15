import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolDetailsController } from "./getSchoolDetails.controller";
import { GetSchoolDetailsRouteConfig } from "./getSchoolDetails.types";

registerRoute<GetSchoolDetailsRouteConfig>()({
  path: "/school-information",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SCHOOL },
  controller: GetSchoolDetailsController,
  isTransactionEnabled: false,
  platform: "web",
});
