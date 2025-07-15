import { Router } from "express";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { createRoutes } from "./../../../core/Routes/createRoute";
import { generateGetNotificationSettingsRoutesConfig } from "./getNotificationSettings.routes";
import { generateSaveFcmTokenConfigRoutes } from "./saveFcmToken.routes";
import { generateUpdateNotificationSettingsRoutesConfig } from "./updateNotificationSettings.routes";
import { generateUpdateNotificationStatusConfigRoutes } from "./updateNotificationStatus.routes";
import { generateUpdateOneNotificationStatusRoutesConfig } from "./updateOneNotificationStatus.routes";

export const generateNotificationRoutes = (router: Router, entity: TEndUserEnum) => {
  createRoutes(
    router,
    generateGetNotificationSettingsRoutesConfig(entity),
    generateSaveFcmTokenConfigRoutes(entity),
    generateUpdateNotificationSettingsRoutesConfig(entity),
    generateUpdateNotificationStatusConfigRoutes(entity),
    generateUpdateOneNotificationStatusRoutesConfig(entity),
  );
};
