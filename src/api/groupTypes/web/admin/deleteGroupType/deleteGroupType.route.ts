import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteGroupTypeController } from "./deleteGroupType.controller";
import { DeleteGroupTypeRouteConfig } from "./deleteGroupType.types";
import { deleteGroupTypeValidation } from "./deleteGroupType.validation";

registerRoute<DeleteGroupTypeRouteConfig>()({
  path: "/group-types/:groupTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteGroupTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.GROUP_TYPE },
  controller: DeleteGroupTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
