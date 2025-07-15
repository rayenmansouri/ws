import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { GetSubjectsOfClassByAdminTranslationKeysEnum } from "../../constants/admin/getTeacherSubjectsOfClassByAdmin.constants";
import { getTeacherSubjectsOfClassService } from "../../services/teacher/getSubjectOfTeacherClass.service";
import { TGetTeacherSubjectsOfClassByAdminRouteConfig } from "../../types/admin/getTeacherSubjectsOfClassByAdmin.types";

export const getTeacherSubjectsOfClassByAdminController = async (
  routeContext: RouteContext<TGetTeacherSubjectsOfClassByAdminRouteConfig>,
) => {
  const result = await getTeacherSubjectsOfClassService(
    routeContext.connection,
    routeContext.params.teacherNewId,
    routeContext.params.classNewId,
    routeContext.query.isGroup,
  );

  return new SuccessResponse(
    GetSubjectsOfClassByAdminTranslationKeysEnum.GET_SUBJECTS_OF_CLASS_BY_ADMIN_RESPONSE,
    result,
  );
};
