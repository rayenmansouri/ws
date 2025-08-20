import { publicRouter } from "../../../apps/main/routers/public-router";
import { RouteConfiguration } from "../../../core/express/types";
import { UploadAvatarController } from "./uploadAvatar.controller";
import { UploadAvatarRouteConfig } from "./uploadAvatar.types";
import { getAuthenticatedMiddlewares, getCoreMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { z } from "zod";

export const uploadAvatarRoute: RouteConfiguration<UploadAvatarRouteConfig, "/avatar"> = {
    path: "/avatar",
    method: "patch",
    bodySchema: z.object({}),
    querySchema: z.object({}),
    isPublic: false,
    endUser: "admin",
    controller: UploadAvatarController,
    isTransactionEnabled: false,
    platform: "web",
    router: publicRouter,
    middlewaresClasses: getAuthenticatedMiddlewares(),
    upload: { 
        fields: [{ name: "avatar", maxCount: 1 }] 
    }
};
