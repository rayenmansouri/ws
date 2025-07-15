import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { deleteNotificationsByTopic } from "../../../features/notification/shared/deleteNotificationByTopic";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { SessionRepo } from "../domain/Session.repo";
import { END_USER_ENUM, END_USER_WITHOUT_MASTER_ENUM } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SESSION_STATUS_ENUM } from "./../../../database/schema/pedagogy/session/session.schema";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "./../../../features/notification/constants/constants";
import {
  sendNotificationsToUsers,
  sendNotificationToParentsOfStudent,
  sendNotificationToTeachersOfSession,
} from "./../../../features/notification/services/helpers.service";
import { ID } from "./../../../types/BaseEntity";
import { IBaseNotification } from "./../../notifications/notification.entity";
import { SessionService } from "./../domain/Session.service";

export type CancelSessionRequestDTO = {
  sessionNewId: string;
  tenantId: ID;
  reasonForCanceling: string;
  userId: ID;
};

@injectable()
export class CancelSessionUseCase {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("Session") private readonly clientSession: ClientSession,
    @inject("SessionRepo")
    private readonly sessionRepo: SessionRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("HomeworkRepo") private readonly homeworkRepo: HomeworkRepo,
    @inject("FileManager") private readonly fileManager: FileManager,
  ) {}

  async execute(dto: CancelSessionRequestDTO): Promise<void> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
      {
        populate: [
          "class",
          "classGroup",
          "group",
          "teacher",
          "subjectType",
          "subSubjectType",
          "homeworkGiven",
          "homeworkToDo",
        ],
      },
    );

    if (session.isTeacherPaid) throw new BadRequestError("session.sessionIsAlreadyPaid");

    const topicName = SessionService.extractTopicName(
      session.subjectType,
      session.subSubjectType,
      session.group,
    );

    const cancelSessionPromise = this.sessionRepo.updateOneById(session._id, {
      status: SESSION_STATUS_ENUM.CANCELED,
      reasonForCanceling: dto.reasonForCanceling,
      canceledBy: dto.userId,
      homeworkGiven: [],
      homeworkToDo: [],
    });

    const studentsIds: ID[] = SessionService.extractStudentIdsFromSession(
      session.class,
      session.classGroup,
      session.group,
    );

    const students = await this.studentRepo.findManyByIds(studentsIds);

    const notificationPromises = [];

    notificationPromises.push(
      sendNotificationToTeachersOfSession(
        this.connection,
        session._id,
        {
          topic: NOTIFICATION_TYPES_ENUM.TEACHER_SESSION_CANCELED,
          details: { sessionNewId: session.newId },
        },
        {
          $topicName: topicName,
          $sessionDate: new Date(session.startTime.toString()).toISOString(),
        },
        dto.tenantId,
        this.clientSession,
      ),
    );

    if (session.class && !session.classGroup) {
      for (const student of students) {
        const notificationData: IBaseNotification = {
          userId: "",
          userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
          message: "",
          status: NOTIFICATION_STATUS_ENUM.UNSEEN,
          date: getCurrentTimeOfSchool(dto.tenantId),
          dynamicFieldValues: {
            $teacherName: session.teacher?.fullName || "",
            $sessionDate: new Date(session.startTime.toString()).toISOString(),
          },
          topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
          details: {
            sessionNewId: session.newId,
            studentNewId: student.newId,
          },
        };

        notificationPromises.push(
          sendNotificationsToUsers(
            this.connection,
            [student._id.toString()],
            notificationData,
            {
              topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
              userType: END_USER_ENUM.STUDENT,
            },
            this.clientSession,
          ),
        );

        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            this.connection,
            student._id.toString(),
            {
              topic: NOTIFICATION_TYPES_ENUM.PARENT_SESSION_CANCELED,
              details: { sessionNewId: session.newId, studentNewId: student.newId },
            },
            {
              $topicName: topicName,
              $studentName: student.fullName,
              $sessionDate: new Date(session.startTime.toString()).toISOString(),
            },
            dto.tenantId,
            this.clientSession,
          ),
        );
      }
    }

    if (session.classGroup) {
      for (const student of students) {
        const notificationData: IBaseNotification = {
          userId: "",
          userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
          message: "",
          status: NOTIFICATION_STATUS_ENUM.UNSEEN,
          date: getCurrentTimeOfSchool(dto.tenantId),
          dynamicFieldValues: {
            $teacherName: session.teacher!.fullName,
            $sessionDate: new Date(session.startTime.toString()).toISOString(),
          },
          topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
          details: {
            sessionNewId: session.newId,
            studentNewId: student.newId,
          },
        };

        notificationPromises.push(
          sendNotificationsToUsers(
            this.connection,
            [student._id],
            notificationData,
            {
              topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
              userType: END_USER_ENUM.STUDENT,
            },
            this.clientSession,
          ),
        );

        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            this.connection,
            student._id,
            {
              topic: NOTIFICATION_TYPES_ENUM.PARENT_SESSION_CANCELED,
              details: { studentNewId: student.newId, sessionNewId: session.newId },
            },
            {
              $topicName: topicName,
              $studentName: student.fullName,
              $sessionDate: new Date(session.startTime.toString()).toISOString(),
            },
            dto.tenantId,
            this.clientSession,
          ),
        );
      }
    }

    if (session.group) {
      for (const student of students) {
        const notificationData: IBaseNotification = {
          userId: "",
          userType: END_USER_WITHOUT_MASTER_ENUM.STUDENT,
          message: "",
          status: NOTIFICATION_STATUS_ENUM.UNSEEN,
          date: getCurrentTimeOfSchool(dto.tenantId),
          dynamicFieldValues: {
            $teacherName: session.teacher!.fullName,
            $sessionDate: new Date(session.startTime.toString()).toISOString(),
          },
          topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
          details: {
            sessionNewId: session.newId,
            studentNewId: student.newId,
          },
        };

        notificationPromises.push(
          sendNotificationsToUsers(
            this.connection,
            [student._id.toString()],
            notificationData,
            {
              topic: NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED,
              userType: END_USER_ENUM.STUDENT,
            },
            this.clientSession,
          ),
        );
        notificationPromises.push(
          sendNotificationToParentsOfStudent(
            this.connection,
            student._id,
            {
              topic: NOTIFICATION_TYPES_ENUM.PARENT_SESSION_CANCELED,
              details: { sessionNewId: session.newId, studentNewId: student.newId },
            },
            {
              $topicName: topicName,
              $studentName: student.fullName,
              $sessionDate: new Date(session.startTime.toString()).toISOString(),
            },
            dto.tenantId,
            this.clientSession,
          ),
        );
      }
    }

    const homeworks = session.homeworkGiven.concat(session.homeworkToDo);

    const homeworksPublicIds = homeworks.flatMap(homework =>
      homework.files.map(file => file.public_id),
    );

    const homeworkToBeDeletedIds = homeworks.map(homework => homework._id);

    const homeworkToBeDeletedNewIds = homeworks.map(homework => homework.newId);

    const deleteHomeworksPromise = this.homeworkRepo.deleteManyByIds(homeworkToBeDeletedIds);

    const deleteParentHomeworkNotificationsPromise = deleteNotificationsByTopic(
      this.connection,
      "parent_homework",
      { homeworkNewId: homeworkToBeDeletedNewIds },
      this.clientSession,
    );

    const deleteStudentHomeworkNotificationsPromise = deleteNotificationsByTopic(
      this.connection,
      "student_homework",
      { homeworkNewId: homeworkToBeDeletedNewIds },
      this.clientSession,
    );

    await Promise.all([
      cancelSessionPromise,
      ...notificationPromises,
      this.fileManager.deleteFiles(homeworksPublicIds),
      deleteHomeworksPromise,
      deleteParentHomeworkNotificationsPromise,
      deleteStudentHomeworkNotificationsPromise,
    ]);
  }
}
