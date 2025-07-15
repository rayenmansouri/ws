import express from "express";

import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { generateNotificationMobileRoutes } from "./../../../features/notification/routes/index.mobile.routes";

const router = express.Router();

router.use(generateNotificationMobileRoutes(END_USER_ENUM.PARENT));

export default router;
