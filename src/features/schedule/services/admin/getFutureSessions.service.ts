import { Connection, FilterQuery, ObjectId } from "mongoose";
import { SharedScheduleManagementTranslationKeysEnum } from "../../constants/shared/sharedScheduleManagement.constants";
import { TGetFutureSessionsResponse } from "../../types/admin/getFutureSessions.types";
import { getCurrentTimeOfSchool } from "./../../../../core/getCurrentTimeOfSchool";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "./../../../../database/repositories/crud.repo";
import {
  ISession,
  SESSION_STATUS_ENUM,
} from "./../../../../database/schema/pedagogy/session/session.schema";
import { MONTH_TO_MILLISECOND } from "./../../../../helpers/constants";
import { TGetFutureSessionsValidation } from "./../../validations/admin/getFutureSessions.validation";
import { getErrorMessageKeysForTopicType } from "./getFutureSessionOfTeacher.service";
import { populateInterface } from "../../../../database/types";
import { IClass } from "../../../../database/schema/pedagogy/class/class.schema";
import { IClassType } from "../../../../database/schema/pedagogy/class/classType.schema";
import { isIdsEqual } from "../../../../helpers/functionsUtils";
import { omit } from "lodash";
import { stringToObjectId } from "../../../../helpers/stringToObjectId";

export const getFutureSessionsService = async (
  connection: Connection,
  payload: TGetFutureSessionsValidation["query"],
  tenantId: string,
): Promise<TGetFutureSessionsResponse> => {
  const entityDoc = await crudRepo(connection, payload.type).findOne({ newId: payload.newId });
  if (!entityDoc) {
    const errorMessageKey = getErrorMessageKeysForTopicType(payload.type);
    throw new NotFoundError(errorMessageKey);
  }

  const LIST_DURATION_IN_MONTH = 2;
  const currentDate = getCurrentTimeOfSchool(tenantId);
  const lastDate = new Date(currentDate.getTime() + LIST_DURATION_IN_MONTH * MONTH_TO_MILLISECOND);

  let filterQuery: FilterQuery<ISession> = {
    [payload.type]: entityDoc._id,
    startTime: { $gte: currentDate, $lte: lastDate },
    status: SESSION_STATUS_ENUM.WAITING,
  };

  if (payload.type !== "group") {
    const classDoc = (await crudRepo(connection, "class").findOne(
      { newId: payload.classNewId },
      { populate: ["classType"] },
    )) as unknown as populateInterface<IClass, { classType: IClassType }>;
    if (!classDoc)
      throw new NotFoundError(SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND);

    if (payload.type === "subjectType") {
      filterQuery = filterBySubSubjects(
        stringToObjectId(String(entityDoc._id)),
        payload,
        classDoc,
        filterQuery,
      );
    }

    filterQuery.class = classDoc._id.toString();
  }

  const futureSessionList = await crudRepo(connection, "session").findMany(filterQuery, {
    select: { startTime: "0", newId: "0", classGroup: "0" },
    sort: { startTime: 1 },
    populate: ["classGroup"],
  });

  return futureSessionList;
};

const filterBySubSubjects = (
  subjectTypeId: ObjectId,
  payload: TGetFutureSessionsValidation["query"],
  classDoc: populateInterface<IClass, { classType: IClassType }>,
  filterQuery: FilterQuery<ISession>,
): FilterQuery<ISession> => {
  const subjectType = classDoc.classType.subjects.find(subject =>
    isIdsEqual(subject.subjectType, subjectTypeId),
  );

  const hasSubSubjects = subjectType ? subjectType?.subSubjects.length > 0 : false;
  if (hasSubSubjects) {
    const subSubjectTypesIds = subjectType!.subSubjects.map(
      subSubject => subSubject.subSubjectType,
    );

    filterQuery = {
      ...omit(filterQuery, payload.type),
      subSubjectType: { $in: subSubjectTypesIds },
    };
  }

  return filterQuery;
};
