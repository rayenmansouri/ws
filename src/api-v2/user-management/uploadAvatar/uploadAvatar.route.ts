import { publicRouter } from "../../../apps/main/routers/public-router";
import { getAuthorizedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { RouteConfiguration } from "../../../core/express/types";
import { UploadAvatarController } from "./uploadAvatar.controller";
import { UploadAvatarRouteConfig } from "./uploadAvatar.types";

export const uploadAvatarRoute: RouteConfiguration<UploadAvatarRouteConfig, "/avatar"> = {
    path: "/avatar",
    method: "patch",
    endUser: "ADMIN",
    controller: UploadAvatarController,
    isTransactionEnabled: false,
    middlewaresClasses: getAuthorizedMiddlewares(),
    platform: "web",
    router: publicRouter,
    upload: { 
        fields: [{ name: "avatar", maxCount: 1 }] 
    }
};
