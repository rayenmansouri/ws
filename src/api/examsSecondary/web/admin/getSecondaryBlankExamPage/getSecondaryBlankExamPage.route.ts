import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSecondaryBlankExamPageController } from "./getSecondaryBlankExamPage.controller";
import { GetSecondaryBlankExamPageRouteConfig } from "./getSecondaryBlankExamPage.types";
import { getSecondaryBlankExamPageValidation } from "./getSecondaryBlankExamPage.validation";

registerRoute<GetSecondaryBlankExamPageRouteConfig>()({
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getSecondaryBlankExamPageValidation.query,
  paramSchema: getSecondaryBlankExamPageValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetSecondaryBlankExamPageController,
  isTransactionEnabled: false,
  platform: "web",
});
