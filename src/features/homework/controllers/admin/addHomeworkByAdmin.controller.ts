import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { AddHomeworkTranslationKeysEnum } from "../../constants/shared/addHomework.constants";
import { TAddHomeworkByAdminRouteConfig } from "../../routes/admin/addHomeworkByAdmin.routes";
import { addHomeworkService } from "../../services/shared/addHomework.service";

export const addHomeworkByAdminController = async (
  routeContext: RouteContext<TAddHomeworkByAdminRouteConfig, true>,
) => {
  const result = await addHomeworkService(
    routeContext.connection,
    routeContext.body,
    routeContext.session,
    routeContext.tenantId,
    routeContext.files?.homeworks,
  );

  return new SuccessResponse(AddHomeworkTranslationKeysEnum.ADD_HOMEWORK_BY_ADMIN_RESPONSE, result);
};
