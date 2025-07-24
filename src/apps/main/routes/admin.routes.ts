import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { createRoutes } from "../../../core/Routes/createRoute";
import { sendNotificationToUsersRouteConfig } from "../../../features/notification/routes/sendNotificationToUsers.routes";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

createRoutes(router, sendNotificationToUsersRouteConfig);
generateNotificationRoutes(router, END_USER_ENUM.ADMIN);

export default router;
