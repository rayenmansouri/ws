import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddGroupTypeController } from "./addGroupType.controller";
import { AddGroupTypeRouteConfig } from "./addGroupType.types";
import { addGroupTypeValidation } from "./addGroupType.validation";

registerRoute<AddGroupTypeRouteConfig>()({
  path: "/group-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addGroupTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.GROUP_TYPE },
  controller: AddGroupTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
