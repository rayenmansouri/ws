import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSessionForClassController } from "./updateSessionForClass.controller";
import { UpdateSessionForClassRouteConfig } from "./updateSessionForClass.types";
import { updateSessionForClassValidation } from "./updateSessionForClass.validation";

registerRoute<UpdateSessionForClassRouteConfig>()({
  path: "/session/:sessionNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSessionForClassValidation.body,
  paramSchema: updateSessionForClassValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION },
  controller: UpdateSessionForClassController,
  isTransactionEnabled: false,
  platform: "web",
});
