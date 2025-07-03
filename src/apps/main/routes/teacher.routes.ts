import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import teacherHomework from "../../../features/homework/routes/teacher/index.routes";
import teacherDashboard from "../../../features/mainDashboard/routes/teacher/index.routes";
import teacherScheduleRoutes from "../../../features/schedule/routes/web/teacher/index.routes";
import { teacherSchoolAnnouncementRoutes } from "../../../features/schoolAnnouncement/routes/teacher/index.routes";
import teacherSubjectManagement from "../../../features/subjectManagement/routes/teacher/index.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

router.use(teacherDashboard);
router.use(teacherHomework);
router.use(teacherSubjectManagement);
router.use(teacherScheduleRoutes);
router.use(teacherSchoolAnnouncementRoutes);
generateNotificationRoutes(router, END_USER_ENUM.TEACHER);

router.use(teacherSchoolAnnouncementRoutes);
export default router;
