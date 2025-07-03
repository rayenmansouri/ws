import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSectionController } from "./addSection.controller";
import { AddSectionRouteConfig } from "./addSection.types";
import { addSectionValidation } from "./addSection.validation";

registerRoute<AddSectionRouteConfig>()({
  path: "/section",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSectionValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SECTION },
  controller: AddSectionController,
  isTransactionEnabled: false,
  platform: "web",
});
