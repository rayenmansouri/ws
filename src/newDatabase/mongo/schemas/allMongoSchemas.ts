import { mongoClassSchema } from "./class.schema";
import { mongoLevelSchema } from "./level.schema";
import { mongoNotificationSchema } from "./notification.schema";
import { mongoNotificationSettingsSchema } from "./notificationSettings.schema";
import { mongoSchoolYearSchema } from "./schoolYear.schema";
import { mongoParentSchema } from "./parent.schema";
import { mongoStudentSchema } from "./student.schema";
import { mongoStudentProfileSchema } from "./studentProfile.schema";
import { mongoSubjectTypeSchema } from "./subjectType.schema";
import { mongoSubLevelSchema } from "./subLevel.schema";
import { mongoSubSubjectTypeSchema } from "./subSubjectType.schema";
import { mongoTeacherSchema } from "./teacher.schema";
import { mongoGroupSchema } from "./group.schema";
import { mongoVerificationCodeSchema } from "./verificationCode.schema";
import { mongoWeeklySessionSchema } from "./weeklySession.schema";
import { mongoGroupTypeSchema } from "./groupType.schema";
import { mongoSessionSchema } from "./session.schema";
import { mongoSessionTypeSchema } from "./sessionType.schema";
import { mongoClassGroupSchema } from "./classGroup.schema";
import { mongoClassroomSchema } from "./classroom.schema";
import { mongoClassTypeSchema } from "./classType.schema";
import { CounterSchema } from "./../../../core/newId/CounterModel";
import { mongoAdminSchema } from "./admin.schema";
import { mongoTeacherProfileSchema } from "./teacherProfile.schema";
import { mongoMessageLinksSchema } from "./MessageLinks.schema";
import { mongoMessageSchema } from "./message.schema";
import { mongoMessageAttachmentSchema } from "./messageAttachment.schema";
import { mongoConversationSchema } from "./conversation.schema";

export const allMongoSchemas = {
  classType: mongoClassTypeSchema,
  level: mongoLevelSchema,
  notificationSettings: mongoNotificationSettingsSchema,
  parent: mongoParentSchema,
  schoolYear: mongoSchoolYearSchema,
  student: mongoStudentSchema,
  studentProfile: mongoStudentProfileSchema,
  subLevel: mongoSubLevelSchema,
  admin: mongoAdminSchema,
  subjectType: mongoSubjectTypeSchema,
  subSubjectType: mongoSubSubjectTypeSchema,
  groupType: mongoGroupTypeSchema,
  group: mongoGroupSchema,
  teacher: mongoTeacherSchema,
  teacherProfile: mongoTeacherProfileSchema,
  classroom: mongoClassroomSchema,
  sessionType: mongoSessionTypeSchema,
  class: mongoClassSchema,
  session: mongoSessionSchema,
  notification: mongoNotificationSchema,
  weeklySession: mongoWeeklySessionSchema,
  classGroup: mongoClassGroupSchema,
  counter: CounterSchema,
  verificationCode: mongoVerificationCodeSchema,
  messageLinks: mongoMessageLinksSchema,
  message: mongoMessageSchema,
  messageAttachment: mongoMessageAttachmentSchema,
  conversation: mongoConversationSchema,
} as const;
