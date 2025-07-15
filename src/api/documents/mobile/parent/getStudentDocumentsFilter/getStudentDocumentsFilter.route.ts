import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentDocumentsFilterController } from "./getStudentDocumentsFilter.controller";
import { GetStudentDocumentsFilterRouteConfig } from "./getStudentDocumentsFilter.types";
import { getStudentDocumentsFilterValidation } from "./getStudentDocumentsFilter.validation";

registerRoute<GetStudentDocumentsFilterRouteConfig>()({
  path: "/students/:studentNewId/documents/filters",
  method: "get",
  endUser: END_USER_ENUM.PARENT,
  paramSchema: getStudentDocumentsFilterValidation.params,
  controller: GetStudentDocumentsFilterController,
  isTransactionEnabled: false,
  platform: "mobile",
});
