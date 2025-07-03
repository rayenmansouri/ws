import { TReactionTypeEnum } from "./../../../features/schoolAnnouncement/constants/reactionType.constant";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { Schema } from "mongoose";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
  TNotificationTypesEnum,
} from "../../../features/notification/constants/constants";
import { IEntity } from "../../../types/entities";
import { createSchema } from "./../../../helpers/createSchema";

export type CheckNotificationEnumsMapped<
  T extends { [K in TNotificationTypesEnum]: { topic: K } },
> = T[TNotificationTypesEnum];

type parentHomeworkNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK;
  details: {
    homeworkNewId: string;
    studentNewId: string;
  };
};

type studentHomeworkNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK;
  details: {
    homeworkNewId: string;
  };
};

type observationNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.OBSERVATIONS;
  details: {
    studentNewId: string;
    punishmentNewId: string;
  };
};

type scheduleNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.SCHEDULE;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};

type attendanceNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.ATTENDANCE;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};

type paymentNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.PAYMENT;
  details: {
    invoiceNewId: string;
    studentNewId: string;
  };
};

type sessionNoteNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.SESSION_NOTES;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};

type informationNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.ALERT;
  details: {
    content: string | null;
  };
};

type attendanceAbsentNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};

type attendanceLateNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.ATTENDANCE_LATE;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};

type attendanceExpelledNotification = {
  topic: typeof NOTIFICATION_TYPES_ENUM.ATTENDANCE_EXPELLED;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};
type teacherSessionCanceled = {
  topic: typeof NOTIFICATION_TYPES_ENUM.TEACHER_SESSION_CANCELED;
  details: {
    sessionNewId: string;
  };
};
type studentSessionCanceled = {
  topic: typeof NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};
type parentSessionCanceled = {
  topic: typeof NOTIFICATION_TYPES_ENUM.PARENT_SESSION_CANCELED;
  details: {
    sessionNewId: string;
    studentNewId: string;
  };
};
type newPostAdded = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_POST_ADDED;
  details: {
    postNewId: string;
  };
};
type newPostReaction = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_POST_REACTION;
  details: {
    postNewId: string;
  };
};
type newCommentOnPost = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_ON_POST;
  details: {
    postNewId: string;
    commentNewId: string;
  };
};
type newCommentReaction = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REACTION;
  details: {
    postNewId: string;
    commentNewId: string;
  };
};
type newCommentReply = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REPLY;
  details: {
    postNewId: string;
    commentNewId: string;
  };
};
type newMentionInComment = {
  topic: typeof NOTIFICATION_TYPES_ENUM.MENTION_IN_COMMENT;
  details: {
    postNewId: string;
    commentNewId: string;
  };
};
type newMessageReceived = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_MESSAGE_RECEIVED;
  details: {
    conversationId: string;
    conversationNewId: string;
    senderFullName: string;
  };
};
type newReactionOnMessage = {
  topic: typeof NOTIFICATION_TYPES_ENUM.NEW_REACTION_ON_MESSAGE;
  details: {
    userFullName: string;
    messageNewId: string;
    conversationNewId: string;
    reactionType: TReactionTypeEnum;
  };
};

type fullInvoicePaymentSuccess = {
  topic: typeof NOTIFICATION_TYPES_ENUM.FULL_INVOICE_PAYMENT_SUCCESS;
  details: {
    amountPaid: number;
    paidAt: string;
    invoiceNewId: string;
  };
};

type InvoiceSplitPaymentSuccess = {
  topic: typeof NOTIFICATION_TYPES_ENUM.INVOICE_SPLIT_PAYMENT_SUCCESS;
  details: {
    amountPaid: number;
    paidAt: string;
    remainingAmount: number;
    invoiceNewId: string;
  };
};

export type notificationTopicMap = {
  [NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK]: parentHomeworkNotification;
  [NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK]: studentHomeworkNotification;
  [NOTIFICATION_TYPES_ENUM.OBSERVATIONS]: observationNotification;
  [NOTIFICATION_TYPES_ENUM.SCHEDULE]: scheduleNotification;
  [NOTIFICATION_TYPES_ENUM.PAYMENT]: paymentNotification;
  [NOTIFICATION_TYPES_ENUM.ATTENDANCE]: attendanceNotification;
  [NOTIFICATION_TYPES_ENUM.SESSION_NOTES]: sessionNoteNotification;
  [NOTIFICATION_TYPES_ENUM.ALERT]: informationNotification;
  [NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT]: attendanceAbsentNotification;
  [NOTIFICATION_TYPES_ENUM.ATTENDANCE_LATE]: attendanceLateNotification;
  [NOTIFICATION_TYPES_ENUM.ATTENDANCE_EXPELLED]: attendanceExpelledNotification;
  [NOTIFICATION_TYPES_ENUM.PARENT_SESSION_CANCELED]: parentSessionCanceled;
  [NOTIFICATION_TYPES_ENUM.STUDENT_SESSION_CANCELED]: studentSessionCanceled;
  [NOTIFICATION_TYPES_ENUM.TEACHER_SESSION_CANCELED]: teacherSessionCanceled;
  [NOTIFICATION_TYPES_ENUM.NEW_POST_ADDED]: newPostAdded;
  [NOTIFICATION_TYPES_ENUM.NEW_POST_REACTION]: newPostReaction;
  [NOTIFICATION_TYPES_ENUM.NEW_COMMENT_ON_POST]: newCommentOnPost;
  [NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REACTION]: newCommentReaction;
  [NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REPLY]: newCommentReply;
  [NOTIFICATION_TYPES_ENUM.MENTION_IN_COMMENT]: newMentionInComment;
  [NOTIFICATION_TYPES_ENUM.NEW_MESSAGE_RECEIVED]: newMessageReceived;
  [NOTIFICATION_TYPES_ENUM.NEW_REACTION_ON_MESSAGE]: newReactionOnMessage;
  [NOTIFICATION_TYPES_ENUM.FULL_INVOICE_PAYMENT_SUCCESS]: fullInvoicePaymentSuccess;
  [NOTIFICATION_TYPES_ENUM.INVOICE_SPLIT_PAYMENT_SUCCESS]: InvoiceSplitPaymentSuccess;
};

export type notificationTopicWithDetails = CheckNotificationEnumsMapped<notificationTopicMap>;

export type IBaseNotification = {
  userId: string;
  userType: TEndUserWithoutMasterEnums;
  message: string;
  status: string;
  date: Date;
  link?: string;
  dynamicFieldValues: { [key: string]: string };
} & notificationTopicWithDetails;

export type INotification = IBaseNotification & IEntity & { broadcastId: string };

export const notificationSchema = createSchema<INotification>({
  userId: String,
  userType: { type: String },
  message: { type: String, default: null },
  status: { type: String, enum: NOTIFICATION_STATUS_ENUM },
  topic: {
    type: String,
    enum: NOTIFICATION_TYPES_ENUM,
  },
  link: String,
  date: Date,
  dynamicFieldValues: {
    type: Schema.Types.Mixed,
    default: {},
  },
  details: {
    type: Schema.Types.Mixed,
    default: null,
  },
  broadcastId: String,
});

notificationSchema.index({ status: 1, userId: 1 });
