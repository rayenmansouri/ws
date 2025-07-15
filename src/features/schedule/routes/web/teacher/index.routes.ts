import { Router } from "express";
import { createRoutes } from "../../../../../core/Routes/createRoute";
import { getFutureSessionByTeacherRouteConfig } from "./getFutureSessionByTeacher.routes";

const router = Router();

createRoutes(router, getFutureSessionByTeacherRouteConfig);
export default router;
