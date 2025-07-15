import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListHolidayController } from "./listHoliday.controller";
import { ListHolidayRouteConfig } from "./listHoliday.types";
import { listHolidayValidation } from "./listHoliday.validation";

registerRoute<ListHolidayRouteConfig>()({
  path: "/holidays",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listHolidayValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.HOLIDAY },
  controller: ListHolidayController,
  isTransactionEnabled: false,
  platform: "web",
});
