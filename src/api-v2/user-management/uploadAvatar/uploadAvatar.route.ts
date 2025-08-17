import { publicRouter } from "../../../apps/main/routers/public-router";
import { RouteConfiguration } from "../../../core/express/types";
import { UploadAvatarController } from "./uploadAvatar.controller";
import { UploadAvatarRouteConfig } from "./uploadAvatar.types";
import { getCoreMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";

export const uploadAvatarRoute: RouteConfiguration<UploadAvatarRouteConfig, "/avatar"> = {
    path: "/avatar",
    method: "patch",
    endUser: "ADMIN",
    controller: UploadAvatarController,
    isTransactionEnabled: false,
    platform: "web",
    router: publicRouter,
    middlewaresClasses: getCoreMiddlewares(),
    upload: { 
        fields: [{ name: "avatar", maxCount: 1 }] 
    }
};
