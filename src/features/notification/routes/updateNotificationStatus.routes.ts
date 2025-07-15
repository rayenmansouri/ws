import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { updateNotificationStatusController } from "../controllers/updateNotificationStatus.controller";
import { updateNotificationStatusTranslation } from "../translations/updateNotificationStatus.translation";

export const generateUpdateNotificationStatusConfigRoutes = (
  entity: TEndUserEnum,
  prefixPath = "",
) => {
  const updateNotificationStatusRouteConfig: RouteConfig<{}> = {
    path: `${prefixPath}/notifications/status/seen`,
    method: "patch",
    endUser: entity,
    controller: updateNotificationStatusController,
    translations: [updateNotificationStatusTranslation],
  };
  return updateNotificationStatusRouteConfig;
};
