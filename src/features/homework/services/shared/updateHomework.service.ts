import { ClientSession, Connection, ObjectId } from "mongoose";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "../../../../core/getCurrentTimeOfSchool";
import { handelEditFile } from "../../../../core/handelEditFile";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "../../../../database/repositories/crud.repo";
import {
  ISession,
  SESSION_STATUS_ENUM,
} from "../../../../database/schema/pedagogy/session/session.schema";
import { isIdsEqual } from "../../../../helpers/functionsUtils";
import { File } from "../../../../types/app-request";
import { sharedHomeworkTranslationKeysEnum } from "../../constants/shared/sharedHomework.constants";
import { UpdateHomeworkTranslationKeysEnum } from "../../constants/shared/updateHomework.constants";
import { TUpdateHomeworkResponse } from "../../types/shared/updateHomework.types";
import { TUpdateHomeworkValidation } from "../../validations/shared/updateHomework.validation";
import { ID } from "../../../../types/BaseEntity";

export const updateHomeworkService = async (
  connection: Connection,
  homeworkNewId: string,
  endUser: TEndAdministrationUserEnums,
  userId: ObjectId,
  data: TUpdateHomeworkValidation["body"],
  tenantId: string,
  session: ClientSession,
  newHomeworkFiles?: File[],
): Promise<TUpdateHomeworkResponse> => {
  const deletedHomeworks = data.deletedHomeworks;

  const homeworkDoc = await crudRepo(connection, "homework").findOne({
    newId: homeworkNewId,
  });
  if (!homeworkDoc) throw new NotFoundError(sharedHomeworkTranslationKeysEnum.HOMEWORK_NOT_FOUND);
  const updateHomeworkFiles = await handelEditFile(
    tenantId,
    homeworkDoc.files,
    "homework",
    homeworkDoc._id.toString() as ID,
    deletedHomeworks,
    newHomeworkFiles,
  );

  if (endUser === END_USER_ENUM.TEACHER && !isIdsEqual(homeworkDoc.teacher, userId))
    throw new BadRequestError(UpdateHomeworkTranslationKeysEnum.HOMEWORK_NOT_BELONG_TO_TEACHER);

  await crudRepo(connection, "homework").updateOne(
    { _id: homeworkDoc._id },
    {
      description: data.description,
      name: data.name,
      files: updateHomeworkFiles,
      dueDate: data.dueDate,
    },
    session,
  );

  return true;
};
