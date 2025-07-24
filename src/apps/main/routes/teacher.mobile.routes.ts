import { Router } from "express";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { generateNotificationMobileRoutes } from "./../../../features/notification/routes/index.mobile.routes";

const teacherMobileRoutes = Router();

teacherMobileRoutes.use(generateNotificationMobileRoutes(END_USER_ENUM.TEACHER));
export { teacherMobileRoutes };
