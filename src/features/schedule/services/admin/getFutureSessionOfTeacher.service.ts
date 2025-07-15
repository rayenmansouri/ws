import { Connection } from "mongoose";
import { getCurrentTimeOfSchool } from "./../../../../core/getCurrentTimeOfSchool";
import { MONTH_TO_MILLISECOND } from "./../../../../helpers/constants";
import { TGetFutureSessionOfTeacherValidation } from "./../../validations/admin/getFutureSessionOfTeacher.validation";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "./../../../../database/repositories/crud.repo";
import { TGetFutureSessionOfTeacherResponse } from "../../types/admin/getFutureSessionOfTeacher.types";
import { SharedScheduleManagementTranslationKeysEnum } from "../../constants/shared/sharedScheduleManagement.constants";
import { GetFutureSessionOfTeacherTranslationKeysEnum } from "../../constants/admin/getFutureSessionOfTeacher.constants";
import { FilterQuery } from "mongoose";
import {
  ISession,
  SESSION_STATUS_ENUM,
} from "../../../../database/schema/pedagogy/session/session.schema";

export const getFutureSessionOfTeacherService = async (
  connection: Connection,
  teacherNewId: string,
  payload: TGetFutureSessionOfTeacherValidation["query"],
  tenantId: string,
): Promise<TGetFutureSessionOfTeacherResponse> => {
  const teacherDoc = await crudRepo(connection, "teacher").findOne({
    newId: teacherNewId,
    isArchived: false,
  });
  if (!teacherDoc)
    throw new NotFoundError(SharedScheduleManagementTranslationKeysEnum.TEACHER_NOT_FOUND);

  const entityDoc = await crudRepo(connection, payload.type).findOne({ newId: payload.newId });
  if (!entityDoc) {
    const errorMessageKey = getErrorMessageKeysForTopicType(payload.type);
    throw new NotFoundError(errorMessageKey);
  }

  const LIST_DURATION_IN_MONTH = 2;
  const currentDate = getCurrentTimeOfSchool(tenantId);
  const lastDate = new Date(currentDate.getTime() + LIST_DURATION_IN_MONTH * MONTH_TO_MILLISECOND);

  const filterQuery: FilterQuery<ISession> = {
    [payload.type]: entityDoc._id,
    startTime: { $gte: currentDate, $lte: lastDate },
    status: SESSION_STATUS_ENUM.WAITING,
  };

  if (payload.type !== "group") {
    const classDoc = await crudRepo(connection, "class").findOne({ newId: payload.classNewId });
    if (!classDoc)
      throw new NotFoundError(SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND);
    filterQuery.class = classDoc._id.toString();
  }

  const futureSessionList = await crudRepo(connection, "session").findMany(filterQuery, {
    select: { startTime: "0", newId: "0", classGroup: "0" },
    sort: { startTime: 1 },
    populate: ["classGroup"],
  });

  return futureSessionList;
};
export const getErrorMessageKeysForTopicType = (
  type: TGetFutureSessionOfTeacherValidation["query"]["type"],
) => {
  switch (type) {
    case "subjectType":
      return GetFutureSessionOfTeacherTranslationKeysEnum.SUBJECT_TYPE_NOT_FOUND;
    case "subSubjectType":
      return GetFutureSessionOfTeacherTranslationKeysEnum.SUB_SUBJECT_TYPE_NOT_FOUND;
    case "group":
      return "notFound.group";
  }
};
