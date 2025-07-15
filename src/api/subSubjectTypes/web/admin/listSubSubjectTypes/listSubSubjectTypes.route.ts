import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSubSubjectTypesController } from "./listSubSubjectTypes.controller";
import { ListSubSubjectTypesRouteConfig } from "./listSubSubjectTypes.types";
import { listSubSubjectTypesValidation } from "./listSubSubjectTypes.validation";

registerRoute<ListSubSubjectTypesRouteConfig>()({
  path: "/sub-subject-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSubSubjectTypesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SUB_SUBJECT },
  controller: ListSubSubjectTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
