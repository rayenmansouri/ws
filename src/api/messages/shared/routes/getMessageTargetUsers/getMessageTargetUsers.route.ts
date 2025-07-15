import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetMessageTargetUsersController } from "./getMessageTargetUsers.controller";
import { GetMessageTargetUsersRouteConfig } from "./getMessageTargetUsers.types";
import { getMessageTargetUsersValidation } from "./getMessageTargetUsers.validation";

registerSharedRoute<GetMessageTargetUsersRouteConfig>()(
  {
    path: "/conversations/target-users",
    method: "get",
    querySchema: getMessageTargetUsersValidation.query,
    controller: GetMessageTargetUsersController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
