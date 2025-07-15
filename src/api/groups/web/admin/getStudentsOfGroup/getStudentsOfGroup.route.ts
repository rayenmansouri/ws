import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetStudentsOfGroupController } from "./getStudentsOfGroup.controller";
import { GetStudentsOfGroupRouteConfig } from "./getStudentsOfGroup.types";
import { getStudentsOfGroupValidation } from "./getStudentsOfGroup.validation";

registerSharedRoute<GetStudentsOfGroupRouteConfig>()(
  {
    path: "/groups/:groupNewId/student-list",
    method: "get",
    paramSchema: getStudentsOfGroupValidation.params,
    querySchema: getStudentsOfGroupValidation.query,
    controller: GetStudentsOfGroupController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web"] },
  ],
);
