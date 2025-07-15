import { Router } from "express";
import { createRoutes } from "../../../../core/Routes/createRoute";
import { addHomeworkByTeacherConfig } from "./addHomeworkByTeacher.routes";
import { updateHomeworkConfig } from "../shared/updateHomework.routes";
import { END_USER_ENUM } from "../../../../constants/globalEnums";

const router = Router();

createRoutes(router, addHomeworkByTeacherConfig, updateHomeworkConfig(END_USER_ENUM.TEACHER));

export default router;
