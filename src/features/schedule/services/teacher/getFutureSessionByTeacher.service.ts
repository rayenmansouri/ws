import { Connection, FilterQuery, ObjectId } from "mongoose";
import { SharedScheduleManagementTranslationKeysEnum } from "../../constants/shared/sharedScheduleManagement.constants";
import { TGetFutureSessionByTeacherResponse } from "../../types/teacher/getFutureSessionByTeacher.types";
import { getCurrentTimeOfSchool } from "./../../../../core/getCurrentTimeOfSchool";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "./../../../../database/repositories/crud.repo";
import {
  ISession,
  SESSION_STATUS_ENUM,
} from "./../../../../database/schema/pedagogy/session/session.schema";
import { MONTH_TO_MILLISECOND } from "./../../../../helpers/constants";
import { TGetFutureSessionByTeacherValidation } from "./../../validations/teacher/getFutureSessionByTeacher.validation";
import { getErrorMessageKeysForTopicType } from "../admin/getFutureSessionOfTeacher.service";
import { populateInterface } from "../../../../database/types";
import { IClassGroup } from "../../../../database/schema/pedagogy/class/classGroup.schema";

export const getFutureSessionByTeacherService = async (
  connection: Connection,
  payload: TGetFutureSessionByTeacherValidation["query"],
  teacherId: ObjectId,
  tenantId: string,
): Promise<TGetFutureSessionByTeacherResponse> => {
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
    teacher: teacherId,
    status: SESSION_STATUS_ENUM.WAITING,
  };

  if (payload.type !== "group") {
    const classDoc = await crudRepo(connection, "class").findOne({ newId: payload.classNewId });
    if (!classDoc)
      throw new NotFoundError(SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND);
    filterQuery.class = String(classDoc._id);
  }

  const futureSessionList = (await crudRepo(connection, "session").findMany(filterQuery, {
    select: { startTime: "0", newId: "0", classGroup: "0" },
    sort: { startTime: 1 },
    populate: ["classGroup"],
  })) as populateInterface<
    ISession,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    { classGroup: IClassGroup | null }
  >[];

  return futureSessionList;
};
