import { TEndAdministrationUserEnums } from "../../../../constants/globalEnums";
import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { UpdateHomeworkTranslationKeysEnum } from "../../constants/shared/updateHomework.constants";
import { updateHomeworkService } from "../../services/shared/updateHomework.service";
import { TUpdateHomeworkRouteConfig } from "../../types/shared/updateHomework.types";

export const updateHomeworkController =
  (endUser: TEndAdministrationUserEnums) =>
  async (routeContext: RouteContext<TUpdateHomeworkRouteConfig, true>) => {
    await updateHomeworkService(
      routeContext.connection,
      routeContext.params.homeworkNewId,
      endUser,
      routeContext.user._id,
      routeContext.body,
      routeContext.tenantId,
      routeContext.session,
      routeContext.files?.homeworks,
    );
    return new SuccessResponse(UpdateHomeworkTranslationKeysEnum.UPDATE_HOMEWORK_RESPONSE);
  };
