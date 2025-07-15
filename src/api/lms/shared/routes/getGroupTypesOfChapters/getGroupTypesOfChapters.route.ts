import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetGroupTypesOfChaptersController } from "./getGroupTypesOfChapters.controller";
import { GetGroupTypesOfChaptersRouteConfig } from "./getGroupTypesOfChapters.types";

registerSharedRoute<GetGroupTypesOfChaptersRouteConfig>()(
  {
    path: "/groupTypes/chapters",
    method: "get",
    controller: GetGroupTypesOfChaptersController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
