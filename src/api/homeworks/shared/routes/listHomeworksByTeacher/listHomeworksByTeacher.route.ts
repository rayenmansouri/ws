import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListHomeworksByTeacherController } from "./listHomeworksByTeacher.controller";
import { ListHomeworksByTeacherRouteConfig } from "./listHomeworksByTeacher.types";
import { listHomeworksByTeacherValidation } from "./listHomeworksByTeacher.validation";

registerSharedRoute<ListHomeworksByTeacherRouteConfig>()(
  {
    path: "/homeworks",
    method: "get",
    querySchema: listHomeworksByTeacherValidation.query,
    controller: ListHomeworksByTeacherController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
