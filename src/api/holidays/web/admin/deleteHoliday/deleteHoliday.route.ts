import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteHolidayController } from "./deleteHoliday.controller";
import { DeleteHolidayRouteConfig } from "./deleteHoliday.types";
import { deleteHolidayValidation } from "./deleteHoliday.validation";

registerRoute<DeleteHolidayRouteConfig>()({
  path: "/holidays/:holidayNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteHolidayValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.HOLIDAY },
  controller: DeleteHolidayController,
  isTransactionEnabled: false,
  platform: "web",
});
