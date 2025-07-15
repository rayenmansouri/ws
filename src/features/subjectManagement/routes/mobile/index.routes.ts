import { Router } from "express";
import { createRoutes } from "../../../../core/Routes/createRoute";
import { getSubjectsOfTeacherClassConfig } from "../teacher/getSubjectsOfTeacherClass.routes";

const teacherSubjectManagementRoutes = Router();

createRoutes(teacherSubjectManagementRoutes, getSubjectsOfTeacherClassConfig);

export { teacherSubjectManagementRoutes };
