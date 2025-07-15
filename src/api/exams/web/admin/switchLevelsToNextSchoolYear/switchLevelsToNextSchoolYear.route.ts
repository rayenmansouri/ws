import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { SwitchLevelsToNextSchoolYearController } from "./switchLevelsToNextSchoolYear.controller";
import { SwitchLevelsToNextSchoolYearRouteConfig } from "./switchLevelsToNextSchoolYear.types";
import { switchLevelsToNextSchoolYearValidation } from "./switchLevelsToNextSchoolYear.validation";

registerRoute<SwitchLevelsToNextSchoolYearRouteConfig>()({
  path: "/levels/switch-next-school-year",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: switchLevelsToNextSchoolYearValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL_YEAR },
  controller: SwitchLevelsToNextSchoolYearController,
  isTransactionEnabled: true,
  platform: "web",
});
