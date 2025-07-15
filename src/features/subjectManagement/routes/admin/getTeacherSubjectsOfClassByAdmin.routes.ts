import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { RouteConfig } from "../../../../core/Routes/createRoutes";
import { getTeacherSubjectsOfClassByAdminController } from "../../controllers/admin/getTeacherSubjectsOfClassByAdmin.controller";
import { getSubjectsOfClassByAdminTranslation } from "../../translations/admin/getTeacherSubjectsOfClassByAdmin.translation";
import { TGetTeacherSubjectsOfClassByAdminRouteConfig } from "../../types/admin/getTeacherSubjectsOfClassByAdmin.types";
import { getSubjectsOfClassByAdminValidation } from "../../validations/admin/getSubjectsOfClassByAdmin.validation";

export const getSubjectsOfClassByAdminConfig: RouteConfig<TGetTeacherSubjectsOfClassByAdminRouteConfig> =
  {
    path: "/teacher/:teacherNewId/class/:classNewId/subjects",
    method: "get",
    endUser: END_USER_ENUM.ADMIN,
    authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
    paramSchema: getSubjectsOfClassByAdminValidation.params,
    querySchema: getSubjectsOfClassByAdminValidation.query,
    controller: getTeacherSubjectsOfClassByAdminController,
    translations: [getSubjectsOfClassByAdminTranslation],
  };
