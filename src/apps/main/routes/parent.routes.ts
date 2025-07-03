import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import parentDashboard from "../../../features/mainDashboard/routes/parent/index.routes";
import childrenPaymentRoutes from "../../../features/payment/routes/parent/index.routes";
import { parentSchoolAnnouncementRoutes } from "../../../features/schoolAnnouncement/routes/parent/index.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

router.use(parentDashboard);
router.use(childrenPaymentRoutes);
generateNotificationRoutes(router, END_USER_ENUM.PARENT);
router.use(parentSchoolAnnouncementRoutes);

export default router;
