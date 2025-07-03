import { Router } from "express";
import { teacherMobileHomeworkRoutes } from "../../../features/homework/routes/mobile/teacher/index.mobile.routes";
import { teacherMobileDashboardRoutes } from "../../../features/mainDashboard/routes/teacher/index.mobile.routes";
import { teacherMobileScheduleRoutes } from "../../../features/schedule/routes/mobile/teacher/index.mobile.routes";
import { teacherSchoolAnnouncementMobileRoutes } from "../../../features/schoolAnnouncement/routes/mobile/teacher/index.routes";
import { teacherSubjectManagementRoutes } from "../../../features/subjectManagement/routes/mobile/index.routes";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { generateNotificationMobileRoutes } from "./../../../features/notification/routes/index.mobile.routes";

const teacherMobileRoutes = Router();

teacherMobileRoutes.use(
  generateNotificationMobileRoutes(END_USER_ENUM.TEACHER),
  teacherMobileDashboardRoutes,
  teacherMobileScheduleRoutes,
  teacherMobileHomeworkRoutes,
  teacherSubjectManagementRoutes,
  teacherSchoolAnnouncementMobileRoutes,
);
export { teacherMobileRoutes };
