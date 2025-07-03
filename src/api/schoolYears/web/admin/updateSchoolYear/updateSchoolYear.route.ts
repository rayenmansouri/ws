import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSchoolYearController } from "./updateSchoolYear.controller";
import { UpdateSchoolYearRouteConfig } from "./updateSchoolYear.types";
import { updateSchoolYearValidation } from "./updateSchoolYear.validation";

registerRoute<UpdateSchoolYearRouteConfig>()({
  path: "/school-years/:schoolYearNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSchoolYearValidation.body,
  paramSchema: updateSchoolYearValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL_YEAR },
  controller: UpdateSchoolYearController,
  isTransactionEnabled: true,
  platform: "web",
});
