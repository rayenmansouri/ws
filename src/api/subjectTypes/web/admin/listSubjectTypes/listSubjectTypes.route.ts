import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSubjectTypesController } from "./listSubjectTypes.controller";
import { ListSubjectTypesRouteConfig } from "./listSubjectTypes.types";
import { listSubjectTypesValidation } from "./listSubjectTypes.validation";

registerRoute<ListSubjectTypesRouteConfig>()({
  path: "/subject-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSubjectTypesValidation.query,
  controller: ListSubjectTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
