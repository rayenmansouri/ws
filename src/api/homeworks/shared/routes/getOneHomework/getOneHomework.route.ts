import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneHomeworkController } from "./getOneHomework.controller";
import { GetOneHomeworkRouteConfig } from "./getOneHomework.types";
import { getOneHomeworkValidation } from "./getOneHomework.validation";

registerSharedRoute<GetOneHomeworkRouteConfig>()(
  {
    path: "/homeworks/:homeworkNewId",
    method: "get",
    paramSchema: getOneHomeworkValidation.params,
    controller: GetOneHomeworkController,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
