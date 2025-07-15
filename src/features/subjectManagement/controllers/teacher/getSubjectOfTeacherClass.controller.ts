import { RouteContext } from "../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { getTeacherSubjectsOfClassService } from "../../services/teacher/getSubjectOfTeacherClass.service";
import { TGetSubjectsOfTeacherClassRouteConfig } from "../../types/teacher/getSubjectsOfTeacherClass.types";

export const getSubjectsOfTeacherClassController = async (
  req: RouteContext<TGetSubjectsOfTeacherClassRouteConfig>,
) => {
  const result = await getTeacherSubjectsOfClassService(
    req.connection,
    req.user.newId,
    req.params.classNewId,
    req.query.isGroup,
  );

  return new SuccessResponse("Topics of teacher retrieved successfully!", result);
};
