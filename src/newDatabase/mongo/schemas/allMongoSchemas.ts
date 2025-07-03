import { mongoSignatureSchema } from "./signature.schema";
import { mongoChapterSchema } from "./chapter.schema";
import { mongoChapterAttachmentSchema } from "./chapterAttachment.schema";
import { CounterSchema } from "./../../../core/newId/CounterModel";
import { mongoAdminSchema } from "./admin.schema";
import { mongoAlertSchema } from "./alert.schema";
import { mongoAppVersionSchema } from "./AppVersion.schema";
import { mongoBankCheckSchema } from "./bankCheck.schema";
import { mongoBankTransferSchema } from "./bankTransfer.schema";
import { mongoBarCodeConfigSchema } from "./barCode.schema";
import { mongoClassSchema } from "./class.schema";
import { mongoClassGroupSchema } from "./classGroup.schema";
import { mongoClassroomSchema } from "./classroom.schema";
import { mongoClassTypeSchema } from "./classType.schema";
import { mongoCommentSchema } from "./comment.schema";
import { mongoConversationSchema } from "./conversation.schema";
import { mongoDiplomaSchema } from "./diploma.schema";
import { mongoExamGradeSchema } from "./examGrade.schema";
import { mongoExamTypeSchema } from "./examType.schema";
import { mongoExpenseSchema } from "./expense.schema";
import { mongoGradeBookObservationSchema } from "./gradeBookObservation.schema";
import { mongoGradeReportTemplateSchema } from "./gradeReportTemplate.schema";
import { mongoGroupSchema } from "./group.schema";
import { mongoGroupTypeSchema } from "./groupType.schema";
import { mongoHolidaySchema } from "./holiday.schema";
import { mongoHomeworkSchema } from "./homework.schema";
import { mongoInteractionSchema } from "./interaction.schema";
import { mongoInvoiceSchema } from "./invoice.schema";
import { mongoIssueSchema } from "./issue.schema";
import { mongoIssueReasonSchema } from "./issueReason.schema";
import { mongoLevelSchema } from "./level.schema";
import { mongoMessageSchema } from "./message.schema";
import { mongoMessageAttachmentSchema } from "./messageAttachment.schema";
import { mongoMessageLinksSchema } from "./MessageLinks.schema";
import { mongoNotificationSchema } from "./notification.schema";
import { mongoNotificationSettingsSchema } from "./notificationSettings.schema";
import { mongoParentSchema } from "./parent.schema";
import { mongoPaymentTemplateSchema } from "./paymentTemplate.schema";
import { mongoPostSchema } from "./post.schema";
import { mongoPreRegistrationSchema } from "./preRegistration.schema";
import { mongoObservationSchema } from "./observation.schema";
import { mongoObservationReasonSchema } from "./observationReason.schema";
import { mongoReactionSchema } from "./reaction.schema";
import { mongoSchoolYearSchema } from "./schoolYear.schema";
import { mongoSectionSchema } from "./section.schema";
import { mongoServiceSchema } from "./service.schema";
import { mongoSessionSchema } from "./session.schema";
import { mongoSessionTypeSchema } from "./sessionType.schema";
import { mongoSmartCalendarScheduleSchema } from "./smartCalendarSchedule.schema";
import { mongoSmartCalendarSessionSchema } from "./smartCalendarSession.schema";
import { mongoStudentSchema } from "./student.schema";
import { mongoStudentPaymentConfiguration } from "./studentPaymentConfiguration.schema";
import { mongoStudentProfileSchema } from "./studentProfile.schema";
import { mongoSubjectTypeSchema } from "./subjectType.schema";
import { mongoSubLevelSchema } from "./subLevel.schema";
import { mongoSubSubjectTypeSchema } from "./subSubjectType.schema";
import { mongoSupplierSchema } from "./supplier.schema";
import { mongoTeacherSchema } from "./teacher.schema";
import { mongoTeacherPaymentConfigurationSchema } from "./teacherPaymentConfiguration.schema";
import { mongoTeacherPaymentHistorySchema } from "./teacherPaymentHistory.schema";
import { mongoTeacherProfileSchema } from "./teacherProfile.schema";
import { mongoTermSchema } from "./term.schema";
import { mongoTransactionSchema } from "./transaction.schema";
import { mongoUserPostFeedSchema } from "./userPostFeed.schema";
import { mongoVerificationCodeSchema } from "./verificationCode.schema";
import { mongoWeeklySessionSchema } from "./weeklySession.schema";

export const allMongoSchemas = {
  classType: mongoClassTypeSchema,
  level: mongoLevelSchema,
  notificationSettings: mongoNotificationSettingsSchema,
  parent: mongoParentSchema,
  schoolYear: mongoSchoolYearSchema,
  student: mongoStudentSchema,
  studentProfile: mongoStudentProfileSchema,
  subLevel: mongoSubLevelSchema,
  term: mongoTermSchema,
  paymentConfiguration: mongoStudentPaymentConfiguration,
  admin: mongoAdminSchema,
  feed: mongoUserPostFeedSchema,
  subjectType: mongoSubjectTypeSchema,
  subSubjectType: mongoSubSubjectTypeSchema,
  groupType: mongoGroupTypeSchema,
  group: mongoGroupSchema,
  teacher: mongoTeacherSchema,
  teacherProfile: mongoTeacherProfileSchema,
  supplier: mongoSupplierSchema,
  expense: mongoExpenseSchema,
  transaction: mongoTransactionSchema,
  bankCheck: mongoBankCheckSchema,
  classroom: mongoClassroomSchema,
  sessionType: mongoSessionTypeSchema,
  service: mongoServiceSchema,
  issueReason: mongoIssueReasonSchema,
  paymentTemplate: mongoPaymentTemplateSchema,
  preRegistration: mongoPreRegistrationSchema,
  observationReason: mongoObservationReasonSchema,
  class: mongoClassSchema,
  session: mongoSessionSchema,
  homework: mongoHomeworkSchema,
  examGrade: mongoExamGradeSchema,
  notification: mongoNotificationSchema,
  observation: mongoObservationSchema,
  examType: mongoExamTypeSchema,
  gradeBookObservation: mongoGradeBookObservationSchema,
  diploma: mongoDiplomaSchema,
  comment: mongoCommentSchema,
  reaction: mongoReactionSchema,
  post: mongoPostSchema,
  issue: mongoIssueSchema,
  interaction: mongoInteractionSchema,
  messageAttachment: mongoMessageAttachmentSchema,
  conversation: mongoConversationSchema,
  message: mongoMessageSchema,
  weeklySession: mongoWeeklySessionSchema,
  classGroup: mongoClassGroupSchema,
  counter: CounterSchema,
  section: mongoSectionSchema,
  invoice: mongoInvoiceSchema,
  teacherPaymentHistory: mongoTeacherPaymentHistorySchema,
  messageLinks: mongoMessageLinksSchema,
  holiday: mongoHolidaySchema,
  barCodeConfig: mongoBarCodeConfigSchema,
  appVersion: mongoAppVersionSchema,
  bankTransfer: mongoBankTransferSchema,
  alert: mongoAlertSchema,
  verificationCode: mongoVerificationCodeSchema,
  gradeReportTemplate: mongoGradeReportTemplateSchema,
  teacherPaymentConfiguration: mongoTeacherPaymentConfigurationSchema,
  smartCalendarSchedule: mongoSmartCalendarScheduleSchema,
  smartCalendarSession: mongoSmartCalendarSessionSchema,
  chapterAttachment: mongoChapterAttachmentSchema,
  signature: mongoSignatureSchema,
  chapter: mongoChapterSchema,
} as const;
