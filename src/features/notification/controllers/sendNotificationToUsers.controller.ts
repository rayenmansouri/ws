import { TSendNotificationToUsersRouteConfig } from "./../types/sendNotificationToUsers.types";
import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { SendNotificationToUsersTranslationKeysEnum } from "../constants/sendNotificationToUsers.constants";

import { sendNotificationToUsersService } from "../services/sendNotificationToUsers.service";
import { objectIdsToStrings } from "./../../../helpers/functionsUtils";

export const sendNotificationToUsersController = async (
  req: RouteContext<TSendNotificationToUsersRouteConfig, true>,
) => {
  const { usersIds, usersType, notificationSettings } = req.body;
  await sendNotificationToUsersService(
    req.connection,
    objectIdsToStrings(usersIds),
    usersType,
    notificationSettings,
    req.tenantId,
    req.session,
    null,
  );

  return new SuccessResponse(
    SendNotificationToUsersTranslationKeysEnum.SEND_NOTIFICATION_TO_USERS_RESPONSE,
  );
};
