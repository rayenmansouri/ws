import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddClassController } from "./addClass.controller";
import { AddClassRouteConfig } from "./addClass.types";
import { addClassValidation } from "./addClass.validation";

registerRoute<AddClassRouteConfig>()({
  path: "/class",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addClassValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.CLASS },
  controller: AddClassController,
  isTransactionEnabled: true,
  platform: "web",
});
