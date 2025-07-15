import { ClientSession, Connection, ObjectId } from "mongoose";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "../../../../database/repositories/crud.repo";
import { IClass } from "../../../../database/schema/pedagogy/class/class.schema";
import { IClassGroup } from "../../../../database/schema/pedagogy/class/classGroup.schema";
import { IStudent } from "../../../../database/schema/users/student.schema";
import { ITeacher } from "../../../../database/schema/users/teacher.schema";
import { populateInterface } from "../../../../database/types";
import { isIdsEqual } from "../../../../helpers/functionsUtils";
import { batchUploadService } from "../../../../helpers/upload";
import {
  sendNotificationToParentsOfStudent,
  sendNotificationToStudentsOfClass,
  sendNotificationToStudentsOfClassGroup,
  sendNotificationToStudentsOfGroup,
} from "../../../notification/services/helpers.service";
import { Populate } from "../../../../core/populateTypes";
import { ISession } from "../../../../database/schema/pedagogy/session/session.schema";
import { GroupMetaData } from "../../../../feature/groupManagement/domains/group.entity";
import { FileUpload } from "../../../../helpers/fileUpload";
import { stringToObjectId } from "../../../../helpers/stringToObjectId";
import { File } from "../../../../types/app-request";
import { NOTIFICATION_TYPES_ENUM } from "../../../notification/constants/constants";
import {
  AddHomeworkTranslationKeysEnum,
  checkHomeworkOfErrorResponse,
  HOMEWORK_STATUS_ENUM,
} from "../../constants/shared/addHomework.constants";
import { sharedHomeworkTranslationKeysEnum } from "../../constants/shared/sharedHomework.constants";
import { TAddHomeworkResponse } from "../../types/shared/addHomework.types";
import { TAddHomeworkValidation } from "../../validations/shared/addHomework.validation";
import { IFile } from "../../../../feature/sessionManagement/domain/session.entity";

