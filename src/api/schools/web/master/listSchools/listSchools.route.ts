import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSchoolsController } from "./listSchools.controller";
import { ListSchoolsRouteConfig } from "./listSchools.types";
import { listSchoolsValidation } from "./listSchools.validation";

registerRoute<ListSchoolsRouteConfig>()({
  path: "/schools",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  querySchema: listSchoolsValidation.query,
  controller: ListSchoolsController,
  isTransactionEnabled: false,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SCHOOL },
  platform: "web",
});
