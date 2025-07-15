import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { createRoutes } from "../../../core/Routes/createRoute";
import { generateNotificationMobileRoutes } from "../../../features/notification/routes/index.mobile.routes";

const studentMobileRoutes = express.Router();

studentMobileRoutes.use(generateNotificationMobileRoutes(END_USER_ENUM.STUDENT));

createRoutes(studentMobileRoutes);

export { studentMobileRoutes };
