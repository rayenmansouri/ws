import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSectionController } from "./updateSection.controller";
import { UpdateSectionRouteConfig } from "./updateSection.types";
import { updateSectionValidation } from "./updateSection.validation";

registerRoute<UpdateSectionRouteConfig>()({
  path: "/sections/:sectionNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSectionValidation.body,
  paramSchema: updateSectionValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SECTION },
  controller: UpdateSectionController,
  isTransactionEnabled: false,
  platform: "web",
});
