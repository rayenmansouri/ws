import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListDocumentsOfStudentController } from "./listDocumentsOfStudent.controller";
import { ListDocumentsOfStudentRouteConfig } from "./listDocumentsOfStudent.types";
import { listDocumentsOfStudentValidation } from "./listDocumentsOfStudent.validation";

registerRoute<ListDocumentsOfStudentRouteConfig>()({
  path: "/documents",
  method: "get",
  endUser: END_USER_ENUM.STUDENT,
  querySchema: listDocumentsOfStudentValidation.query,
  controller: ListDocumentsOfStudentController,
  isTransactionEnabled: false,
  platform: "mobile",
});
