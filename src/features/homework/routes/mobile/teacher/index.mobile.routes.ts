import { Router } from "express";
import { createRoutes } from "../../../../../core/Routes/createRoute";
import { addHomeworkByTeacherMobileRouteConfig } from "./addHomeworkByTeacher.mobile.routes";

const teacherMobileHomeworkRoutes = Router();

createRoutes(teacherMobileHomeworkRoutes, addHomeworkByTeacherMobileRouteConfig);

export { teacherMobileHomeworkRoutes };
