import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetChaptersByTopicController } from "./getChaptersByTopic.controller";
import { GetChaptersByTopicRouteConfig } from "./getChaptersByTopic.types";
import { getChaptersByTopicValidation } from "./getChaptersByTopic.validation";

registerSharedRoute<GetChaptersByTopicRouteConfig>()(
  {
    path: "/topics/chapters",
    method: "get",
    querySchema: getChaptersByTopicValidation.query,
    controller: GetChaptersByTopicController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
