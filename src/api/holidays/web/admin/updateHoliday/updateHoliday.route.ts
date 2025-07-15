import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateHolidayController } from "./updateHoliday.controller";
import { UpdateHolidayRouteConfig } from "./updateHoliday.types";
import { updateHolidayValidation } from "./updateHoliday.validation";

registerRoute<UpdateHolidayRouteConfig>()({
  path: "/holidays/:holidayNewId",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateHolidayValidation.body,
  paramSchema: updateHolidayValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.HOLIDAY },
  controller: UpdateHolidayController,
  isTransactionEnabled: false,
  platform: "web",
});
