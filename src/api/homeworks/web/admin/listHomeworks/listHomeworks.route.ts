import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListHomeworksController } from "./listHomeworks.controller";
import { ListHomeworksRouteConfig } from "./listHomeworks.types";
import { listHomeworksValidation } from "./listHomeworks.validation";

registerRoute<ListHomeworksRouteConfig>()({
  path: "/homeworks",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listHomeworksValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.HOMEWORK },
  controller: ListHomeworksController,
  isTransactionEnabled: false,
  platform: "web",
});
