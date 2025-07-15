import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetGradesOfIBGroupController } from "./getGradesOfIBGroup.controller";
import { GetGradesOfIBGroupRouteConfig } from "./getGradesOfIBGroup.types";
import { getGradesOfIBGroupValidation } from "./getGradesOfIBGroup.validation";

registerSharedRoute<GetGradesOfIBGroupRouteConfig>()(
  {
    path: "/ib/groups/:groupNewId/grades",
    method: "get",
    querySchema: getGradesOfIBGroupValidation.query,
    paramSchema: getGradesOfIBGroupValidation.params,
    controller: GetGradesOfIBGroupController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
