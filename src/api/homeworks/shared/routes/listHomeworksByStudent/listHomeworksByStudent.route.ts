import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListHomeworksByStudentController } from "./listHomeworksByStudent.controller";
import { ListHomeworksByStudentRouteConfig } from "./listHomeworksByStudent.types";
import { listHomeworksByStudentValidation } from "./listHomeworksByStudent.validation";

registerSharedRoute<ListHomeworksByStudentRouteConfig>()(
  {
    path: "/homeworks",
    method: "get",
    querySchema: listHomeworksByStudentValidation.query,
    controller: ListHomeworksByStudentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
