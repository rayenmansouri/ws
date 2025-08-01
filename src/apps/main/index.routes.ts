import "reflect-metadata";
import { Router } from "express";
import { createRoutes } from "../../core/RoutesV2/createRoutes";
import { RouteConfiguration } from "../../core/express/types";
import { loginRoute } from "../../api-v2/auth/public/login/login.route";
import { schoolRoute } from "../../api-v2/school-api/school.route";

const router = Router();

export const webPublicRouter = Router();


export const internalRouter = Router();

router.use(webPublicRouter);

const routes: RouteConfiguration<any, string>[] = [loginRoute, schoolRoute];
createRoutes(routes);
export default router;
 