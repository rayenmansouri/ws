import { ReplaceDatesWithStrings } from "../../../utils";
import { UploadAvatarResponse } from "../../../../src/api-v2/user-management/uploadAvatar/uploadAvatar.types";
import { UploadAvatarRouteConfig } from "../../../../src/api-v2/user-management/uploadAvatar/uploadAvatar.types";

export const uploadAvatarRoute = {
    path: "/avatar",
    method: "patch",
    paramsKey: [],
};

export type UploadAvatarRouteType = ReplaceDatesWithStrings<UploadAvatarRouteConfig> & {
  response: ReplaceDatesWithStrings<UploadAvatarResponse>
}
