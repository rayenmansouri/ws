import { Router } from "express";
import { createRoutes } from "../../../../core/Routes/createRoute";
import { updateHomeworkConfig } from "../shared/updateHomework.routes";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { addHomeworkByAdminRouteConfig } from "./addHomeworkByAdmin.routes";
import { deleteHomeworkByAdminRouteConfig } from "./deleteHomeworkByAdmin.routes";

const router = Router();

createRoutes(
  router,
  updateHomeworkConfig(END_USER_ENUM.ADMIN),
  addHomeworkByAdminRouteConfig,
  deleteHomeworkByAdminRouteConfig,
);

export default router;
