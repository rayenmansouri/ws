import { TSaveFcmTokenValidation } from "./../validations/saveFcmToken.validation";

export type TSaveFcmTokenRouteConfig = TSaveFcmTokenValidation;
export type TSaveFcmTokenResponse = {
  userId: string;
  registrationToken: string;
};
