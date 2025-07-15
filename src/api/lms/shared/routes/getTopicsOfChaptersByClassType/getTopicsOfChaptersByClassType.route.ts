import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetTopicsOfChaptersByClassTypeController } from "./getTopicsOfChaptersByClassType.controller";
import { GetTopicsOfChaptersByClassTypeRouteConfig } from "./getTopicsOfChaptersByClassType.types";
import { getTopicsOfChaptersByClassTypeValidation } from "./getTopicsOfChaptersByClassType.validation";

registerSharedRoute<GetTopicsOfChaptersByClassTypeRouteConfig>()(
  {
    path: "/classTypes/:classTypeNewId/topics/chapters",
    method: "get",
    paramSchema: getTopicsOfChaptersByClassTypeValidation.params,
    controller: GetTopicsOfChaptersByClassTypeController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
  ],
);
