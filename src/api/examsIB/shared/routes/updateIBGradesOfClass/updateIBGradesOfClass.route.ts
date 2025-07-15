import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateIBGradesOfClassController } from "./updateIBGradesOfClass.controller";
import { UpdateIBGradesOfClassRouteConfig } from "./updateIBGradesOfClass.types";
import { updateIBGradesOfClassValidation } from "./updateIBGradesOfClass.validation";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";

registerSharedRoute<UpdateIBGradesOfClassRouteConfig>()(
  {
    path: "/ib/classes/:classNewId/subjects/:subjectNewId/grades",
    method: "patch",
    bodySchema: updateIBGradesOfClassValidation.body,
    paramSchema: updateIBGradesOfClassValidation.params,
    controller: UpdateIBGradesOfClassController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
    },
  ],
);
