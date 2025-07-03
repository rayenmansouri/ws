import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSectionController } from "./deleteSection.controller";
import { DeleteSectionRouteConfig } from "./deleteSection.types";
import { deleteSectionValidation } from "./deleteSection.validation";

registerRoute<DeleteSectionRouteConfig>()({
  path: "/sections/:sectionNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSectionValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SECTION },
  controller: DeleteSectionController,
  isTransactionEnabled: false,
  platform: "web",
});
