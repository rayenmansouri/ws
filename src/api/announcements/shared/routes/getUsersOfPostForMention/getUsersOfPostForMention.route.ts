import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetUsersOfPostForMentionController } from "./getUsersOfPostForMention.controller";
import { GetUsersOfPostForMentionRouteConfig } from "./getUsersOfPostForMention.types";
import { getUsersOfPostForMentionValidation } from "./getUsersOfPostForMention.validation";

registerSharedRoute<GetUsersOfPostForMentionRouteConfig>()(
  {
    path: "/users",
    method: "get",
    querySchema: getUsersOfPostForMentionValidation.query,
    controller: GetUsersOfPostForMentionController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
