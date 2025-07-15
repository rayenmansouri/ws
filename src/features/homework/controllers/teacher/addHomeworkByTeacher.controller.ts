import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { AddHomeworkTranslationKeysEnum } from "../../constants/shared/addHomework.constants";
import { addHomeworkService } from "../../services/shared/addHomework.service";
import { TAddHomeworkByTeacherRouteConfig } from "../../types/teacher/addHomeworkByTeacher.types";

export const addHomeworkByTeacherController = async (
  routeContext: RouteContext<TAddHomeworkByTeacherRouteConfig, true>,
) => {
  const addedHomework = await addHomeworkService(
    routeContext.connection,
    routeContext.body,
    routeContext.session,
    routeContext.tenantId,
    routeContext.files?.homeworks,
    routeContext.user._id,
  );

  return new SuccessResponse(
    AddHomeworkTranslationKeysEnum.ADD_HOMEWORK_BY_ADMIN_RESPONSE,
    addedHomework,
  );
};
