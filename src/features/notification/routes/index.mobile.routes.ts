import { Router } from "express";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { createRoutes } from "./../../../core/Routes/createRoute";
import { generateGetNotificationSettingsRoutesConfig } from "./getNotificationSettings.routes";
import { generateSaveFcmTokenConfigRoutes } from "./saveFcmToken.mobile.routes";
import { generateUpdateNotificationSettingsConfigRoutes } from "./updateNotificationSettings.mobile.routes";
import { generateUpdateNotificationStatusConfigRoutes } from "./updateNotificationStatus.routes";
import { generateUpdateOneNotificationStatusRoutesConfig } from "./updateOneNotificationStatus.routes";

export const generateNotificationMobileRoutes = (entity: TEndUserEnum): Router => {
  const router = Router();
  createRoutes(
    router,
    generateGetNotificationSettingsRoutesConfig(entity),
    generateSaveFcmTokenConfigRoutes(entity),
    generateUpdateNotificationSettingsConfigRoutes(entity),
    generateUpdateNotificationStatusConfigRoutes(entity),
    generateUpdateOneNotificationStatusRoutesConfig(entity),
  );
  return router;
};
