import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBBlankExamPageController } from "./getIBBlankExamPage.controller";
import { GetIBBlankExamPageRouteConfig } from "./getIBBlankExamPage.types";
import { getIBBlankExamPageValidation } from "./getIBBlankExamPage.validation";

registerRoute<GetIBBlankExamPageRouteConfig>()({
  path: "/ib/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getIBBlankExamPageValidation.query,
  paramSchema: getIBBlankExamPageValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetIBBlankExamPageController,
  isTransactionEnabled: false,
  platform: "web",
});