export const addHomeworkService = async (
  connection: Connection,
  homeworkPayload: TAddHomeworkValidation["body"],
  session: ClientSession,
  tenantId: string,
  homeworkFiles: File[] | undefined,
  teacherId?: ObjectId,
): Promise<TAddHomeworkResponse> => {
  let classGroupPromise = undefined;
  let subjectTypePromise = undefined;
  let subSubjectTypePromise = undefined;
  let groupPromise = undefined;
  let sessionToDoPromise = undefined;
  let sessionGivenPromise = undefined;
  let classDoc: populateInterface<IClass, { students: IStudent[] }> | null = null;

  let uploadedHomeworks: IFile[] = [];

  if (homeworkPayload.classNewId) {
    classDoc = (await crudRepo(connection, "class").findOne(
      { newId: homeworkPayload.classNewId },
      { populate: ["students"] },
    )) as unknown as populateInterface<IClass, { students: IStudent[] }> | null;
    if (!classDoc) throw new NotFoundError(AddHomeworkTranslationKeysEnum.CLASS_NOT_FOUND);
  }
  if (homeworkPayload.sessionToDo) {
    sessionToDoPromise = crudRepo(connection, "session").findOne({
      _id: homeworkPayload.sessionToDo,
      status: "waiting",
    });
  }
  if (homeworkPayload.sessionGiven) {
    sessionGivenPromise = crudRepo(connection, "session").findOne({
      _id: homeworkPayload.sessionGiven,
      status: "inProgress",
    });
  }

  if (homeworkPayload.classGroup) {
    classGroupPromise = crudRepo(connection, "classGroup").findOne(
      { _id: homeworkPayload.classGroup },
      { populate: ["students"] },
    ) as unknown as Promise<populateInterface<IClassGroup, { students: IStudent[] }>>;
  }
  if ("subjectType" in homeworkPayload) {
    subjectTypePromise = crudRepo(connection, "subjectType").findOne({
      newId: homeworkPayload.subjectType,
    });
  } else if ("subSubjectType" in homeworkPayload) {
    subSubjectTypePromise = crudRepo(connection, "subSubjectType").findOne({
      newId: homeworkPayload.subSubjectType,
    });
  }
  if ("groupNewId" in homeworkPayload) {
    groupPromise = crudRepo(connection, "group").findOne(
      { newId: homeworkPayload.groupNewId },
      { populate: ["teacher", "students"] },
    ) as unknown as Promise<Populate<GroupMetaData, "teacher" | "students">>;
  }

  const [sessionToDoDoc, sessionGivenDoc] = await Promise.all([
    sessionToDoPromise,
    sessionGivenPromise,
  ]);

  if (homeworkPayload.sessionToDo && !sessionToDoDoc)
    throw new NotFoundError(AddHomeworkTranslationKeysEnum.SESSION_TO_DO_NOT_FOUND);
  if (homeworkPayload.sessionGiven && !sessionGivenDoc)
    throw new NotFoundError(AddHomeworkTranslationKeysEnum.SESSION_GIVEN_NOT_FOUND);

  checkHomeworkOf("subjectType", homeworkPayload, sessionToDoDoc, sessionGivenDoc);
  checkHomeworkOf("subSubjectType", homeworkPayload, sessionToDoDoc, sessionGivenDoc);
  checkHomeworkOf("group", homeworkPayload, sessionToDoDoc, sessionGivenDoc);
  checkHomeworkOf("class", homeworkPayload, sessionToDoDoc, sessionGivenDoc);

  const [classGroupDoc, subjectTypeDoc, subSubjectTypeDoc, groupDoc] = await Promise.all([
    classGroupPromise,
    subjectTypePromise,
    subSubjectTypePromise,
    groupPromise,
  ]);

  if (classGroupDoc && !isIdsEqual(classGroupDoc.class, classDoc?._id))
    throw new BadRequestError(AddHomeworkTranslationKeysEnum.GROUP_DOES_NOT_BELONG_TO_THIS_CLASS);

  if ([subjectTypeDoc, subSubjectTypeDoc, groupDoc].every(document => !document))
    throw new BadRequestError(AddHomeworkTranslationKeysEnum.HOMEWORK_MUST_BE_RELATED_TO_TOPIC);

  if (homeworkFiles) {
    const homeworkFileBuffers = homeworkFiles.map(file => file.buffer);
    const paths = FileUpload.generateFilePaths(homeworkFiles, tenantId, "homework");
    const files = await batchUploadService(homeworkFileBuffers, paths);
    uploadedHomeworks = FileUpload.formatUploadedFile(homeworkFiles, files, tenantId);
  }

  const teacherSessionId = sessionGivenDoc?.teacher || sessionToDoDoc?.teacher;
  if (!teacherSessionId)
    throw new BadRequestError(AddHomeworkTranslationKeysEnum.SESSION_DOES_NOT_HAVE_TEACHER_ASSESS);

  if (teacherId && !isIdsEqual(teacherId, teacherSessionId)) {
    throw new BadRequestError(AddHomeworkTranslationKeysEnum.YOU_ARE_NOT_THE_OWNER_OF_THIS_SESSION);
  }

  const teacherDoc = (await crudRepo(connection, "teacher").findOne({
    _id: teacherSessionId,
    isArchived: false,
  })) as ITeacher | null;
  if (!teacherDoc) throw new NotFoundError(sharedHomeworkTranslationKeysEnum.TEACHER_NOT_FOUND);

  const homework = await crudRepo(connection, "homework").addOne(
    {
      name: homeworkPayload.name,
      dueDate: homeworkPayload.dueDate || sessionToDoDoc?.startTime || sessionGivenDoc?.startTime,
      subjectType: subjectTypeDoc ? subjectTypeDoc._id : undefined,
      subSubjectType: subSubjectTypeDoc ? subSubjectTypeDoc._id : undefined, //prettier-ignore
      group: groupDoc ? stringToObjectId(groupDoc._id) : undefined,
      class: groupDoc ? undefined : classDoc?._id,
      teacher: sessionToDoDoc?.teacher,
      classGroup: classGroupDoc ? classGroupDoc._id : undefined,
      files: uploadedHomeworks,
      description: homeworkPayload.description,
      status: HOMEWORK_STATUS_ENUM.TODO,
    },
    session,
  );
  if (homeworkPayload.sessionGiven) {
    await crudRepo(connection, "session").updateOne(
      { _id: homeworkPayload.sessionGiven },
      { $push: { homeworkGiven: homework } },
      session,
    );
  }
  if (homeworkPayload.sessionToDo) {
    await crudRepo(connection, "session").updateOne(
      { _id: homeworkPayload.sessionToDo },
      { $push: { homeworkToDo: homework } },
      session,
    );
  }

  const subjectName = subjectTypeDoc
    ? subjectTypeDoc.name
    : subSubjectTypeDoc
    ? subSubjectTypeDoc.name
    : groupDoc?.groupType.name;

  await sendHomeworkNotification(
    connection,
    subjectName,
    classGroupDoc,
    teacherDoc,
    tenantId,
    groupDoc,
    classDoc,
    session,
    homework.newId,
  );

  return homework;
};

