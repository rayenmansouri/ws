import express from "express";
import { createRoutes } from "../../../../../core/Routes/createRoute";
import { getFutureSessionOfTeacherRouteConfig } from "./getFutureSessionOfTeacher.routes";
import { getFutureSessionsRouteConfig } from "./getFutureSessions.routes";

const router = express.Router();

createRoutes(router, getFutureSessionsRouteConfig, getFutureSessionOfTeacherRouteConfig);

export default router;
