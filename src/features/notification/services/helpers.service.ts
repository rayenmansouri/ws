import { IAttendance } from "../../../feature/sessionManagement/domain/session.entity";
import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import { ClientSession, Connection } from "mongoose";
import {
  INotification,
  notificationTopicWithDetails,
} from "../../../database/schema/notification/notification.schema";
import {
  FCM_TOKEN_LIMIT,
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../constants/constants";
import { INotificationBase, INotificationPayload } from "../types/interfaces";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { crudRepo } from "./../../../database/repositories/crud.repo";
import { IBaseNotification } from "./../../../database/schema/notification/notification.schema";
import { INotificationSettings } from "./../../../database/schema/notification/notificationSettings.schema";
import { IParent } from "./../../../database/schema/users/parent.schema";
import { IStudent } from "./../../../database/schema/users/student.schema";
import { populateInterface } from "./../../../database/types";
import { FCM } from "./../../../firebase";
import {
  categorizeStudentsByAttendance,
  removeDuplicateStringInArray,
} from "./../../../helpers/functions";
import { END_USER_WITHOUT_MASTER_ENUM } from "./../../../constants/globalEnums";
import { RandomUtils } from "../../../helpers/RandomUtils";

export const getNotificationSettingsDocs = async (
  connection: Connection,
  usersIds: string[],
): Promise<INotificationSettings[]> => {
  const notificationSettingsDocs = await crudRepo(connection, "notificationSettings").findMany({
    userId: { $in: usersIds },
  });

  return notificationSettingsDocs;
};

export const saveNotification = async (
  connection: Connection,
  notificationData: IBaseNotification,
  session?: ClientSession,
): Promise<INotification> => {
  return await crudRepo(connection, "notification").addOne(notificationData, session);
};
export const saveManyNotifications = async (
  connection: Connection,
  notificationData: (IBaseNotification & { broadcastId: string })[],
  session?: ClientSession,
): Promise<void> => {
  return await crudRepo(connection, "notification").addMany(notificationData, session);
};

export const handleFailedRegistrationToken = async (
  connection: Connection,
  fcmResponse: BatchResponse[],
  tokens: string[],
): Promise<void> => {
  if (fcmResponse.length > 0) {
    const failedIndexes = fcmResponse[0].responses
      .map((res, index) => (res.success ? -1 : index))
      .filter(index => index !== -1);

    if (failedIndexes.length > 0) {
      const failedTokens = failedIndexes.map(index => tokens[index]);
      const filterQuery = {
        "registrationTokens.token": { $in: failedTokens },
      };
      const updateQuery = {
        $pull: {
          registrationTokens: { token: { $in: failedTokens } },
        },
      };
      await crudRepo(connection, "notificationSettings").updateMany(filterQuery, updateQuery);
    }
  }
};
export const sendNotifications = async (
  payload: INotificationPayload,
  data: { [key: string]: string; broadcastId: string },
  notificationTopicWithDetails: notificationTopicWithDetails,
): Promise<BatchResponse[]> => {
  const batchResponses = await sendFCMInBatches(payload, {
    ...data,
    details: JSON.stringify(notificationTopicWithDetails.details),
    topic: notificationTopicWithDetails.topic,
  });
  return batchResponses;
};

const sendFCMInBatches = async (
  payload: INotificationPayload,
  data: Record<string, string>,
): Promise<BatchResponse[]> => {
  const responses: BatchResponse[] = [];

  for (let i = 0; i < payload.tokens.length; i += FCM_TOKEN_LIMIT) {
    const batchTokens = payload.tokens.slice(i, i + FCM_TOKEN_LIMIT);
    const batchResult = await FCM?.messaging().sendEachForMulticast({
      ...payload,
      tokens: batchTokens,
      data,
    });
    responses.push(batchResult!);
  }

  return responses;
};

export const sendNotificationsToUsers = async (
  connection: Connection,
  usersIds: string[],
  notificationData: IBaseNotification,
  data: Record<string, string>,
  session?: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const notificationsSettingsDocs = await getNotificationSettingsDocs(connection, usersIds);

  const tokens: string[] = notificationsSettingsDocs.flatMap(notificationSettings =>
    notificationSettings.registrationTokens.map(registration => registration.token),
  );

  const payload: INotificationPayload = {
    tokens: tokens,
    notification: notificationSettings || undefined,
  };

  const broadcastId = RandomUtils.generateUUID();
  const uniqueUsersIds = removeDuplicateStringInArray(usersIds);
  const notificationsPayload: (IBaseNotification & { broadcastId: string })[] = [];

  for (const userId of uniqueUsersIds) {
    notificationsPayload.push({ ...notificationData, userId, broadcastId });
  }
  await saveManyNotifications(connection, notificationsPayload, session);
  const result = await sendNotifications(payload, { ...data, broadcastId }, notificationData);

  await handleFailedRegistrationToken(connection, result, payload.tokens);
};

export const sendNotificationToStudentsOfClass = async (
  connection: Connection,
  classId: string,
  notificationType: notificationTopicWithDetails,
  dynamicFieldValues: { [key: string]: string },
  schoolId: string,
  session: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const classDoc = await crudRepo(connection, "class").findOne({ _id: classId });
  if (!classDoc) throw new NotFoundError("notification cant be send because class is not found");
  const studentsIds = classDoc.students.map(id => id.toString());
  const notificationData = {
    userId: "",
    userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
    message: notificationSettings?.body || "",
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    dynamicFieldValues,
    ...notificationType,
  };
  await sendNotificationsToUsers(
    connection,
    studentsIds,
    notificationData,
    { topic: notificationType.topic, userType: END_USER_ENUM.STUDENT, ...dynamicFieldValues },
    session,
    notificationSettings,
  );
};
export const sendNotificationToParentsOfStudent = async (
  connection: Connection,
  studentId: string,
  notificationType: notificationTopicWithDetails,
  dynamicFieldValues: { [key: string]: string } = {},
  schoolId: string,
  session?: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const studentsDocs = (await crudRepo(connection, "student").findOne(
    { _id: studentId },
    { populate: ["parents"] },
  )) as unknown as populateInterface<IStudent, { parents: IParent[] }>;
  const parentsIds = studentsDocs.parents.map(parent => parent._id.toString());

  const notificationData: IBaseNotification = {
    userId: "",
    userType: END_USER_WITHOUT_MASTER_ENUM.PARENT,
    message: notificationSettings?.body || "",
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    dynamicFieldValues,
    ...notificationType,
  };

  await sendNotificationsToUsers(
    connection,
    parentsIds,
    notificationData,
    {
      topic: notificationType.topic,
      userType: END_USER_ENUM.PARENT,
      ...dynamicFieldValues,
    },
    session,
    notificationSettings,
  );
};
export const sendNotificationToStudentsOfClassGroup = async (
  connection: Connection,
  groupeId: string,
  notificationType: notificationTopicWithDetails,
  dynamicFieldValues: { [key: string]: string } = {},
  schoolId: string,
  session: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const groupDoc = await crudRepo(connection, "classGroup").findOne({ _id: groupeId });
  if (!groupDoc) throw new NotFoundError("notifications cant be send because group is not found");
  const studentsIdsOfGroup = groupDoc.students.map(id => id.toString());
  const notificationData: IBaseNotification = {
    userId: "",
    userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
    message: notificationSettings?.body || "",
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    dynamicFieldValues,
    ...notificationType,
  };
  await sendNotificationsToUsers(
    connection,
    studentsIdsOfGroup,
    notificationData,
    {
      topic: notificationType.topic,
      userType: END_USER_ENUM.STUDENT,
      ...dynamicFieldValues,
    },
    session,
    notificationSettings,
  );
};
export const sendNotificationToStudentsOfGroup = async (
  connection: Connection,
  studentsIdsOfGroup: string[],
  notificationType: notificationTopicWithDetails,
  dynamicFieldValues: { [key: string]: string } = {},
  schoolId: string,
  session: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const notificationData = {
    userId: "",
    userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
    message: notificationSettings?.body || "",
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    dynamicFieldValues,
    ...notificationType,
  };

  await sendNotificationsToUsers(
    connection,
    studentsIdsOfGroup,
    notificationData,
    {
      topic: notificationType.topic,
      userType: END_USER_ENUM.STUDENT,
      ...dynamicFieldValues,
    },
    session,
    notificationSettings,
  );
};

export const sendNotificationsToParentsBasedOnAttendance = async (
  connection: Connection,
  attendance: IAttendance,
  topicName: string,
  schoolId: string,
  sessionNewId: string,
): Promise<void> => {
  const categorizedStudentsByAttendance = categorizeStudentsByAttendance(attendance);
  const notificationPromises: Promise<void>[] = [];
  for (const status in categorizedStudentsByAttendance) {
    let absentStudentIds: string[] = [];
    let lateStudentIds: string[] = [];
    let expelledStudentIds: string[] = [];

    if (status === NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT)
      absentStudentIds = categorizedStudentsByAttendance["attendance_absent"];
    if (status === NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT)
      lateStudentIds = categorizedStudentsByAttendance["attendance_late"];
    if (status === NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT)
      expelledStudentIds = categorizedStudentsByAttendance["attendance_expelled"];

    if (absentStudentIds.length > 0) {
      const absentStudentsDocs = await crudRepo(connection, "student").findMany({
        _id: { $in: absentStudentIds },
        isArchived: false,
      });

      for (const studentDoc of absentStudentsDocs) {
        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            connection,
            studentDoc._id.toString(),
            {
              topic: NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT,
              details: { studentNewId: studentDoc.newId, sessionNewId: sessionNewId },
            },
            { $studentName: studentDoc.fullName, $topicName: topicName },
            schoolId,
          ),
        );
      }
    }

    if (lateStudentIds.length > 0) {
      const lateStudentsDocs = await crudRepo(connection, "student").findMany({
        _id: { $in: lateStudentIds },
        isArchived: false,
      });

      for (const studentDoc of lateStudentsDocs) {
        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            connection,
            studentDoc._id.toString(),
            {
              topic: NOTIFICATION_TYPES_ENUM.ATTENDANCE_LATE,
              details: { studentNewId: studentDoc.newId, sessionNewId: sessionNewId },
            },
            { $studentName: studentDoc.fullName, $topicName: topicName },
            schoolId,
          ),
        );
      }
    }

    if (expelledStudentIds.length > 0) {
      const expelledStudentsDocs = await crudRepo(connection, "student").findMany({
        _id: { $in: expelledStudentIds },
        isArchived: false,
      });
      for (const studentDoc of expelledStudentsDocs) {
        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            connection,
            studentDoc._id.toString(),
            {
              topic: NOTIFICATION_TYPES_ENUM.ATTENDANCE_EXPELLED,
              details: { studentNewId: studentDoc.newId, sessionNewId: sessionNewId },
            },
            { $studentName: studentDoc.fullName, $topicName: topicName },
            schoolId,
          ),
        );
      }
    }
  }
  await Promise.all(notificationPromises);
};
export const sendNotificationToTeachersOfSession = async (
  connection: Connection,
  sessionId: string,
  notificationType: notificationTopicWithDetails,
  dynamicFieldValues: { [key: string]: string },
  schoolId: string,
  session: ClientSession,
  notificationSettings?: INotificationBase,
): Promise<void> => {
  const sessionDoc = await crudRepo(connection, "session").findOne({ _id: sessionId });
  if (!sessionDoc)
    throw new NotFoundError("notification cant be send because session is not found");
  const teachersIds = [sessionDoc.teacher.toString()];
  const notificationData = {
    userId: "",
    userType: END_USER_WITHOUT_MASTER_ENUM.TEACHER,
    message: notificationSettings?.body || "",
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    dynamicFieldValues,
    ...notificationType,
  };
  await sendNotificationsToUsers(
    connection,
    teachersIds,
    notificationData,
    { topic: notificationType.topic, userType: END_USER_ENUM.TEACHER, ...dynamicFieldValues },
    session,
    notificationSettings,
  );
};
