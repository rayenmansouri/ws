import { updateOneNotificationStatusValidation } from "./../validations/updateOneNotificationStatus.validation";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { updateOneNotificationStatusController } from "../controllers/updateOneNotificationStatus.controller";
import { updateNotificationStatusTranslation } from "../translations/updateNotificationStatus.translation";
import { TUpdateOneNotificationStatusRouteConfig } from "../types/updateOneNotificationStatus.types";

export const generateUpdateOneNotificationStatusRoutesConfig = (
  entity: TEndUserEnum,
  prefixPath = "",
) => {
  const updateNotificationStatusRouteConfig: RouteConfig<TUpdateOneNotificationStatusRouteConfig> =
    {
      path: `${prefixPath}/notifications/:broadcastId/status/seen`,
      method: "patch",
      endUser: entity,
      controller: updateOneNotificationStatusController,
      paramSchema: updateOneNotificationStatusValidation.params,
      translations: [updateNotificationStatusTranslation],
    };
  return updateNotificationStatusRouteConfig;
};
