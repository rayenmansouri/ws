import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListDocumentsOfStudentController } from "./listDocumentsOfStudent.controller";
import { ListDocumentsOfStudentRouteConfig } from "./listDocumentsOfStudent.types";
import { listDocumentsOfStudentValidation } from "./listDocumentsOfStudent.validation";

registerRoute<ListDocumentsOfStudentRouteConfig>()({
  path: "/students/:studentNewId/documents",
  method: "get",
  endUser: END_USER_ENUM.PARENT,
  querySchema: listDocumentsOfStudentValidation.query,
  paramSchema: listDocumentsOfStudentValidation.params,
  controller: ListDocumentsOfStudentController,
  isTransactionEnabled: false,
  platform: "mobile",
});
