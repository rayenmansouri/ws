import { ReplaceDatesWithStrings } from "../../../utils";
import { UploadAvatarResponse } from "../../../../src/api-v2/user-management/uploadAvatar/uploadAvatar.types";
import { UploadAvatarRouteConfig } from "../../../../src/api-v2/user-management/uploadAvatar/uploadAvatar.types";

export const uploadAvatarRoute = {
    path: "/avatar",
    method: "patch",
    paramsKey: [],
};

export type UploadAvatarRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<UploadAvatarRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<UploadAvatarRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<UploadAvatarRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<UploadAvatarRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<UploadAvatarResponse>;
  };
}
