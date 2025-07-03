import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCambridgeBlankExamPageController } from "./getCambridgeBlankExamPage.controller";
import { GetCambridgeBlankExamPageRouteConfig } from "./getCambridgeBlankExamPage.types";
import { getCambridgeBlankExamPageValidation } from "./getCambridgeBlankExamPage.validation";

registerRoute<GetCambridgeBlankExamPageRouteConfig>()({
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getCambridgeBlankExamPageValidation.query,
  paramSchema: getCambridgeBlankExamPageValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetCambridgeBlankExamPageController,
  isTransactionEnabled: false,
  platform: "web",
});
