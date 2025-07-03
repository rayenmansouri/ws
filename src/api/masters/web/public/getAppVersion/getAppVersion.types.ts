import { GetAppVersionValidation } from "./getAppVersion.validation";

export type GetAppVersionRouteConfig = GetAppVersionValidation & { files: never };
export type GetAppVersionResponse = {
  android: string;
  ios: string;
};
