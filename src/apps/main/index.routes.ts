import "reflect-metadata";
import { Router } from "express";
import { createRoutes } from "../../core/RoutesV2/createRoutes";
import { adminMeRoute, coachMeRoute, masteMeRoute, participantMeRoute } from "../../api-v2/auth/me/me.route";
import { organizationRoute } from "../../api-v2/organization-api/create-organization/organization.route";
import { configRoute } from "../../api-v2/organization-api/config/config.route";
import { getAllOrganizationsRoute } from "../../api-v2/organization-api/get-all-organizations/route";
import { editOrganizationRoute } from "../../api-v2/organization-api/edit-organization";
import { createAdminRoute, coachRoute, createParticipantRoute } from "../../api-v2/user-management/createUser.route";
import { uploadAvatarRoute } from "../../api-v2/user-management/uploadAvatar/uploadAvatar.route";
import { listStudentRoute } from "../../api-v2/user-management/list-student";
import { publicRouter } from "./routers/public-router";
import { adminRouter } from "./routers/admin-router";
import { masterRouter } from "./routers/master-router";
import { dashboardRoute } from "../../api-v2/dashboard/dashboard.route";
import { levelsOverviewRoute } from "../../api-v2/level/web/admin/levelsOverview/levelsOverview.route";
import { forgetPasswordRoute } from "../../api-v2/auth/public/forget-password/forget-password.route";
import { updateCurrentUserPasswordRoute } from "../../api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.route";
import { RouteConfiguration, TypedRequestOptions } from "../../core/express/types";
import { adminLoginRoute, coachLoginRoute, masterLoginRoute, participantLoginRoute } from "../../api-v2/auth/public/login/login.route";
import { logoutRoute } from "../../api-v2/auth/public/logout";
import { listLevelsRoute } from "../../api-v2/level/web/admin/listLevels/listLevels.route";
import { coachRouter } from "./routers/coach-router";
import { participantRouter } from "./routers/participant-router";

const router = Router();

export const internalRouter = Router();

router.use(publicRouter);

router.use("/admin", adminRouter);
router.use("/master", masterRouter);
router.use("/participant", participantRouter);
router.use("/coach", coachRouter);

const routes = [listLevelsRoute,adminLoginRoute,logoutRoute,adminMeRoute,
                organizationRoute, configRoute, getAllOrganizationsRoute, editOrganizationRoute, createParticipantRoute,
                createAdminRoute, coachRoute, uploadAvatarRoute,
                listStudentRoute, dashboardRoute, levelsOverviewRoute,
                forgetPasswordRoute, updateCurrentUserPasswordRoute,
                logoutRoute,masteMeRoute,participantMeRoute,coachMeRoute,
                masterLoginRoute,participantLoginRoute,coachLoginRoute,
                getAllOrganizationsRoute
];
createRoutes(routes as RouteConfiguration<TypedRequestOptions, string>[]);
export default router;
 