import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetPrimaryBlankExamPageController } from "./getPrimaryBlankExamPage.controller";
import { GetPrimaryBlankExamPageRouteConfig } from "./getPrimaryBlankExamPage.types";
import { getPrimaryBlankExamPageValidation } from "./getPrimaryBlankExamPage.validation";

registerRoute<GetPrimaryBlankExamPageRouteConfig>()({
  path: "/primary/classes/:classNewId/fields/:fieldIndex/blank-exam-page",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getPrimaryBlankExamPageValidation.query,
  paramSchema: getPrimaryBlankExamPageValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetPrimaryBlankExamPageController,
  isTransactionEnabled: false,
  platform: "web",
});
