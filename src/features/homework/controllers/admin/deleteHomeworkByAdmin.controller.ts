import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { DeleteHomeworkByAdminTranslationKeysEnum } from "../../constants/admin/deleteHomeworkByAdmin.constants";
import { TDeleteHomeworkByAdminRouteConfig } from "../../types/admin/deleteHomeworkByAdmin.types";
import { deleteHomeworkByAdminService } from "../../services/admin/deleteHomeworkByAdmin.service";

export const deleteHomeworkByAdminController = async (
  routeContext: RouteContext<TDeleteHomeworkByAdminRouteConfig, true>,
) => {
  await deleteHomeworkByAdminService(
    routeContext.connection,
    routeContext.params.newId,
    routeContext.session,
  );
  return new SuccessResponse(
    DeleteHomeworkByAdminTranslationKeysEnum.DELETE_HOMEWORK_BY_ADMIN_RESPONSE,
  );
};
