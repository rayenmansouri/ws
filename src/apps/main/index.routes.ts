import "reflect-metadata";
import { Router } from "express";
import path from "path";
import adminRoute from "./routes/admin.routes";
import mobileParentRoutes from "./routes/parent.mobile.routes";
import parentRoute from "./routes/parent.routes";
import studentRoute from "./routes/student.routes";
import { teacherMobileRoutes } from "./routes/teacher.mobile.routes";
import teacherRoute from "./routes/teacher.routes";
import { importAllRoutes } from "./importAllRoutes";
import { studentMobileRoutes } from "./routes/student.mobile.routes";

const router = Router();

export const webPublicRouter = Router();
export const webMasterRouter = Router();
export const webAdminRouter = Router();
export const webStudentRouter = Router();
export const webTeacherRouter = Router();
export const webParentRouter = Router();

export const mobilePublicRouter = Router();
export const mobileParentRouter = Router();
export const mobileTeacherRouter = Router();
export const mobileStudentRouter = Router();
export const mobileAdminRouter = Router();

export const internalRouter = Router();

router.use(webPublicRouter);
router.use("/master", webMasterRouter);
router.use("/admin", webAdminRouter, adminRoute);
router.use("/student", webStudentRouter, studentRoute);
router.use("/teacher", webTeacherRouter, teacherRoute);
router.use("/parent", webParentRouter, parentRoute);

router.use("/mobile", mobilePublicRouter);
router.use("/mobile/teacher", teacherMobileRoutes, mobileTeacherRouter);
router.use("/mobile/student", studentMobileRoutes, mobileStudentRouter);
router.use("/mobile/parent", mobileParentRoutes, mobileParentRouter);

importAllRoutes(path.join(__dirname, "../../api"));

export default router;
