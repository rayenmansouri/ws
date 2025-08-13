import "reflect-metadata";
import { Router } from "express";
import { createRoutes } from "../../core/RoutesV2/createRoutes";
import { loginRoute } from "../../api-v2/auth/public/login/login.route";
import { meRoute } from "../../api-v2/auth/me/me.route";
import { organizationRoute } from "../../api-v2/organization-api/create-organization/organization.route";
import { configRoute } from "../../api-v2/organization-api/config/config.route";
import { createUserRoute } from "../../api-v2/user-management/createUser.route";

const router = Router();

export const webPublicRouter = Router();


export const internalRouter = Router();

router.use(webPublicRouter);

const routes = [loginRoute, meRoute, organizationRoute, configRoute, createUserRoute];
// @ts-expect-error - TypeScript can't properly infer union types for different route configurations
createRoutes(routes);
export default router;
 