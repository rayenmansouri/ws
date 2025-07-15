import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { RouteConfig } from "../../../../../core/Routes/createRoutes";
import { addHomeworkByTeacherController } from "../../../controllers/teacher/addHomeworkByTeacher.controller";
import { addHomeworkTranslation } from "../../../translations/shared/addHomework.translations";
import { sharedHomeworkTranslation } from "../../../translations/shared/shared.translation";
import { TAddHomeworkByTeacherRouteConfig } from "../../../types/teacher/addHomeworkByTeacher.types";
import { addHomeworkValidation } from "../../../validations/shared/addHomework.validation";

export const addHomeworkByTeacherMobileRouteConfig: RouteConfig<TAddHomeworkByTeacherRouteConfig> =
  {
    bodySchema: addHomeworkValidation.body,
    path: "/homework",
    method: "post",
    controller: addHomeworkByTeacherController,
    withTransaction: true,
    upload: { fields: [{ name: "homeworks" }] },
    endUser: END_USER_ENUM.TEACHER,
    translations: [sharedHomeworkTranslation, addHomeworkTranslation],
  };
