import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetTeacherProfileController } from "./getTeacherProfile.controller";
import { GetTeacherProfileRouteConfig } from "./getTeacherProfile.types";

registerSharedRoute<GetTeacherProfileRouteConfig>()(
  {
    path: "/profile",
    method: "get",
    controller: GetTeacherProfileController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
