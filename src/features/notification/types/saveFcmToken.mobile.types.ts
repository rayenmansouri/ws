import { TSaveFcmTokenValidation } from "./../validations/saveFcmToken.mobile.validation";
import { ObjectId } from "mongoose";
export type TSaveFcmTokenRouteConfig = TSaveFcmTokenValidation;

export type TSaveFcmTokenResponse = {
  userId: ObjectId;
  registrationToken: string;
};
