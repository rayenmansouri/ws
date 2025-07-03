import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { createRoutes } from "../../../core/Routes/createRoute";
import financeRoutes from "../../../features/finance/routes/index.routes";
import homeworkRoutes from "../../../features/homework/routes/admin/index.routes";
import { sendNotificationToUsersRouteConfig } from "../../../features/notification/routes/sendNotificationToUsers.routes";
import adminSessionRoutes, {
  default as scheduleRoutes,
  default as sessionRoutes,
} from "../../../features/schedule/routes/web/admin/index.routes";
import studentPayment from "../../../features/payment/routes/admin/index.routes";
import subjectManagementRoutes from "../../../features/subjectManagement/routes/admin/index.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";
import adminPaymentRoutes from "../../../features/payment/routes/admin/index.routes";
import { adminSchoolAnnouncementRoutes } from "../../../features/schoolAnnouncement/routes/admin/index.routes";

const router = express.Router();

router.use(financeRoutes);
router.use(adminPaymentRoutes);
router.use(subjectManagementRoutes);
router.use(studentPayment);
router.use(adminSessionRoutes);

createRoutes(router, sendNotificationToUsersRouteConfig);
generateNotificationRoutes(router, END_USER_ENUM.ADMIN);

//?pedagogy routes
router.use(sessionRoutes);

router.use(scheduleRoutes);
router.use(homeworkRoutes);

router.use(adminSchoolAnnouncementRoutes);

export default router;
