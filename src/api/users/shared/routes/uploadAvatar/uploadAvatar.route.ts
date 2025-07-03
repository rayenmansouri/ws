import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UploadAvatarController } from "./uploadAvatar.controller";
import { UploadAvatarRouteConfig } from "./uploadAvatar.types";

registerSharedRoute<UploadAvatarRouteConfig>()(
  {
    path: "/avatar",
    method: "patch",
    controller: UploadAvatarController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "avatar", maxCount: 1 }] },
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["mobile", "web"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["mobile", "web"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["mobile", "web"] },
  ],
);
