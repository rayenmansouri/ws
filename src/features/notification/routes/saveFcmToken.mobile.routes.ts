import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { saveFcmTokenController } from "../controllers/saveFcmToken.mobile.controller";
import { saveFcmTokenTranslation } from "../translations/saveFcmToken.translation";
import { saveFcmTokenValidation } from "../validations/saveFcmToken.mobile.validation";
import { TSaveFcmTokenRouteConfig } from "./../types/saveFcmToken.mobile.types";

export const generateSaveFcmTokenConfigRoutes = (
  entity: TEndUserEnum,
): RouteConfig<TSaveFcmTokenRouteConfig> => {
  const saveFcmTokenRouteConfig: RouteConfig<TSaveFcmTokenRouteConfig> = {
    path: `/notifications/save-token`,
    method: "post",
    endUser: entity,
    bodySchema: saveFcmTokenValidation.body,
    controller: saveFcmTokenController,
    translations: [saveFcmTokenTranslation],
  };
  return saveFcmTokenRouteConfig;
};