const checkHomeworkOf = (
  topicType: "subjectType" | "subSubjectType" | "group" | "class",
  homework: TAddHomeworkValidation["body"],
  sessionToDoDoc?: ISession,
  sessionGivenDoc?: ISession,
): void => {
  if (
    topicType in homework &&
    sessionToDoDoc &&
    !sessionToDoDoc[topicType] &&
    sessionGivenDoc &&
    !sessionGivenDoc[topicType]
  ) {
    const errorMessage = checkHomeworkOfErrorResponse(topicType);
    throw new BadRequestError(errorMessage);
  }
};

const sendHomeworkNotification = async (
  connection: Connection,
  topicName: string | undefined,
  classGroupDoc: populateInterface<IClassGroup, { students: IStudent[] }> | undefined,
  teacherDoc: ITeacher,
  tenantId: string,
  groupDoc: Populate<GroupMetaData, "teacher" | "students"> | undefined,
  classDoc: populateInterface<IClass, { students: IStudent[] }> | null,
  session: ClientSession,
  homeworkNewId: string,
): Promise<void> => {
  const subjectName = topicName;

  if (classGroupDoc) {
    const sendNotificationToParentPromises = [];
    sendNotificationToParentPromises.push(
      sendNotificationToStudentsOfClassGroup(
        connection,
        String(classGroupDoc._id),
        {
          topic: NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
          details: { homeworkNewId: homeworkNewId },
        },
        { $teacherName: teacherDoc.fullName, $Subject: subjectName || "" },
        tenantId,
        session,
      ),
    );
    for (const studentDoc of classGroupDoc.students) {
      sendNotificationToParentPromises.push(
        sendNotificationToParentsOfStudent(
          connection,
          String(studentDoc._id),
          {
            topic: NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
            details: { homeworkNewId: homeworkNewId, studentNewId: studentDoc.newId },
          },
          { $studentName: studentDoc.fullName },
          tenantId,
          session,
        ),
      );
    }

    await Promise.all(sendNotificationToParentPromises);
  }

  if (groupDoc) {
    const sendNotificationsPromises = [];
    for (const studentDoc of groupDoc.students) {
      sendNotificationsPromises.push(
        sendNotificationToStudentsOfGroup(
          connection,
          [studentDoc._id.toString()],
          {
            topic: NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
            details: { homeworkNewId: homeworkNewId },
          },
          { $teacherName: groupDoc.teacher.fullName },
          tenantId,
          session,
        ),
      );
    }
    await Promise.all(sendNotificationsPromises);

    const sendNotificationToParentPromises = [];
    for (const studentDoc of groupDoc.students) {
      sendNotificationToParentPromises.push(
        sendNotificationToParentsOfStudent(
          connection,
          studentDoc._id.toString(),
          {
            topic: NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
            details: {
              studentNewId: studentDoc.newId,
              homeworkNewId: homeworkNewId,
            },
          },
          { $studentName: studentDoc.fullName },
          tenantId,
          session,
        ),
      );
    }

    await Promise.all(sendNotificationToParentPromises);
  }

  if (classDoc && !classGroupDoc) {
    const sendNotificationToParentPromises = [];
    sendNotificationToParentPromises.push(
      sendNotificationToStudentsOfClass(
        connection,
        String(classDoc._id),
        {
          topic: NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
          details: { homeworkNewId: homeworkNewId },
        },
        { $Subject: subjectName || "", $teacherName: teacherDoc.fullName },
        tenantId,
        session,
      ),
    );
    for (const studentDoc of classDoc.students) {
      sendNotificationToParentPromises.push(
        sendNotificationToParentsOfStudent(
          connection,
          String(studentDoc._id),
          {
            topic: NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
            details: { homeworkNewId: homeworkNewId, studentNewId: studentDoc.newId },
          },
          { $studentName: studentDoc.fullName },
          tenantId,
          session,
        ),
      );
    }

    await Promise.all(sendNotificationToParentPromises);
  }
};
