import "reflect-metadata";
import { Router } from "express";
import { createRoutes } from "../../core/RoutesV2/createRoutes";
import { loginRoute } from "../../api-v2/auth/public/login/login.route";
import { meRoute } from "../../api-v2/auth/me/me.route";
import { organizationRoute } from "../../api-v2/organization-api/create-organization/organization.route";
import { configRoute } from "../../api-v2/organization-api/config/config.route";
import { createUserRoute } from "../../api-v2/user-management/createUser.route";
import { uploadAvatarRoute } from "../../api-v2/user-management/uploadAvatar/uploadAvatar.route";
import { publicRouter } from "./routers/public-router";
import { adminRouter } from "./routers/admin-router";
import { masterRouter } from "./routers/master-router";
import { dashboardRoute } from "../../api-v2/dashboard/dashboard.route";
import { levelsOverviewRoute } from "../../api-v2/level/web/admin/levelsOverview/levelsOverview.route";
import { forgetPasswordRoute } from "../../api-v2/auth/public/forget-password/forget-password.route";
import { updateCurrentUserPasswordRoute } from "../../api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.route";

const router = Router();

export const internalRouter = Router();

router.use(publicRouter);

router.use("/admin", adminRouter);
router.use("/master", masterRouter);

const routes = [loginRoute, meRoute, organizationRoute, configRoute, createUserRoute, uploadAvatarRoute, dashboardRoute, levelsOverviewRoute,forgetPasswordRoute, updateCurrentUserPasswordRoute];
createRoutes(routes);
export default router;
 