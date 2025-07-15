import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { createRoutes } from "../../../core/Routes/createRoute";
import homeworkRoutes from "../../../features/homework/routes/admin/index.routes";
import { sendNotificationToUsersRouteConfig } from "../../../features/notification/routes/sendNotificationToUsers.routes";
import adminSessionRoutes, {
  default as scheduleRoutes,
  default as sessionRoutes,
} from "../../../features/schedule/routes/web/admin/index.routes";
import subjectManagementRoutes from "../../../features/subjectManagement/routes/admin/index.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

router.use(subjectManagementRoutes);
router.use(adminSessionRoutes);

createRoutes(router, sendNotificationToUsersRouteConfig);
generateNotificationRoutes(router, END_USER_ENUM.ADMIN);

//?pedagogy routes
router.use(sessionRoutes);

router.use(scheduleRoutes);
router.use(homeworkRoutes);

export default router;
