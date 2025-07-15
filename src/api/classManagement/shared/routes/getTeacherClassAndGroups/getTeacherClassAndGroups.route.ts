import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetTeacherClassAndGroupsController } from "./getTeacherClassAndGroups.controller";
import { GetTeacherClassAndGroupsRouteConfig } from "./getTeacherClassAndGroups.types";
import { getTeacherClassAndGroupsValidation } from "./getTeacherClassAndGroups.validation";

registerSharedRoute<GetTeacherClassAndGroupsRouteConfig>()(
  {
    path: "/classes",
    method: "get",
    querySchema: getTeacherClassAndGroupsValidation.query,
    controller: GetTeacherClassAndGroupsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
