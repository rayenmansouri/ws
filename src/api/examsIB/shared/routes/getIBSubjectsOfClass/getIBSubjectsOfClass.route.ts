import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { getIBSubjectsOfClassValidation } from "./getIBSubjectsOfClass.validation";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { GetIBSubjectsOfClassController } from "./getIBSubjectsOfClass.controller";
import { GetIBSubjectsOfClassRouteConfig } from "./getIBSubjectsOfClass.types";

registerSharedRoute<GetIBSubjectsOfClassRouteConfig>()(
  {
    path: "/ib/classes/:classNewId/subjects",
    method: "get",
    querySchema: getIBSubjectsOfClassValidation.query,
    paramSchema: getIBSubjectsOfClassValidation.params,
    controller: GetIBSubjectsOfClassController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
