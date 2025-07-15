import { TSaveFcmTokenValidation } from "./../validations/saveFcmToken.validation";
import { ObjectId } from "mongoose";
export type TSaveFcmTokenRouteConfig = TSaveFcmTokenValidation;

export type TSaveFcmTokenResponse = {
  userId: ObjectId;
  registrationToken: string;
};
