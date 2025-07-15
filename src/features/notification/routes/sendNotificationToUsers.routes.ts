import { TSendNotificationToUsersRouteConfig } from "./../types/sendNotificationToUsers.types";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { sendNotificationToUsersController } from "../controllers/sendNotificationToUsers.controller";
import { sendNotificationToUsersTranslation } from "../translations/sendNotificationToUsers.translation";
import { sendNotificationToUsersValidation } from "../validations/sendNotificationToUsers.validation";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";

export const sendNotificationToUsersRouteConfig: RouteConfig<TSendNotificationToUsersRouteConfig> =
  {
    path: "/notifications/send",
    method: "post",
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: sendNotificationToUsersValidation.body,
    controller: sendNotificationToUsersController,
    authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.NOTIFICATION },
    withTransaction: true,
    translations: [sendNotificationToUsersTranslation],
  };
