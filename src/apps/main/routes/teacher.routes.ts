import express from "express";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { generateNotificationRoutes } from "./../../../features/notification/routes/index.routes";

const router = express.Router();

generateNotificationRoutes(router, END_USER_ENUM.TEACHER);

export default router;
