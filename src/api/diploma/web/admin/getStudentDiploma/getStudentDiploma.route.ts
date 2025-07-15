import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentDiplomaController } from "./getStudentDiploma.controller";
import { GetStudentDiplomaRouteConfig } from "./getStudentDiploma.types";
import { getStudentDiplomaValidation } from "./getStudentDiploma.validation";

registerRoute<GetStudentDiplomaRouteConfig>()({
  path: "/students/:studentNewId/diplomas",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getStudentDiplomaValidation.query,
  paramSchema: getStudentDiplomaValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.DIPLOMA },
  controller: GetStudentDiplomaController,
  isTransactionEnabled: false,
  platform: "web",
});
