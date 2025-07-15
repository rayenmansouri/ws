import { Router } from "express";
import { createRoutes } from "../../../../../core/Routes/createRoute";
import { getFutureSessionByTeacherMobileRouteConfig } from "./getFutureSessionByTeacher.mobile.routes";

const teacherMobileScheduleRoutes = Router();

createRoutes(teacherMobileScheduleRoutes, getFutureSessionByTeacherMobileRouteConfig);
export { teacherMobileScheduleRoutes };
