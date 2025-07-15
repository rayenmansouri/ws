import { ClientSession, Connection } from "mongoose";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "../../../../database/repositories/crud.repo";
import { deleteManyFile } from "../../../../helpers/upload";
import { sharedHomeworkTranslationKeysEnum } from "../../constants/shared/sharedHomework.constants";
import { TDeleteHomeworkByAdminResponse } from "../../types/admin/deleteHomeworkByAdmin.types";
import { deleteNotificationsByTopic } from "../../../notification/shared/deleteNotificationByTopic";
import { NOTIFICATION_TYPES_ENUM } from "../../../notification/constants/constants";

export const deleteHomeworkByAdminService = async (
  conn: Connection,
  homeworkNewId: string,
  session: ClientSession,
): Promise<TDeleteHomeworkByAdminResponse> => {
  const homework = await crudRepo(conn, "homework").findOne({ newId: homeworkNewId }, { session });

  if (!homework) throw new NotFoundError(sharedHomeworkTranslationKeysEnum.HOMEWORK_NOT_FOUND);

  const publicId = homework.files.map(file => file.public_id);

  await deleteManyFile(publicId);

  const removeHomeWorkFromSession = crudRepo(conn, "session").updateMany(
    { $or: [{ homeworkGiven: homework._id }, { homeworkToDo: homework._id }] },
    { $pull: { homeworkGiven: homework._id, homeworkToDo: homework._id } },
    session,
  );

  const deletedHomeworkPromise = crudRepo(conn, "homework").hardDeleteOne(
    { _id: homework._id },
    session,
  );

  const deleteParentHomeworkNotification = deleteNotificationsByTopic(
    conn,
    NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
    { homeworkNewId: homework.newId },
  );
  const deleteStudentHomeworkNotification = deleteNotificationsByTopic(
    conn,
    NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
    { homeworkNewId: homework.newId },
  );

  await Promise.all([
    removeHomeWorkFromSession,
    deletedHomeworkPromise,
    deleteParentHomeworkNotification,
    deleteStudentHomeworkNotification,
  ]);
};
