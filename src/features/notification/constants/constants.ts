export const FCM_TOKEN_LIMIT = 500;

export const MAX_TOKEN_PER_USER = 3;

export const ATTENDANCE_STATUS_ENUM = {
  ATTENDANCE_ABSENT: "attendance_absent",
  ATTENDANCE_EXPELLED: "attendance_expelled",
  ATTENDANCE_LATE: "attendance_late",
} as const;

export type TAttendanceStatusEnum =
  (typeof ATTENDANCE_STATUS_ENUM)[keyof typeof ATTENDANCE_STATUS_ENUM];

export const NOTIFICATION_STATUS_ENUM = {
  SEEN: "seen",
  UNSEEN: "unseen",
} as const;
export type TNotificationStatusEnum =
  (typeof NOTIFICATION_STATUS_ENUM)[keyof typeof NOTIFICATION_STATUS_ENUM];

export const NOTIFICATION_TYPES_ENUM = {
  OBSERVATIONS: "observations",
  STUDENT_HOMEWORK: "student_homework",
  PARENT_HOMEWORK: "parent_homework",
  SCHEDULE: "schedule",
  ATTENDANCE: "attendance",
  PAYMENT: "payment",
  SESSION_NOTES: "session_notes",
  ALERT: "alert",
  ATTENDANCE_ABSENT: "attendance_absent",
  ATTENDANCE_LATE: "attendance_late",
  ATTENDANCE_EXPELLED: "attendance_expelled",
  TEACHER_SESSION_CANCELED: "teacher_session_canceled",
  PARENT_SESSION_CANCELED: "parent_session_canceled",
  STUDENT_SESSION_CANCELED: "student_session_canceled",
  NEW_POST_ADDED: "new_post_added",
  NEW_POST_REACTION: "new_post_reaction",
  NEW_COMMENT_ON_POST: "new_comment_on_post",
  NEW_COMMENT_REACTION: "new_comment_reaction",
  NEW_COMMENT_REPLY: "new_comment_reply",
  MENTION_IN_COMMENT: "mention_in_comment",
  NEW_MESSAGE_RECEIVED: "new_message_received",
  NEW_REACTION_ON_MESSAGE: "new_reaction_on_message",
  FULL_INVOICE_PAYMENT_SUCCESS: "full_invoice_payment_success",
  INVOICE_SPLIT_PAYMENT_SUCCESS: "invoice_split_payment_success",
} as const;
export type TNotificationTypesEnum =
  (typeof NOTIFICATION_TYPES_ENUM)[keyof typeof NOTIFICATION_TYPES_ENUM];
