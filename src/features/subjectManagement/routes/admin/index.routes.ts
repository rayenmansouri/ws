import { Router } from "express";
import { createRoutes } from "../../../../core/Routes/createRoute";
import { getSubjectsOfClassByAdminConfig } from "./getTeacherSubjectsOfClassByAdmin.routes";

const router = Router();

createRoutes(router, getSubjectsOfClassByAdminConfig);

export default router;
