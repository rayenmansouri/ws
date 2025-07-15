import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetStudentsOfClassController } from "./getStudentsOfClass.controller";
import { GetStudentsOfClassRouteConfig } from "./getStudentsOfClass.types";
import { getStudentsOfClassValidation } from "./getStudentsOfClass.validation";

registerSharedRoute<GetStudentsOfClassRouteConfig>()(
  {
    path: "/class/:classNewId/student-list",
    method: "get",
    querySchema: getStudentsOfClassValidation.query,
    paramSchema: getStudentsOfClassValidation.params,

    controller: GetStudentsOfClassController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
