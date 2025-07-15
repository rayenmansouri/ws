import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentDocumentsFilterController } from "./getStudentDocumentsFilter.controller";
import { GetStudentDocumentsFilterRouteConfig } from "./getStudentDocumentsFilter.types";

registerRoute<GetStudentDocumentsFilterRouteConfig>()({
  path: "/documents/filters",
  method: "get",
  endUser: END_USER_ENUM.STUDENT,
  controller: GetStudentDocumentsFilterController,
  isTransactionEnabled: false,
  platform: "mobile",
});
