import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSchoolYearController } from "./listSchoolYear.controller";
import { ListSchoolYearRouteConfig } from "./listSchoolYear.types";
import { listSchoolYearValidation } from "./listSchoolYear.validation";

registerRoute<ListSchoolYearRouteConfig>()({
  path: "/school-years",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSchoolYearValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SCHOOL_YEAR },
  controller: ListSchoolYearController,
  isTransactionEnabled: false,
  platform: "web",
});
