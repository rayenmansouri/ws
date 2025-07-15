import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetTeachersOfStudentController } from "./getTeachersOfStudent.controller";
import { GetTeachersOfStudentRouteConfig } from "./getTeachersOfStudent.types";
import { getTeachersOfStudentValidation } from "./getTeachersOfStudent.validation";

registerSharedRoute<GetTeachersOfStudentRouteConfig>()(
  {
    path: "/students/:studentNewId/teachers",
    method: "get",
    paramSchema: getTeachersOfStudentValidation.params,
    controller: GetTeachersOfStudentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
