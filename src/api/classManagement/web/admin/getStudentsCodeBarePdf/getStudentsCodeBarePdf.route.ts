import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentsCodeBarePdfController } from "./getStudentsCodeBarePdf.controller";
import { GetStudentsCodeBarePdfRouteConfig } from "./getStudentsCodeBarePdf.types";
import { getStudentsCodeBarePdfValidation } from "./getStudentsCodeBarePdf.validation";

registerRoute<GetStudentsCodeBarePdfRouteConfig>()({
  path: "/classes/:classNewId/students-code-bare-pdf",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getStudentsCodeBarePdfValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: GetStudentsCodeBarePdfController,
  isTransactionEnabled: false,
  platform: "web",
});
