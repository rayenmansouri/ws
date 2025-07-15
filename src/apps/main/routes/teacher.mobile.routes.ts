import { Router } from "express";
import { teacherMobileHomeworkRoutes } from "../../../features/homework/routes/mobile/teacher/index.mobile.routes";
import { teacherMobileScheduleRoutes } from "../../../features/schedule/routes/mobile/teacher/index.mobile.routes";
import { teacherSubjectManagementRoutes } from "../../../features/subjectManagement/routes/mobile/index.routes";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { generateNotificationMobileRoutes } from "./../../../features/notification/routes/index.mobile.routes";

const teacherMobileRoutes = Router();

teacherMobileRoutes.use(
  generateNotificationMobileRoutes(END_USER_ENUM.TEACHER),
  teacherMobileScheduleRoutes,
  teacherMobileHomeworkRoutes,
  teacherSubjectManagementRoutes,
);
export { teacherMobileRoutes };
