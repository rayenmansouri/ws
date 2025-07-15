import { TSaveFcmTokenRouteConfig } from "./../types/saveFcmToken.mobile.types";
import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { SaveFcmTokenTranslationKeysEnum } from "../constants/saveFcmToken.constants";

import { saveFcmTokenService } from "./../services/saveFcmToken.service";

export const saveFcmTokenController = async (req: RouteContext<TSaveFcmTokenRouteConfig>) => {
  const { registrationToken } = req.body;
  const { _id: userId } = req.user;
  const result = await saveFcmTokenService(
    req.connection,
    userId.toString(),
    registrationToken,
    req.body.userAgent,
  );

  return new SuccessResponse(
    SaveFcmTokenTranslationKeysEnum.NOTIFICATION_SETTING_NOT_FOUND,
    result,
  );
};
