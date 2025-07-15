import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateGroupTypeController } from "./updateGroupType.controller";
import { UpdateGroupTypeRouteConfig } from "./updateGroupType.types";
import { updateGroupTypeValidation } from "./updateGroupType.validation";

registerRoute<UpdateGroupTypeRouteConfig>()({
  path: "/group-types/:groupTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateGroupTypeValidation.body,
  paramSchema: updateGroupTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.GROUP_TYPE },
  controller: UpdateGroupTypeController,
  isTransactionEnabled: true,
  platform: "web",
});
