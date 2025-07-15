import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { SwitchStudentsClassController } from "./switchStudentsClass.controller";
import { SwitchStudentsClassRouteConfig } from "./switchStudentsClass.types";
import { switchStudentsClassValidation } from "./switchStudentsClass.validation";

registerRoute<SwitchStudentsClassRouteConfig>()({
  path: "/switch-students-class",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: switchStudentsClassValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: SwitchStudentsClassController,
  isTransactionEnabled: true,
  platform: "web",
});
