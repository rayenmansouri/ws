import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetStudentProfileController } from "./getStudentProfile.controller";
import { GetStudentProfileRouteConfig } from "./getStudentProfile.types";

registerSharedRoute<GetStudentProfileRouteConfig>()(
  {
    path: "/profile",
    method: "get",
    controller: GetStudentProfileController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
