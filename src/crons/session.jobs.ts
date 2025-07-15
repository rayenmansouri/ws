import { ISubSubjectType } from "./../database/schema/pedagogy/subject/subSubjectType.schema";
import { ISubjectType } from "./../database/schema/pedagogy/subject/subjectType.schema";
import { populateInterface } from "./../database/types";
import { InternalError } from "../core/ApplicationErrors";
import { sendNotificationsToParentsBasedOnAttendance } from "./../features/notification/services/helpers.service";
import mongoose, { Connection, ClientSession } from "mongoose";
import schedule from "node-schedule";
import { crudRepo } from "../database/repositories/crud.repo";
import { getCurrentTimeOfSchool } from "../core/getCurrentTimeOfSchool";
import { convertDateToServerTime } from "../helpers/ConvertDate";
import { MINUTES_TO_MILLISECOND } from "../helpers/constants";
import { schoolDocStore } from "../core/subdomainStore";
import { ISession } from "../database/schema/pedagogy/session/session.schema";
import { HOMEWORK_STATUS_ENUM } from "../features/homework/constants/shared/addHomework.constants";
import { Group } from "../feature/groupManagement/domains/group.entity";

const forceCloseSession = async (
  connection: Connection,
  sessionId: string,
  schoolId: string,
  session: ClientSession,
) => {
  const sessionDoc = (await crudRepo(connection, "session").findOne(
    { _id: sessionId, status: "inProgress" },
    { populate: ["subjectType", "subSubjectType", "group"] },
  )) as unknown as populateInterface<
    ISession,
    //@ts-ignore
    {
      subjectType: ISubjectType;
      subSubjectType: ISubSubjectType;
      group: Group;
    }
  >;
  if (!sessionDoc) return;

  const topicName =
    sessionDoc.subjectType?.name ||
    sessionDoc.subSubjectType?.name ||
    sessionDoc.group?.groupType.name;

  if (!topicName) throw new InternalError("session does not have name");
  const closedSession = await crudRepo(connection, "session").updateOne(
    { _id: sessionId },
    {
      status: "completed",
      closeTime: getCurrentTimeOfSchool(schoolId),
      isClosedForced: true,
    },
    session,
  );

  await sendNotificationsToParentsBasedOnAttendance(
    connection,
    closedSession.attendence,
    topicName,
    schoolId,
    sessionDoc.newId,
  );
};
export const forceCloseSessionsJob = (
  connection: Connection,
  sessionId: string,
  closeAt: Date,
  schoolId: string,
) => {
  schedule.scheduleJob(closeAt, async () => {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await forceCloseSession(connection, sessionId, schoolId, session);
    });
  });
};

export const handlePastSessions = async (connection: Connection, schoolId: string) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    await crudRepo(connection, "session").updateMany(
      {
        status: "waiting",
        endTime: { $lte: getCurrentTimeOfSchool(schoolId) },
        isDraft: { $ne: true },
      },
      {
        status: "canceled",
        reasonForCanceling: "Teacher is absent",
      },
    );

    const sessionsInProgress = await crudRepo(connection, "session").findMany({
      status: "inProgress",
      endTime: {
        $lte: new Date(
          getCurrentTimeOfSchool(schoolId).getTime() -
            schoolDocStore[schoolId].forceCloseSessionDelayInMin * MINUTES_TO_MILLISECOND,
        ),
      },
    });

    await Promise.all(
      sessionsInProgress.map(session =>
        crudRepo(connection, "session").updateOne(
          { _id: session._id },
          {
            status: "completed",
            isClosedForced: true,
            closeTime: getCurrentTimeOfSchool(schoolId),
          },
        ),
      ),
    );

    const homeworksToUpdate = sessionsInProgress.flatMap(session => session.homeworkToDo);

    await Promise.all(
      homeworksToUpdate.map(homework =>
        crudRepo(connection, "homework").updateOne({ _id: homework }, { status: "done" }),
      ),
    );
  });
};

export const handleInProgressSessions = async (connection: Connection, schoolId: string) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    const inProgressSessions = await crudRepo(connection, "session").findMany({
      status: "inProgress",
      endTime: {
        $gte: new Date(
          getCurrentTimeOfSchool(schoolId).getTime() -
            schoolDocStore[schoolId].forceCloseSessionDelayInMin * MINUTES_TO_MILLISECOND,
        ),
      },
    });

    inProgressSessions.forEach(session => {
      const closeAt = new Date(
        convertDateToServerTime(session.endTime, schoolId).getTime() +
          schoolDocStore[schoolId].forceCloseSessionDelayInMin * MINUTES_TO_MILLISECOND,
      );
      forceCloseSessionsJob(connection, session._id.toString(), closeAt, schoolId);
    });
  });
};

export const markExpiredHomeworkAsDone = async (connection: Connection, schoolId: string) => {
  const currentDate = getCurrentTimeOfSchool(schoolId);

  await crudRepo(connection, "homework").updateMany(
    { status: HOMEWORK_STATUS_ENUM.TODO, dueDate: { $lte: currentDate } },
    { status: HOMEWORK_STATUS_ENUM.DONE },
  );
};
