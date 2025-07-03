import mongoose, { Connection, Schema } from "mongoose";
import { feedSchema } from "../database/schema/announcement/feed.schema";
import { postSchema } from "../database/schema/announcement/post.schema";
import { reactionSchema } from "../database/schema/announcement/reaction.schema";
import { invoiceSchema } from "../database/schema/finance/Invoice.schema";
import { bankCheckSchema } from "../database/schema/finance/bankCheck.schema";
import { expenseSchema } from "../database/schema/finance/expense.schema";
import { paymentConfigurationSchema } from "../database/schema/finance/paymentConfiguration.schema";
import { paymentTemplateSchema } from "../database/schema/finance/paymentTemplate.schema";
import { serviceSchema } from "../database/schema/finance/service.schema";
import { teacherPaymentConfigurationSchema } from "../database/schema/finance/teacherPaymentConfiguration.schema";
import { teacherPaymentHistorySchema } from "../database/schema/finance/teacherPaymentHistory.schema";
import { transactionSchema } from "../database/schema/finance/transaction.schema";
import { notificationSchema } from "../database/schema/notification/notification.schema";
import { notificationSettingsSchema } from "../database/schema/notification/notificationSettings.schema";
import { classroomSchema } from "../database/schema/pedagogy/Campus/classroom.schema";
import { examTypeSchema } from "../database/schema/pedagogy/Performance/examType.schema";
import { homeworkSchema } from "../database/schema/pedagogy/Performance/homework.schema";
import { interactionSchema } from "../database/schema/pedagogy/Performance/interaction.schema";
import { issuesSchema } from "../database/schema/pedagogy/Performance/issue.schema";
import { issueReasonSchema } from "../database/schema/pedagogy/Performance/issueReason.schema";
import { observationSchema } from "../database/schema/pedagogy/Performance/observation.schema";
import { observationReasonSchema } from "../database/schema/pedagogy/Performance/observationReason.schema";
import { studentProfileSchema } from "../database/schema/pedagogy/Profile/studentProfile.schema";
import { teacherProfileSchema } from "../database/schema/pedagogy/Profile/teacherProfile.schema";
import { classSchema } from "../database/schema/pedagogy/class/class.schema";
import { classGroupSchema } from "../database/schema/pedagogy/class/classGroup.schema";
import { classTypeSchema } from "../database/schema/pedagogy/class/classType.schema";
import { sessionSchema } from "../database/schema/pedagogy/session/session.schema";
import { sessionTypeSchema } from "../database/schema/pedagogy/session/sessionType.schema";
import { weeklySessionSchema } from "../database/schema/pedagogy/session/weeklySession.schema";
import { holidaySchema } from "../database/schema/pedagogy/structure/holiday.schema";
import { levelSchema } from "../database/schema/pedagogy/structure/level.schema";
import { schoolYearSchema } from "../database/schema/pedagogy/structure/schoolYear.schema";
import { sectionSchema } from "../database/schema/pedagogy/structure/section.schema";
import { subLevelSchema } from "../database/schema/pedagogy/structure/subLevel.schema";
import { termSchema } from "../database/schema/pedagogy/structure/term.schema";
import { subSubjectTypeSchema } from "../database/schema/pedagogy/subject/subSubjectType.schema";
import { subjectTypeSchema } from "../database/schema/pedagogy/subject/subjectType.schema";
import { adminSchema } from "../database/schema/users/admin.schema";
import { parentSchema } from "../database/schema/users/parent.schema";
import { studentSchema } from "../database/schema/users/student.schema";
import { teacherSchema } from "../database/schema/users/teacher.schema";
import { verificationCodeSchema } from "../database/schema/users/verificationCode.schema";
import { mongoDiplomaSchema } from "../newDatabase/mongo/schemas/diploma.schema";
import { mongoGroupSchema } from "../newDatabase/mongo/schemas/group.schema";
import { mongoSupplierSchema } from "../newDatabase/mongo/schemas/supplier.schema";
import { commentSchema } from "./../database/schema/announcement/comment.schema";
import { centralUserSchema } from "./../database/schema/users/user.central.schema";
import { mongoMessageLinksSchema } from "./../newDatabase/mongo/schemas/MessageLinks.schema";
import { mongoConversationSchema } from "./../newDatabase/mongo/schemas/conversation.schema";
import { mongoMessageSchema } from "./../newDatabase/mongo/schemas/message.schema";
import { mongoMessageAttachmentSchema } from "./../newDatabase/mongo/schemas/messageAttachment.schema";
import { CounterSchema } from "./newId/CounterModel";
import { mongoGroupTypeSchema } from "../newDatabase/mongo/schemas/groupType.schema";

interface IInitializeSchemas {
  [key: string]: Schema<any>;
}
export const tenantSchemas: IInitializeSchemas = {
  admin: adminSchema,
  parent: parentSchema,
  student: studentSchema,
  teacher: teacherSchema,
  schoolYear: schoolYearSchema,
  term: termSchema,
  level: levelSchema,
  subLevel: subLevelSchema,
  section: sectionSchema,
  subjectType: subjectTypeSchema,
  classType: classTypeSchema,
  examType: examTypeSchema,
  observationReason: observationReasonSchema,
  subSubjectType: subSubjectTypeSchema,
  class: classSchema,
  studentProfile: studentProfileSchema,
  teacherProfile: teacherProfileSchema,
  classroom: classroomSchema,
  sessionType: sessionTypeSchema,
  classGroup: classGroupSchema,
  holiday: holidaySchema,
  weeklySession: weeklySessionSchema,
  session: sessionSchema,
  paymentConfiguration: paymentConfigurationSchema,
  paymentTemplate: paymentTemplateSchema,
  invoice: invoiceSchema,
  bankCheck: bankCheckSchema,
  service: serviceSchema,
  observation: observationSchema,
  homework: homeworkSchema,
  verificationCode: verificationCodeSchema,
  counter: CounterSchema,
  notification: notificationSchema,
  notificationSettings: notificationSettingsSchema,
  transaction: transactionSchema,
  expense: expenseSchema,
  teacherPaymentHistory: teacherPaymentHistorySchema,
  teacherPaymentConfiguration: teacherPaymentConfigurationSchema,
  issue: issuesSchema,
  issueReason: issueReasonSchema,
  interaction: interactionSchema,
  feed: feedSchema,
  post: postSchema,
  reaction: reactionSchema,
  comment: commentSchema,
  supplier: mongoSupplierSchema,
  diploma: mongoDiplomaSchema,
  conversation: mongoConversationSchema,
  message: mongoMessageSchema,
  messageAttachment: mongoMessageAttachmentSchema,
  messageLinks: mongoMessageLinksSchema,
  group: mongoGroupSchema,
  groupType: mongoGroupTypeSchema,
};

export const centralDBSchemas: IInitializeSchemas = {
  parent: centralUserSchema,
  teacher: centralUserSchema,
  student: centralUserSchema,
  admin: centralUserSchema,
};

export const initializeModels = (connection: Connection, schemas: IInitializeSchemas): void => {
  Object.entries(schemas).forEach(([entity, schema]) => {
    mongoose.plugin(schema => {
      if (schema.path("updatedAt")) {
        schema.path("updatedAt").select(false);
      }
    });
    connection.model(entity, schema);
  });
};
