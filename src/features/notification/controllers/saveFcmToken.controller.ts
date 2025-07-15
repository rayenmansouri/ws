import { TSaveFcmTokenRouteConfig } from "./../types/saveFcmToken.types";
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
    req.headers["user-agent"],
  );

  return new SuccessResponse(SaveFcmTokenTranslationKeysEnum.SAVE_FCM_TOKEN_RESPONSE, result);
};
