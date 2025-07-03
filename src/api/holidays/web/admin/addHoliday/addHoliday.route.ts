import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddHolidayController } from "./addHoliday.controller";
import { AddHolidayRouteConfig } from "./addHoliday.types";
import { addHolidayValidation } from "./addHoliday.validation";

registerRoute<AddHolidayRouteConfig>()({
  path: "/holidays",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addHolidayValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.HOLIDAY },
  controller: AddHolidayController,
  isTransactionEnabled: false,
  platform: "web",
});
