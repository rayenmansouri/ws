import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import studentDashboard from "../../../features/mainDashboard/routes/student/index.routes";
import { createRoutes } from "../../../core/Routes/createRoute";
import { generateNotificationMobileRoutes } from "../../../features/notification/routes/index.mobile.routes";
import { studentSchoolAnnouncementRoutes } from "../../../features/schoolAnnouncement/routes/student/index.routes";

const studentMobileRoutes = express.Router();

studentMobileRoutes.use(
  generateNotificationMobileRoutes(END_USER_ENUM.STUDENT),
  studentDashboard,
  studentSchoolAnnouncementRoutes,
);
createRoutes(studentMobileRoutes);

export { studentMobileRoutes };
