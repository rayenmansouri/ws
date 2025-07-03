import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import studentDashboard from "../../../features/mainDashboard/routes/student/index.routes";
import { studentSchoolAnnouncementRoutes } from "../../../features/schoolAnnouncement/routes/student/index.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

router.use(studentDashboard);
generateNotificationRoutes(router, END_USER_ENUM.STUDENT);
router.use(studentSchoolAnnouncementRoutes);

export default router;
