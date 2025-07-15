import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { RouteConfig } from "../../../../core/Routes/createRoutes";
import { getSubjectsOfTeacherClassController } from "../../controllers/teacher/getSubjectOfTeacherClass.controller";
import { GetSubjectOfTeacherClassTranslation } from "../../translations/teacher/getSubjectOfTeacherClass.translation";
import { TGetSubjectsOfTeacherClassRouteConfig } from "../../types/teacher/getSubjectsOfTeacherClass.types";
import { getSubjectOfTeacherClassValidation } from "../../validations/teacher/getSubjectsOfTeacherClass.validation";

export const getSubjectsOfTeacherClassConfig: RouteConfig<TGetSubjectsOfTeacherClassRouteConfig> = {
  paramSchema: getSubjectOfTeacherClassValidation.params,
  querySchema: getSubjectOfTeacherClassValidation.query,
  method: "get",
  path: "/class/:classNewId/subjects",
  endUser: END_USER_ENUM.TEACHER,
  controller: getSubjectsOfTeacherClassController,
  translations: [GetSubjectOfTeacherClassTranslation],
};
