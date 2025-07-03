import express from "express";

import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { generateNotificationMobileRoutes } from "./../../../features/notification/routes/index.mobile.routes";
import getInvoicesOfChildRoutes from "./../../../features/payment/routes/parent/index.mobile.routes";
import { parentSchoolAnnouncementMobileRoutes } from "../../../features/schoolAnnouncement/routes/mobile/parent/index.routes";

const router = express.Router();

router.use(
  getInvoicesOfChildRoutes,
  generateNotificationMobileRoutes(END_USER_ENUM.PARENT),
  parentSchoolAnnouncementMobileRoutes,
);

export default router;
