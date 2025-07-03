import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetNotPromotedStudentsController } from "./getNotPromotedStudents.controller";
import { GetNotPromotedStudentsRouteConfig } from "./getNotPromotedStudents.types";

registerRoute<GetNotPromotedStudentsRouteConfig>()({
  path: "/levels/not-promoted-students",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL_YEAR },
  controller: GetNotPromotedStudentsController,
  isTransactionEnabled: false,
  platform: "web",
});
