import { z } from 'zod';

declare const ACTION_ENUM: {
    readonly VIEW: "VIEW";
    readonly ADD: "ADD";
    readonly EDIT: "EDIT";
    readonly DELETE: "DELETE";
    readonly ASSIGN: "ASSIGN";
    readonly UNASSIGN: "UNASSIGN";
    readonly EXPORT: "EXPORT";
    readonly PAY: "PAY";
    readonly UNPAY: "UNPAY";
    readonly SWITCH: "SWITCH";
    readonly ARCHIVE: "ARCHIVE";
    readonly UNARCHIVE: "UNARCHIVE";
};
type TActionsEnum = (typeof ACTION_ENUM)[keyof typeof ACTION_ENUM];
declare const RESOURCES_ENUM: {
    readonly TUTORIAL: "TUTORIAL";
    readonly STUDENT: "STUDENT";
    readonly TEACHER: "TEACHER";
    readonly PARENT: "PARENT";
    readonly ADMIN: "ADMIN";
    readonly ROLE: "ROLE";
    readonly CLASSROOM: "CLASSROOM";
    readonly CLASS: "CLASS";
    readonly CLASS_TYPE: "CLASS_TYPE";
    readonly EXAM_TYPE: "EXAM_TYPE";
    readonly HOMEWORK: "HOMEWORK";
    readonly OBSERVATION_REASON: "OBSERVATION_REASON";
    readonly SESSION: "SESSION";
    readonly SESSION_TYPE: "SESSION_TYPE";
    readonly HOLIDAY: "HOLIDAY";
    readonly LEVEL: "LEVEL";
    readonly SECTION: "SECTION";
    readonly SUB_LEVEL: "SUB_LEVEL";
    readonly TERM: "TERM";
    readonly SUBJECT: "SUBJECT";
    readonly GROUP: "GROUP";
    readonly GROUP_TYPE: "GROUP_TYPE";
    readonly SUB_SUBJECT: "SUB_SUBJECT";
    readonly PASSWORD: "PASSWORD";
    readonly SERVICE: "SERVICE";
    readonly BANK_CHECK: "BANK_CHECK";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly PAYMENT_CONFIGURATION: "PAYMENT_CONFIGURATION";
    readonly PAYMENT_TEMPLATE: "PAYMENT_TEMPLATE";
    readonly INVOICE: "INVOICE";
    readonly TRANSACTION: "TRANSACTION";
    readonly FINANCE_DASHBOARD: "FINANCE_DASHBOARD";
    readonly EXPENSE: "EXPENSE";
    readonly TEACHER_PAYMENT_CONFIGURATION: "TEACHER_PAYMENT_CONFIGURATION";
    readonly SCHEDULE: "SCHEDULE";
    readonly TEACHER_PAYMENT: "TEACHER_PAYMENT";
    readonly EXAM_GRADE: "EXAM_GRADE";
    readonly OBSERVATION: "OBSERVATION";
    readonly PRE_REGISTRATION: "PRE_REGISTRATION";
    readonly SCHOOL_YEAR: "SCHOOL_YEAR";
    readonly ISSUE: "ISSUE";
    readonly SMART_CALENDAR: "SMART_CALENDAR";
    readonly ANNOUNCEMENT: "ANNOUNCEMENT";
    readonly SUPPLIER: "SUPPLIER";
    readonly DIPLOMA: "DIPLOMA";
    readonly NOTIFICATION: "NOTIFICATION";
    readonly MASTER: "MASTER";
    readonly SCHOOL: "SCHOOL";
    readonly FLAGS: "FLAGS";
    readonly APP_VERSION: "APP_VERSION";
    readonly ALERT: "ALERT";
    readonly SMS_HISTORY: "SMS_HISTORY";
    readonly LMS: "LMS";
    readonly SIGNATURE: "SIGNATURE";
};
type TResourcesEnum = (typeof RESOURCES_ENUM)[keyof typeof RESOURCES_ENUM];

type PickFromEnum<U, M extends U> = U extends M ? U : never;
type OmitFromEnum<U, M extends U> = U extends M ? never : U;

declare const END_USER_ENUM: {
    readonly ADMIN: "admin";
    readonly TEACHER: "teacher";
    readonly STUDENT: "student";
    readonly PARENT: "parent";
    readonly MASTER: "master";
};
declare const END_USER_WITHOUT_MASTER_ENUM: Pick<{
    readonly ADMIN: "admin";
    readonly TEACHER: "teacher";
    readonly STUDENT: "student";
    readonly PARENT: "parent";
    readonly MASTER: "master";
}, "STUDENT" | "TEACHER" | "PARENT" | "ADMIN">;
type TEndUserWithoutMasterEnums = (typeof END_USER_WITHOUT_MASTER_ENUM)[keyof typeof END_USER_WITHOUT_MASTER_ENUM];
type TEndUserEnum = (typeof END_USER_ENUM)[keyof typeof END_USER_ENUM];

type ID$1 = string & {
    _isID: true;
};
type BaseEntity = {
    _id: ID$1;
    newId: string;
    createdAt: string
    updatedAt: string
};

type TConversationNameUpdatedEventPayload = {
    conversationId: ID$1;
    conversationNewId: string;
    conversationName: string;
};

type UserProfileDTO = {
    _id: ID$1;
    newId: string;
    fullName: string;
    avatar: string;
    email: string | null;
    phoneNumber: string | null;
};

type ConversationDTO = {
    _id: ID$1;
    name: string | null;
    newId: string;
    participants: (UserProfileDTO & {
        userType: TEndUserEnum;
    })[];
    lastMessage: LastMessageDTO | null;
    isGroup: boolean;
    isSeen: boolean;
};
type LastMessageDTO = {
    _id: ID$1;
    newId: string;
    senderId: ID$1 | null;
    senderName: string | null;
    content: string | null;
    sentAt: string| null;
    files: ID$1[];
    media: ID$1[];
    type: "attachment" | "content";
    seenBy: (UserProfileDTO & {
        userType: TEndUserEnum;
        seenAt: string
    })[];
    isDeleted: boolean;
};

declare const SESSION_STATUS_ENUM: {
    readonly WAITING: "waiting";
    readonly IN_PROGRESS: "inProgress";
    readonly COMPLETED: "completed";
    readonly CANCELED: "canceled";
};
type TSessionStatusEnum = (typeof SESSION_STATUS_ENUM)[keyof typeof SESSION_STATUS_ENUM];
declare const ATTENDANCE_ENUM: {
    readonly EXPELLED: "expelled";
    readonly PRESENT: "present";
    readonly LATE: "late";
    readonly ABSENT: "absent";
};
type TAttendanceEnum = (typeof ATTENDANCE_ENUM)[keyof typeof ATTENDANCE_ENUM];

declare const LANGUAGE_ENUM: {
    readonly ARABIC: "ar";
    readonly ENGLISH: "en";
    readonly FRENCH: "fr";
};
type TLanguageEnum = (typeof LANGUAGE_ENUM)[keyof typeof LANGUAGE_ENUM];

type SessionType = {
    name: string;
} & BaseEntity;

type SubjectType = {
    name: string;
    preferredStartingHours: number[];
    illustration: string;
} & BaseEntity;

type Term = {
    name: string;
    coefficient: number;
} & BaseEntity;

type SchoolYear = {
    name: string;
    startDate: string
    endDate: string
    terms: (Term & {
        startDate: string
        endDate: string
    })[];
    level: ID$1;
} & BaseEntity;

declare const EXAM_GRADE_SYSTEM_ENUM: {
    readonly PRIMARY: "PRIMARY";
    readonly SECONDARY: "SECONDARY";
    readonly AUTOMATIC_PROMOTION: "AUTOMATIC_PROMOTION";
};
type TExamGradeSystemEnum = (typeof EXAM_GRADE_SYSTEM_ENUM)[keyof typeof EXAM_GRADE_SYSTEM_ENUM];
declare const ESTABLISHMENT_TITLE_ENUM: {
    readonly PRIVATE_PRIMARY: "PRIVATE_PRIMARY";
    readonly PRIVATE_SECONDARY: "PRIVATE_SECONDARY";
    readonly PRIVATE_MIDDLE: "PRIVATE_MIDDLE";
};
type TEstablishmentTitleEnum = (typeof ESTABLISHMENT_TITLE_ENUM)[keyof typeof ESTABLISHMENT_TITLE_ENUM];
type Level = {
    name: string;
    currentSchoolYear: SchoolYear;
    rank: number;
    color: string;
    establishmentTitle: TEstablishmentTitleEnum | null;
    examGradeSystem: TExamGradeSystemEnum | null;
} & BaseEntity;

type SubLevel = {
    name: string;
    hasSections: boolean;
    level: Level;
    rank: number;
} & BaseEntity;

type Section = {
    name: string;
    subLevels: ID$1[];
} & BaseEntity;

type SubSubjectOfClassType = {
    subSubjectType: ID$1;
    coefficient: number;
    exams: {
        examType: ID$1;
        coefficient: number;
    }[];
};
type SubjectOfClassType = {
    subjectType: ID$1;
    subSubjects: SubSubjectOfClassType[];
    coefficient: number;
    exams: {
        examType: ID$1;
        coefficient: number;
    }[];
};
type TActivityOfClassType = {
    durationInMinutes: number;
    sessionType: ID$1;
    week: "A" | "B" | null;
    perGroup: boolean;
    subjectType: ID$1;
    subSubjectType: ID$1 | null;
};
type ClassType = ({
    nextClassTypes: ID$1[];
    isTerminal: false;
} | {
    nextClassTypes: null;
    isTerminal: true;
}) & {
    name: string;
    subLevel: ID$1;
    section: ID$1 | null;
    subjects: SubjectOfClassType[];
    fields: {
        _id: ID$1;
        name: string;
        subjects: ID$1[];
        coefficient: number;
    }[];
    capacity: number;
    activities: TActivityOfClassType[];
    maxGapsPerWeekInMinutes: number | null;
} & BaseEntity;

declare const HOMEWORK_STATUS_ENUM: {
    readonly TODO: "to do";
    readonly DONE: "done";
};
type THomeworkStatusEnum = (typeof HOMEWORK_STATUS_ENUM)[keyof typeof HOMEWORK_STATUS_ENUM];

type IFile = {
    public_id: string;
    name: string;
    url: string;
    date: string
    size: number | null;
    mimeType: string;
};
declare const SESSION_WEEK_ENUM: {
    readonly A: "A";
    readonly B: "B";
};
type TSessionWeekEnum = (typeof SESSION_WEEK_ENUM)[keyof typeof SESSION_WEEK_ENUM];

declare const FEATURE_FLAGS_ENUM: {
    readonly MESSAGES: "messages";
    readonly ANNOUNCEMENTS: "announcements";
    readonly SMART_CALENDAR: "smartCalendar";
    readonly TUTORIALS: "tutorials";
    readonly DARK_MODE: "darkMode";
    readonly LMS: "lms";
};
type TFeatureFlagsEnum = (typeof FEATURE_FLAGS_ENUM)[keyof typeof FEATURE_FLAGS_ENUM];

declare const EDUCATION_DEPARTMENT_ENUM: {
    readonly ARIANA: "أريانة";
    readonly BEJA: "باجة";
    readonly BEN_AROUS: "بن عروس";
    readonly BIZERTE: "بنزرت";
    readonly GABES: "قابس";
    readonly GAFSA: "قفصة";
    readonly JENDOUBA: "جندوبة";
    readonly KAIROUAN: "القيروان";
    readonly KASSERINE: "القصرين";
    readonly KEBILI: "قبلي";
    readonly KEF: "الكاف";
    readonly MAHDIA: "المهدية";
    readonly MANOUBA: "منوبة";
    readonly MEDENINE: "مدنين";
    readonly MONASTIR: "المنستير";
    readonly NABEUL: "نابل";
    readonly SFAX: "صفاقس";
    readonly SIDI_BOUZID: "سيدي بوزيد";
    readonly SILIANA: "سليانة";
    readonly SOUSSE: "سوسة";
    readonly TATAOUINE: "تطاوين";
    readonly TOZEUR: "توزر";
    readonly TUNIS: "تونس";
    readonly ZAGHOUAN: "زغوان";
};
type TEducationDepartmentEnum = (typeof EDUCATION_DEPARTMENT_ENUM)[keyof typeof EDUCATION_DEPARTMENT_ENUM];
declare const INSTANCE_TYPE_ENUM: {
    readonly TUNISIAN: "TUNISIAN";
    readonly CAMBRIDGE: "CAMBRIDGE";
    readonly IB: "IB";
};
type TInstanceTypeEnum = (typeof INSTANCE_TYPE_ENUM)[keyof typeof INSTANCE_TYPE_ENUM];
declare const GRADE_REPORT_THEM_ENUM: {
    readonly YELLOW: "yellow";
    readonly BLUE: "blue";
};
type TGradeReportThemEnum = (typeof GRADE_REPORT_THEM_ENUM)[keyof typeof GRADE_REPORT_THEM_ENUM];

declare const PROMOTION_STATUS_ENUM: {
    readonly PROMOTED: "PROMOTED";
    readonly NOT_PROMOTED: "NOT_PROMOTED";
    readonly EXCEPTIONALLY_PROMOTED: "EXCEPTIONALLY_PROMOTED";
};
type TPromotionStatusEnum = (typeof PROMOTION_STATUS_ENUM)[keyof typeof PROMOTION_STATUS_ENUM];
declare const TOPIC_TYPE_ENUM: {
    readonly SUBJECT_TYPE: "subjectType";
    readonly SUB_SUBJECT_TYPE: "subSubjectType";
    readonly GROUP: "group";
    readonly FIELD: "field";
};
type TTopicTypeEnum = (typeof TOPIC_TYPE_ENUM)[keyof typeof TOPIC_TYPE_ENUM];

declare const CHAPTER_ATTACHMENT_STATUS_ENUM: {
    readonly USED: "used";
    readonly UNUSED: "unused";
};
type TChapterAttachmentStatusEnum = (typeof CHAPTER_ATTACHMENT_STATUS_ENUM)[keyof typeof CHAPTER_ATTACHMENT_STATUS_ENUM];
declare const CHAPTER_ATTACHMENT_FILE_TYPE_ENUM: {
    readonly VIDEO: "video";
    readonly DOCUMENT: "document";
};
type TChapterAttachmentFileTypeEnum = (typeof CHAPTER_ATTACHMENT_FILE_TYPE_ENUM)[keyof typeof CHAPTER_ATTACHMENT_FILE_TYPE_ENUM];
type ChapterAttachmentFile = FileDetails & {
    attachmentType: TChapterAttachmentFileTypeEnum;
    durationInSeconds: number | null;
};

declare const SMART_CALENDAR_SCHEDULE_STATUS_ENUM: {
    readonly COMPLETED: "COMPLETED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly CANCELLED: "CANCELLED";
    readonly ERROR: "ERROR";
};
type TSmartCalendarScheduleStatusEnum = (typeof SMART_CALENDAR_SCHEDULE_STATUS_ENUM)[keyof typeof SMART_CALENDAR_SCHEDULE_STATUS_ENUM];

declare const PAYMENT_TYPE_ENUM: {
    readonly HOURLY: "hourly";
    readonly SALARY: "salary";
};
type TPaymentTypeEnum = (typeof PAYMENT_TYPE_ENUM)[keyof typeof PAYMENT_TYPE_ENUM];
declare const TRANSACTION_ADJUSTMENT_TYPE_ENUM: {
    readonly PENALTY: "penalty";
    readonly BONUS: "bonus";
};
type TTransactionAdjustmentTypeEnum = (typeof TRANSACTION_ADJUSTMENT_TYPE_ENUM)[keyof typeof TRANSACTION_ADJUSTMENT_TYPE_ENUM];

declare const BANK_CHECK_STATUS_ENUM: {
    readonly NOT_USED: "not used";
    readonly USED: "used";
    readonly REJECTED: "rejected";
    readonly RETURNED: "returned";
};
type TBankCheckStatus = (typeof BANK_CHECK_STATUS_ENUM)[keyof typeof BANK_CHECK_STATUS_ENUM];
type BankCheck = {
    fullName: string;
    checkNumber: string;
    phoneNumber: string | null;
    bankName: string;
    amount: number;
    withdrawDate: string| null;
    status: TBankCheckStatus;
    invoice: ID$1;
} & BaseEntity;

declare const INVOICE_TYPE_ENUM: {
    readonly MONTHLY: "monthly";
    readonly ONE_TIME: "oneTime";
    readonly EXTRA: "extra";
};
type TInvoiceTypeEnum = (typeof INVOICE_TYPE_ENUM)[keyof typeof INVOICE_TYPE_ENUM];
declare const INVOICE_STATUS_ENUM: {
    readonly PAID: "paid";
    readonly UNPAID: "unpaid";
    readonly OVERDUE: "overdue";
    readonly PARTIALLY_PAID: "partiallyPaid";
};
type TInvoiceStatusEnum = (typeof INVOICE_STATUS_ENUM)[keyof typeof INVOICE_STATUS_ENUM];
type TSplitsStatusEnum = (typeof INVOICE_STATUS_ENUM)[keyof typeof INVOICE_STATUS_ENUM];
declare const PAYMENT_METHODS_ENUM: {
    readonly CASH: "cash";
    readonly BANK_CHECK: "bankCheck";
    readonly BANK_TRANSFER: "bankTransfer";
};
type TPaymentMethodsEnum = (typeof PAYMENT_METHODS_ENUM)[keyof typeof PAYMENT_METHODS_ENUM];

type BankTransfer = {
    fullName: string;
    amount: number;
    bankName: string | null;
    transferDate: string
    transactionReference: string | null;
    invoice: ID$1;
    isDeleted: boolean;
} & BaseEntity;

type FileDTO = {
    path: string;
    name: string;
    mimetype: string;
    sizeInByte: number;
    url: string;
    uploadedAt: string
};

declare const ISSUE_ACTION_ENUM: {
    readonly ADD: "add";
    readonly REMOVE: "remove";
};
type TIssueActionEnum = (typeof ISSUE_ACTION_ENUM)[keyof typeof ISSUE_ACTION_ENUM];
declare const INTERACTION_TYPE_ENUM: {
    readonly ACTION: "action";
    readonly REPLY: "reply";
};
type TInteractionTypeEnum = (typeof INTERACTION_TYPE_ENUM)[keyof typeof INTERACTION_TYPE_ENUM];
type InteractionDTO = {
    _id: ID$1;
    newId: string;
    type: TInteractionTypeEnum;
    action: TIssueActionEnum | null;
    actor: UserProfileDTO | null;
    target: UserProfileDTO | null;
    content: {
        text?: string;
        documents: FileDTO[];
        media: FileDTO[];
    } | null;
    sender: UserProfileDTO | null;
    sentAt: string
};

type IssueReason = {
    name: string;
    color: string;
    iconUrl: string;
} & BaseEntity;

declare const ISSUE_STATUS_ENUM: {
    readonly RESOLVED: "resolved";
    readonly UNRESOLVED: "unresolved";
};
type TIssuesStatusEnum = (typeof ISSUE_STATUS_ENUM)[keyof typeof ISSUE_STATUS_ENUM];

declare const CATEGORIES_ENUM: {
    readonly general: "general";
    readonly academic: "academic";
    readonly activity: "activity";
    readonly administration: "administration";
    readonly alert: "alert";
};
type TCategoriesEnum = (typeof CATEGORIES_ENUM)[keyof typeof CATEGORIES_ENUM];

declare const REACTION_TYPE_ENUM: {
    readonly LIKE: "like";
    readonly care: "care";
    readonly LOVE: "love";
    readonly LAUGH: "laugh";
    readonly ANGRY: "angry";
    readonly SAD: "sad";
    readonly SURPRISED: "surprised";
};
type TReactionTypeEnum = (typeof REACTION_TYPE_ENUM)[keyof typeof REACTION_TYPE_ENUM];

declare const TEMPLATE_ENUM: {
    readonly GREEN: "green";
    readonly GOLD: "gold";
    readonly BLUE: "blue";
    readonly RED: "red";
    readonly PURPLE: "purple";
};
type TTemplateEnum = (typeof TEMPLATE_ENUM)[keyof typeof TEMPLATE_ENUM];
type Diploma = {
    name: string;
    minAverage: number;
    maxAverage: number;
    template: TTemplateEnum;
} & BaseEntity;

declare const OBSERVATION_URGENCY_ENUM: {
    readonly HIGH: "high";
    readonly MEDIUM: "medium";
    readonly LOW: "low";
};
type TObservationUrgencyEnum = (typeof OBSERVATION_URGENCY_ENUM)[keyof typeof OBSERVATION_URGENCY_ENUM];

declare const NOTIFICATION_TYPES_ENUM: {
    readonly OBSERVATIONS: "observations";
    readonly STUDENT_HOMEWORK: "student_homework";
    readonly PARENT_HOMEWORK: "parent_homework";
    readonly SCHEDULE: "schedule";
    readonly ATTENDANCE: "attendance";
    readonly PAYMENT: "payment";
    readonly SESSION_NOTES: "session_notes";
    readonly ALERT: "alert";
    readonly ATTENDANCE_ABSENT: "attendance_absent";
    readonly ATTENDANCE_LATE: "attendance_late";
    readonly ATTENDANCE_EXPELLED: "attendance_expelled";
    readonly TEACHER_SESSION_CANCELED: "teacher_session_canceled";
    readonly PARENT_SESSION_CANCELED: "parent_session_canceled";
    readonly STUDENT_SESSION_CANCELED: "student_session_canceled";
    readonly NEW_POST_ADDED: "new_post_added";
    readonly NEW_POST_REACTION: "new_post_reaction";
    readonly NEW_COMMENT_ON_POST: "new_comment_on_post";
    readonly NEW_COMMENT_REACTION: "new_comment_reaction";
    readonly NEW_COMMENT_REPLY: "new_comment_reply";
    readonly MENTION_IN_COMMENT: "mention_in_comment";
    readonly NEW_MESSAGE_RECEIVED: "new_message_received";
    readonly NEW_REACTION_ON_MESSAGE: "new_reaction_on_message";
    readonly FULL_INVOICE_PAYMENT_SUCCESS: "full_invoice_payment_success";
    readonly INVOICE_SPLIT_PAYMENT_SUCCESS: "invoice_split_payment_success";
};
type TNotificationTypesEnum = (typeof NOTIFICATION_TYPES_ENUM)[keyof typeof NOTIFICATION_TYPES_ENUM];

type CheckNotificationEnumsMapped<T extends {
    [K in TNotificationTypesEnum]: {
        topic: K;
    };
}> = T[TNotificationTypesEnum];
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
    details: null;
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
        previousReactionsCount: number;
    };
};
type newCommentOnPost = {
    topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_ON_POST;
    details: {
        postNewId: string;
        commentNewId: string;
        previousCommentsCount: number;
    };
};
type newCommentReaction = {
    topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REACTION;
    details: {
        postNewId: string;
        commentNewId: string;
        previousCommentReactionsCount: number;
    };
};
type newCommentReply = {
    topic: typeof NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REPLY;
    details: {
        postNewId: string;
        commentNewId: string;
        previousCommentRepliesCount: number;
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
        paidAt: string
        remainingAmount: number;
        invoiceNewId: string;
    };
};
type InvoiceSplitPaymentSuccess = {
    topic: typeof NOTIFICATION_TYPES_ENUM.INVOICE_SPLIT_PAYMENT_SUCCESS;
    details: {
        amountPaid: number;
        paidAt: string
        remainingAmount: number;
        invoiceNewId: string;
    };
};
type notificationTopicMap = {
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
type notificationTopicWithDetails = CheckNotificationEnumsMapped<notificationTopicMap>;
type IBaseNotification = {
    userId: string;
    userType: TEndUserEnum;
    message: string;
    status: string;
    date: string
    link?: string;
    dynamicFieldValues: {
        [key: string]: string;
    };
} & notificationTopicWithDetails;
type Notification = IBaseNotification & BaseEntity & {
    broadcastId: string;
};

declare const REGISTRATION_STEP_ENUM: {
    readonly PARENT_INFORMATION: "parentInformation";
    readonly STUDENT_INFORMATION: "studentInformation";
    readonly ENROLLMENT_DETAILS: "enrollmentDetails";
    readonly FILES: "files";
    readonly OTHER_INFORMATION: "otherInformation";
};
type TRegistrationStepEnum = (typeof REGISTRATION_STEP_ENUM)[keyof typeof REGISTRATION_STEP_ENUM];
declare const PRE_REGISTRATION_STATUES_ENUM: {
    readonly APPROVED: "approved";
    readonly PENDING: "pending";
    readonly REJECTED: "rejected";
};
type TPreRegistrationStatuesEnum = (typeof PRE_REGISTRATION_STATUES_ENUM)[keyof typeof PRE_REGISTRATION_STATUES_ENUM];

type PaymentTemplate = {
    name: string;
    services: {
        _id: ID$1;
        name: string;
        amount: number;
        newId: string;
        discount: number;
    }[];
    discount: number;
    totalAmount: number;
} & BaseEntity;

type Expense = {
    name: string;
    description: string | null;
    amount: number | null;
} & BaseEntity;

type Supplier = {
    fiscalCode: string | null;
    expenses: ID$1[];
    name: string;
} & BaseEntity;

declare const TRANSACTION_TYPE_ENUM: {
    readonly EXPENSE: "expense";
    readonly SERVICE: "service";
};
type TTransactionTypeEnum = (typeof TRANSACTION_TYPE_ENUM)[keyof typeof TRANSACTION_TYPE_ENUM];

declare const SERVICE_TYPE_ENUM: {
    readonly MONTHLY: "monthly";
    readonly ONE_TIME: "oneTime";
    readonly EXTRA: "extra";
};
type TServiceTypeEnum = (typeof SERVICE_TYPE_ENUM)[keyof typeof SERVICE_TYPE_ENUM];
type BaseService = {
    name: string;
    description?: string | null;
    showByDefault: boolean;
} & BaseEntity;
type MonthlyOrOneTimeService = {
    invoiceType: OmitFromEnum<TServiceTypeEnum, typeof SERVICE_TYPE_ENUM.EXTRA>;
    amount: number;
} & BaseService;
type ExtraService = {
    invoiceType: PickFromEnum<TServiceTypeEnum, typeof SERVICE_TYPE_ENUM.EXTRA>;
    amount: number | null;
} & BaseService;
type Service = MonthlyOrOneTimeService | ExtraService;

type FileDetails = {
    name: string;
    link: string;
    path: string;
    uploadedAt: string
    size: number | null;
    mimeType: string;
};

declare const CONVERSATION_ROLE: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
type TConversationRoleEnums = (typeof CONVERSATION_ROLE)[keyof typeof CONVERSATION_ROLE];

declare const MESSAGE_REACTION_ENUM: {
    readonly LIKE: "like";
    readonly care: "care";
    readonly LOVE: "love";
    readonly LAUGH: "laugh";
    readonly ANGRY: "angry";
    readonly SAD: "sad";
    readonly SURPRISED: "surprised";
};
type TMessageReactionTypeEnum = (typeof MESSAGE_REACTION_ENUM)[keyof typeof MESSAGE_REACTION_ENUM];

type MessageDTO = {
    _id: ID$1;
    newId: string;
    sender: (UserProfileDTO & {
        userType: TEndUserEnum;
    }) | null;
    content: string | null;
    files: FileDTO[];
    media: FileDTO[];
    links: string[];
    isReply: boolean;
    replyTo: ReplyDTO$1 | null;
    reactions: ReactionSummaryDTO[];
    conversationId: ID$1;
    seenBy: (UserProfileDTO & {
        userType: TEndUserEnum;
        seenAt: string
    })[];
    isDeleted: boolean;
};
type MessageAttachmentDTO = {
    _id: ID$1;
    newId: string;
    url: string;
    public_id: string;
    sizeInByte: number;
    mimetype: string;
    name: string;
    uploadedAt: string
    type: "file" | "media";
    messageId: ID$1;
    messageNewId: string;
    conversationId: ID$1;
    conversationNewId: string;
};
type MessageLinkDTO = {
    _id: ID$1;
    newId: string;
    links: string[];
    messageId: ID$1;
    messageNewId: string;
    conversationId: ID$1;
    conversationNewId: string;
};
type ReplyDTO$1 = {
    _id: ID$1;
    newId: string;
    content: string | null;
    files: FileDTO[];
    media: FileDTO[];
    links: string[];
    sender: {
        _id: ID$1;
        newId: string;
        fullName: string;
    } | null;
    isDeleted: boolean;
};
type ReactionSummaryDTO = {
    reactionType: TMessageReactionTypeEnum;
    userId: ID$1;
};

type TNewSeenEventPayload = {
    conversation: ConversationDTO;
    message: MessageDTO;
    userId: ID$1;
    avatar: string;
};

type TNewReactionEventPayload = {
    messageId: ID$1;
    reactions: {
        reactionType: TMessageReactionTypeEnum | null;
        userId: ID$1;
    }[];
};

type TNewMessageEventPayload = {
    message: MessageDTO;
    conversation: ConversationDTO;
};

type ReactionSummary = {
    topReactions: TReactionTypeEnum[];
    totalReactionNumber: number;
};

type TReactOnCommentAddedPayload = {
    postId: string;
    postNewId: string;
    commentId: string;
    commentNewId: string;
    parentCommentId: string | null;
    parentCommentNewId: string | null;
    reacts: ReactionSummary;
    userReaction: TReactionTypeEnum | null;
    userNewId: string;
    userType: TEndUserEnum;
};

type ReplyDTO = {
    _id: ID$1;
    newId: string;
    parentCommentNewId: string;
    parentCommentId: ID$1 | null;
    content: string | null;
    attachments: IFile[];
    media: IFile[];
    reactionSummary: ReactionSummary;
    user: UserProfileDTO & {
        type: TEndUserEnum;
    };
    userReaction: TReactionTypeEnum | null;
    publishedAt: string
};

type TReplyOnCommentAddedPayload = ReplyDTO & {
    parentCommentNewId: string;
};

type CommentDTO = {
    _id: ID$1;
    newId: string;
    content: string | null;
    attachments: IFile[];
    media: IFile[];
    repliesCount: number;
    replies: ReplyDTO[];
    reactionSummary: ReactionSummary;
    user: UserProfileDTO & {
        type: TEndUserEnum;
    };
    userReaction: TReactionTypeEnum | null;
    publishedAt: string
    postId: ID$1;
};

type TNewCommentOnPostAddedPayload = {
    postId: ID$1;
    comment: CommentDTO;
};

type TPostReactionUpdatedEventPayload = {
    postId: ID$1;
    postNewId: string;
    reactionSummary: ReactionSummary;
    userReaction: TReactionTypeEnum | null | undefined;
    userNewId: string;
    userType: TEndUserEnum;
};

type EntityDto = {
    _id: ID$1;
    name: string;
    newId: string;
};

declare const POST_POLICY_ENUM: {
    readonly ALL: "all";
    readonly CUSTOM: "custom";
};
type TPostPolicyEnum = (typeof POST_POLICY_ENUM)[keyof typeof POST_POLICY_ENUM];
type PostDTO = {
    _id: ID$1;
    newId: string;
    publisher: UserProfileDTO | null;
    publishedAt: string
    content: string | null;
    userTypes: TEndUserWithoutMasterEnums[];
    audience: string;
    isPublic: boolean;
    schoolName: string;
    schoolLogo: string | null;
    attachments: IFile[];
    media: IFile[];
    reactionSummary: ReactionSummary;
    userReaction: TReactionTypeEnum | null;
    category: TCategoriesEnum | null;
    comments: CommentDTO[];
    commentsCount: number;
    isCommentsAllowed: boolean;
    isPinned: boolean;
    pinnedAt: string| null;
    policy: TPostPolicyEnum;
    levels: EntityDto[] | null;
    classes: EntityDto[] | null;
    groups: EntityDto[] | null;
    hashTags: string[];
};

type TPostAddedEventPayload = PostDTO;

type IssueReasonDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    color: string;
    iconUrl: string;
};

type IssueDTO = {
    _id: ID$1;
    newId: string;
    author: UserProfileDTO;
    content: {
        text: string;
        documents: FileDTO[];
        media: FileDTO[];
    };
    lastSender: UserProfileDTO;
    reason: IssueReasonDTO;
    teacher: UserProfileDTO | null;
    isForwarded: boolean;
    lastInteraction: InteractionDTO | null;
    targetType: PickFromEnum<TEndUserEnum, "teacher" | "admin">;
    status: TIssuesStatusEnum;
    sentAt: string
    isSeen: boolean;
    className: string | null;
    student: UserProfileDTO | null;
};

type TIssueActionPayload = IssueDTO;

type TSendReplyEventPayload = {
    issueId: ID$1;
    issueNewId: string;
    interaction: InteractionDTO;
};

type TIssueCreatedEventPayload = IssueDTO;

type TDeletedMessageEventPayload = {
    messageNewId: string;
    messageId: ID$1;
    conversationNewId: string;
    conversationId: ID$1;
};

type EventResponseMapping = {
    ISSUE_ADDED_EVENT: TIssueCreatedEventPayload;
    REPLY_SENT_EVENT: TSendReplyEventPayload;
    ISSUE_ACTION: TIssueActionPayload;
    NEW_POST_ADDED: TPostAddedEventPayload;
    NEW_REACTION_ON_POST_ADDED: TPostReactionUpdatedEventPayload;
    NEW_COMMENT_ON_POST_ADDED: TNewCommentOnPostAddedPayload;
    NEW_REPLY_ON_COMMENT_ADDED: TReplyOnCommentAddedPayload;
    NEW_REACTION_ON_COMMENT_ADDED: TReactOnCommentAddedPayload;
    NEW_MESSAGE_ADDED: TNewMessageEventPayload;
    NEW_REACTION_ON_MESSAGE_ADDED: TNewReactionEventPayload;
    NEW_SEEN_ADDED: TNewSeenEventPayload;
    DELETED_MESSAGE: TDeletedMessageEventPayload;
    CONVERSATION_NAME_UPDATED: TConversationNameUpdatedEventPayload;
};

declare const ALERT_STATUS_ENUM: {
    readonly DRAFT: "draft";
    readonly SENT: "sent";
    readonly SCHEDULED: "scheduled";
};
type TAlertStatusEnum = (typeof ALERT_STATUS_ENUM)[keyof typeof ALERT_STATUS_ENUM];

declare const ALERT_TYPE_ENUM: {
    readonly sms: "sms";
    readonly notification: "notification";
};
type TAlertTypeEnum = (typeof ALERT_TYPE_ENUM)[keyof typeof ALERT_TYPE_ENUM];

type PaginationMeta = {
    limit: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    hasMore: boolean;
    totalDocs: number;
    totalPages: number | null;
    page: number | null;
    nextPage: number | null;
    prevPage: number | null;
};
type ResponseWithPagination<T> = {
    docs: T[];
    meta: PaginationMeta;
};

declare const startConversationRules: Record<TEndUserEnum, TEndUserEnum[]>;

interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
type FilesInRequest<UploadFields extends string> = {
    [Field in UploadFields]?: File[];
} | undefined;

declare const body$2P: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    roles: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}>, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}>;
type TBody$2P = z.infer<typeof body$2P>;
type AddAdminValidation = {
    body: TBody$2P;
    params: never;
    query: never;
};

type AddAdminRouteConfig = AddAdminValidation & {
    files: FilesInRequest<"avatar">;
};
type AddAdminResponse = void;

type APIResponse<T> = {
    status: string;
    message: string;
    data: T;
};

declare const addAdminByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddAdminByAdminRouteTypes = AddAdminRouteConfig & {
    response: APIResponse<AddAdminResponse>;
};

type AdminDTO = {
    _id: string;
    newId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    email: string | null;
    phoneNumber: string | null;
    address1: string | null;
    address2: string | null;
    avatar: string;
    birthDate: string| null;
    roles: {
        _id: string;
        newId: string;
        name: string;
    }[];
    isArchived: boolean;
    isActive: boolean;
};

declare const params$4u: z.ZodObject<{
    adminNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adminNewId: string;
}, {
    adminNewId: string;
}>;
type TParams$4u = z.infer<typeof params$4u>;
type GetAdminByNewIdValidation = {
    body: never;
    params: TParams$4u;
    query: never;
};

type GetAdminByNewIdRouteConfig = GetAdminByNewIdValidation & {
    files: never;
};
type GetAdminByNewIdResponse = AdminDTO;

declare const getAdminByNewIdByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAdminByNewIdByAdminRouteTypes = GetAdminByNewIdRouteConfig & {
    response: APIResponse<GetAdminByNewIdResponse>;
};

declare const query$2t: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2s = z.infer<typeof query$2t>;
type ListAdminsValidation = {
    body: never;
    params: never;
    query: TQuery$2s;
};

type ListAdminsRouteConfig = ListAdminsValidation & {
    files: never;
};
type ListAdminsResponse = ResponseWithPagination<AdminDTO>;

declare const listAdminsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListAdminsByAdminRouteTypes = ListAdminsRouteConfig & {
    response: APIResponse<ListAdminsResponse>;
};

declare const body$2O: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodNullable<z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    roles: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string| undefined;
    email?: string | null | undefined;
    roles?: ID$1[] | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string | string| undefined;
    email?: string | null | undefined;
    roles?: ID$1[] | undefined;
}>;
type TBody$2O = z.infer<typeof body$2O>;
declare const params$4t: z.ZodObject<{
    adminNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adminNewId: string;
}, {
    adminNewId: string;
}>;
type TParams$4t = z.infer<typeof params$4t>;
type UpdateAdminValidation = {
    body: TBody$2O;
    params: TParams$4t;
    query: never;
};

type UpdateAdminRouteConfig = UpdateAdminValidation & {
    files: FilesInRequest<"avatar">;
};
type UpdateAdminResponse = void;

declare const updateAdminByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateAdminByAdminRouteTypes = UpdateAdminRouteConfig & {
    response: APIResponse<UpdateAdminResponse>;
};

declare const body$2N: z.ZodObject<{
    types: z.ZodEffects<z.ZodObject<{
        sms: z.ZodBoolean;
        notification: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        notification: boolean;
        sms: boolean;
    }, {
        notification: boolean;
        sms: boolean;
    }>, {
        notification: boolean;
        sms: boolean;
    }, {
        notification: boolean;
        sms: boolean;
    }>;
    content: z.ZodString;
    isDraft: z.ZodBoolean;
    scheduledAt: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    users: z.ZodEffects<z.ZodArray<z.ZodObject<{
        userType: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
        userId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    }, "strip", z.ZodTypeAny, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }>, "many">, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[], {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[]>;
}, "strip", z.ZodTypeAny, {
    content: string;
    users: {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[];
    isDraft: boolean;
    types: {
        notification: boolean;
        sms: boolean;
    };
    scheduledAt?: string| undefined;
}, {
    content: string;
    users: {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[];
    isDraft: boolean;
    types: {
        notification: boolean;
        sms: boolean;
    };
    scheduledAt?: string | string| undefined;
}>;
type TBody$2N = z.infer<typeof body$2N>;
type AddAlertValidation = {
    body: TBody$2N;
    params: never;
    query: never;
};

type AddAlertRouteConfig = AddAlertValidation & {
    files: never;
};
type AddAlertResponse = void;

declare const addAlertByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddAlertByAdminRouteTypes = AddAlertRouteConfig & {
    response: APIResponse<AddAlertResponse>;
};

declare const params$4s: z.ZodObject<{
    alertNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    alertNewId: string;
}, {
    alertNewId: string;
}>;
type TParams$4s = z.infer<typeof params$4s>;
type DeleteAlertValidation = {
    body: never;
    params: TParams$4s;
    query: never;
};

type DeleteAlertRouteConfig = DeleteAlertValidation & {
    files: never;
};
type DeleteAlertResponse = void;

declare const deleteAlertByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteAlertByAdminRouteTypes = DeleteAlertRouteConfig & {
    response: APIResponse<DeleteAlertResponse>;
};

type AlertDto = {
    _id: ID$1;
    newId: string;
    content: string;
    totalAlertSent: number;
    status: TAlertStatusEnum;
    createdBy: UserProfileDTO;
    sentAt: string| null;
    createdAt: string
};
type AlertDetails = {
    _id: ID$1;
    newId: string;
    sentAt: string| null;
    createdAt: string
    createdBy: UserProfileDTO;
    status: TAlertStatusEnum;
    types: {
        sms: boolean;
        notification: boolean;
    };
    content: string;
    users: {
        _id: ID$1;
        newId: string;
        phoneNumber: string | null;
        fullName: string;
        avatar: string;
    }[];
};
type SmsSoldHistoryResponseDto = {
    _id: ID$1;
    master: UserProfileDTO;
    smsCount: number;
    operation: "plus" | "minus";
    operationIssuedAt: string
};

declare const params$4r: z.ZodObject<{
    alertNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    alertNewId: string;
}, {
    alertNewId: string;
}>;
type TParams$4r = z.infer<typeof params$4r>;
type GetAlertDetailsValidation = {
    body: never;
    params: TParams$4r;
    query: never;
};

type GetAlertDetailsRouteConfig = GetAlertDetailsValidation & {
    files: never;
};
type GetAlertDetailsResponse = AlertDetails;

declare const getAlertDetailsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAlertDetailsByAdminRouteTypes = GetAlertDetailsRouteConfig & {
    response: APIResponse<GetAlertDetailsResponse>;
};

type GetAlertStatisticsValidation = {
    body: never;
    params: never;
    query: never;
};

type GetAlertStatisticsRouteConfig = GetAlertStatisticsValidation & {
    files: never;
};
type GetAlertStatisticsResponse = {
    totalSms: number;
    totalNotifications: number;
    remainingSmsSold: number;
    smsSentCount: number;
    notificationSentCount: number;
    smsDraftedCount: number;
    notificationDraftedCount: number;
    smsScheduledCount: number;
    notificationScheduledCount: number;
};

declare const getAlertStatisticsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetAlertStatisticsByAdminRouteTypes = GetAlertStatisticsRouteConfig & {
    response: APIResponse<GetAlertStatisticsResponse>;
};

declare const query$2s: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2r = z.infer<typeof query$2s>;
type ListAlertsValidation = {
    body: never;
    params: never;
    query: TQuery$2r;
};

type ListAlertsRouteConfig = ListAlertsValidation & {
    files: never;
};
type ListAlertsResponse = ResponseWithPagination<AlertDto>;

declare const listAlertsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListAlertsByAdminRouteTypes = ListAlertsRouteConfig & {
    response: APIResponse<ListAlertsResponse>;
};

declare const query$2r: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    levels: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    groups: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    userTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }>, "many">>;
    classes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    levels?: ID$1[] | undefined;
    classTypes?: ID$1[] | undefined;
    groups?: ID$1[] | undefined;
    userTypes?: ("admin" | "teacher" | "student" | "parent" | "master")[] | undefined;
    classes?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    levels?: ID$1[] | undefined;
    classTypes?: ID$1[] | undefined;
    groups?: ID$1[] | undefined;
    userTypes?: ("admin" | "teacher" | "student" | "parent" | "master")[] | undefined;
    classes?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2q = z.infer<typeof query$2r>;
type ListUsersForAlertValidation = {
    body: never;
    params: never;
    query: TQuery$2q;
};

type ListUsersForAlertRouteConfig = ListUsersForAlertValidation & {
    files: never;
};
type ListUsersForAlertResponse = ResponseWithPagination<{
    fullName: string;
    phoneNumber: string | null;
    _id: string;
    avatar: string;
    userType: TEndUserEnum;
}>;

declare const listUsersForAlertByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListUsersForAlertByAdminRouteTypes = ListUsersForAlertRouteConfig & {
    response: APIResponse<ListUsersForAlertResponse>;
};

declare const body$2M: z.ZodObject<{
    isDraft: z.ZodOptional<z.ZodBoolean>;
    scheduledAt: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    content: z.ZodString;
    types: z.ZodOptional<z.ZodObject<{
        sms: z.ZodBoolean;
        notification: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        notification: boolean;
        sms: boolean;
    }, {
        notification: boolean;
        sms: boolean;
    }>>;
    users: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodObject<{
        userType: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
        userId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    }, "strip", z.ZodTypeAny, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }>, "many">>, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[] | undefined, {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[] | undefined>;
}, "strip", z.ZodTypeAny, {
    content: string;
    isDraft?: boolean | undefined;
    scheduledAt?: string| undefined;
    types?: {
        notification: boolean;
        sms: boolean;
    } | undefined;
    users?: {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[] | undefined;
}, {
    content: string;
    isDraft?: boolean | undefined;
    scheduledAt?: string | string| undefined;
    types?: {
        notification: boolean;
        sms: boolean;
    } | undefined;
    users?: {
        userType: "admin" | "teacher" | "student" | "parent" | "master";
        userId: string & {
            _isID: true;
        };
    }[] | undefined;
}>;
type TBody$2M = z.infer<typeof body$2M>;
declare const params$4q: z.ZodObject<{
    alertNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    alertNewId: string;
}, {
    alertNewId: string;
}>;
type TParams$4q = z.infer<typeof params$4q>;
type UpdateAlertValidation = {
    body: TBody$2M;
    params: TParams$4q;
    query: never;
};

type UpdateAlertRouteConfig = UpdateAlertValidation & {
    files: never;
};
type UpdateAlertResponse = void;

declare const updateAlertByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateAlertByAdminRouteTypes = UpdateAlertRouteConfig & {
    response: APIResponse<UpdateAlertResponse>;
};

declare const body$2L: z.ZodObject<{
    content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
        newId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }, {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    content?: string | undefined;
    mentions?: {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }[] | undefined;
}, {
    content?: string | undefined;
    mentions?: {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }[] | undefined;
}>;
type TBody$2L = z.infer<typeof body$2L>;
declare const params$4p: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4p = z.infer<typeof params$4p>;
type AddCommentToPostValidation = {
    body: TBody$2L;
    params: TParams$4p;
    query: never;
};

type AddCommentToPostRouteConfig = AddCommentToPostValidation & {
    files: FilesInRequest<"attachments">;
};
type AddCommentToPostResponse = CommentDTO;

declare const addCommentToPostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddCommentToPostRouteTypes = AddCommentToPostRouteConfig & {
    response: APIResponse<AddCommentToPostResponse>;
};

declare const body$2K: z.ZodObject<{
    userTypes: z.ZodArray<z.ZodNativeEnum<Pick<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }, "STUDENT" | "TEACHER" | "PARENT" | "ADMIN">>, "many">;
    category: z.ZodOptional<z.ZodNativeEnum<{
        readonly general: "general";
        readonly academic: "academic";
        readonly activity: "activity";
        readonly administration: "administration";
        readonly alert: "alert";
    }>>;
    hashTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    scheduleAt: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    levels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    groups: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    classes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    isCommentsAllowed: z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, boolean, string>, z.ZodBoolean]>>;
}, "strip", z.ZodTypeAny, {
    userTypes: ("admin" | "teacher" | "student" | "parent")[];
    category?: "alert" | "activity" | "general" | "academic" | "administration" | undefined;
    hashTags?: string[] | undefined;
    scheduleAt?: string| undefined;
    levels?: string[] | undefined;
    groups?: string[] | undefined;
    classes?: string[] | undefined;
    content?: string | undefined;
    isCommentsAllowed?: boolean | undefined;
}, {
    userTypes: ("admin" | "teacher" | "student" | "parent")[];
    category?: "alert" | "activity" | "general" | "academic" | "administration" | undefined;
    hashTags?: string[] | undefined;
    scheduleAt?: string | string| undefined;
    levels?: string[] | undefined;
    groups?: string[] | undefined;
    classes?: string[] | undefined;
    content?: string | undefined;
    isCommentsAllowed?: string | boolean | undefined;
}>;
type TBody$2K = z.infer<typeof body$2K>;
type AddPostValidation = {
    body: TBody$2K;
    params: never;
    query: never;
};

type AddPostRouteConfig = AddPostValidation & {
    files: FilesInRequest<"attachments">;
};
type AddPostResponse = PostDTO;

declare const addPostRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddPostRouteTypes = AddPostRouteConfig & {
    response: APIResponse<AddPostResponse>;
};

declare const body$2J: z.ZodObject<{
    content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
        newId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }, {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    content?: string | undefined;
    mentions?: {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }[] | undefined;
}, {
    content?: string | undefined;
    mentions?: {
        newId: string;
        type: "admin" | "teacher" | "student" | "parent" | "master";
    }[] | undefined;
}>;
type TBody$2J = z.infer<typeof body$2J>;
declare const params$4o: z.ZodObject<{
    commentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    commentNewId: string;
}, {
    commentNewId: string;
}>;
type TParams$4o = z.infer<typeof params$4o>;
type AddReplyToCommentValidation = {
    body: TBody$2J;
    params: TParams$4o;
    query: never;
};

type AddReplyToCommentRouteConfig = AddReplyToCommentValidation & {
    files: FilesInRequest<"attachments">;
};
type AddReplyToCommentResponse = ReplyDTO;

declare const addReplyToCommentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddReplyToCommentRouteTypes = AddReplyToCommentRouteConfig & {
    response: APIResponse<AddReplyToCommentResponse>;
};

declare const params$4n: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4n = z.infer<typeof params$4n>;
type DeletePostValidation = {
    body: never;
    params: TParams$4n;
    query: never;
};

type DeletePostRouteConfig = DeletePostValidation & {
    files: never;
};
type DeletePostResponse = void;

declare const deletePostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeletePostRouteTypes = DeletePostRouteConfig & {
    response: APIResponse<DeletePostResponse>;
};

declare const params$4m: z.ZodObject<{
    commentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    commentNewId: string;
}, {
    commentNewId: string;
}>;
type TParams$4m = z.infer<typeof params$4m>;
type GetOneCommentValidation = {
    body: never;
    params: TParams$4m;
    query: never;
};

type GetOneCommentRouteConfig = GetOneCommentValidation & {
    files: never;
};
type GetOneCommentResponse = CommentDTO;

declare const getOneCommentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneCommentRouteTypes = GetOneCommentRouteConfig & {
    response: APIResponse<GetOneCommentResponse>;
};

declare const params$4l: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4l = z.infer<typeof params$4l>;
type GetOnePostValidation = {
    body: never;
    params: TParams$4l;
    query: never;
};

type GetOnePostRouteConfig = GetOnePostValidation & {
    files: never;
};
type GetOnePostResponse = PostDTO;

declare const getOnePostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOnePostRouteTypes = GetOnePostRouteConfig & {
    response: APIResponse<GetOnePostResponse>;
};

type ReactionsDTO = {
    reactionType: TReactionTypeEnum;
    reactedAt: string
    user: UserProfileDTO & {
        type: TEndUserEnum;
    };
}[];

declare const params$4k: z.ZodObject<{
    commentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    commentNewId: string;
}, {
    commentNewId: string;
}>;
type TParams$4k = z.infer<typeof params$4k>;
type GetReactionsOfCommentValidation = {
    body: never;
    params: TParams$4k;
    query: never;
};

type GetReactionsOfCommentRouteConfig = GetReactionsOfCommentValidation & {
    files: never;
};
type GetReactionsOfCommentResponse = ReactionsDTO;

declare const getReactionsOfCommentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetReactionsOfCommentRouteTypes = GetReactionsOfCommentRouteConfig & {
    response: APIResponse<GetReactionsOfCommentResponse>;
};

declare const params$4j: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4j = z.infer<typeof params$4j>;
type GetReactionsOfPostValidation = {
    body: never;
    params: TParams$4j;
    query: never;
};

type GetReactionsOfPostRouteConfig = GetReactionsOfPostValidation & {
    files: never;
};
type GetReactionsOfPostResponse = ReactionsDTO;

declare const getReactionsOfPostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetReactionsOfPostRouteTypes = GetReactionsOfPostRouteConfig & {
    response: APIResponse<GetReactionsOfPostResponse>;
};

declare const query$2q: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
    search?: string | undefined;
}, {
    postNewId: string;
    search?: string | undefined;
}>;
type TQuery$2p = z.infer<typeof query$2q>;
type GetUsersOfPostForMentionValidation = {
    body: never;
    params: never;
    query: TQuery$2p;
};

type GetUsersOfPostForMentionRouteConfig = GetUsersOfPostForMentionValidation & {
    files: never;
};
type GetUsersOfPostForMentionResponse = {
    type: TEndUserEnum;
    fullName: string;
    newId: string;
    _id: ID$1;
}[];

declare const getUsersOfPostForMentionRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetUsersOfPostForMentionRouteTypes = GetUsersOfPostForMentionRouteConfig & {
    response: APIResponse<GetUsersOfPostForMentionResponse>;
};

declare const params$4i: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4i = z.infer<typeof params$4i>;
declare const query$2p: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2o = z.infer<typeof query$2p>;
type ListCommentsOfPostValidation = {
    body: never;
    params: TParams$4i;
    query: TQuery$2o;
};

type ListCommentsOfPostRouteConfig = ListCommentsOfPostValidation & {
    files: never;
};
type ListCommentsOfPostResponse = ResponseWithPagination<CommentDTO>;

declare const listCommentsOfPostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListCommentsOfPostRouteTypes = ListCommentsOfPostRouteConfig & {
    response: APIResponse<ListCommentsOfPostResponse>;
};

declare const query$2o: z.ZodObject<{
    hashTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    hashTags?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    hashTags?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2n = z.infer<typeof query$2o>;
type ListPostsValidation = {
    body: never;
    params: never;
    query: TQuery$2n;
};

type ListPostsRouteConfig = ListPostsValidation & {
    files: never;
};
type ListPostsResponse = ResponseWithPagination<PostDTO>;

declare const listPostsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListPostsRouteTypes = ListPostsRouteConfig & {
    response: APIResponse<ListPostsResponse>;
};

declare const params$4h: z.ZodObject<{
    commentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    commentNewId: string;
}, {
    commentNewId: string;
}>;
type TParams$4h = z.infer<typeof params$4h>;
declare const query$2n: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2m = z.infer<typeof query$2n>;
type ListRepliesOfCommentValidation = {
    body: never;
    params: TParams$4h;
    query: TQuery$2m;
};

type ListRepliesOfCommentRouteConfig = ListRepliesOfCommentValidation & {
    files: never;
};
type ListRepliesOfCommentResponse = ResponseWithPagination<ReplyDTO>;

declare const listRepliesOfCommentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListRepliesOfCommentRouteTypes = ListRepliesOfCommentRouteConfig & {
    response: APIResponse<ListRepliesOfCommentResponse>;
};

declare const body$2I: z.ZodObject<{
    reactionType: z.ZodNullable<z.ZodNativeEnum<{
        readonly LIKE: "like";
        readonly care: "care";
        readonly LOVE: "love";
        readonly LAUGH: "laugh";
        readonly ANGRY: "angry";
        readonly SAD: "sad";
        readonly SURPRISED: "surprised";
    }>>;
}, "strip", z.ZodTypeAny, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}>;
type TBody$2I = z.infer<typeof body$2I>;
declare const params$4g: z.ZodObject<{
    commentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    commentNewId: string;
}, {
    commentNewId: string;
}>;
type TParams$4g = z.infer<typeof params$4g>;
type ReactToCommentValidation = {
    body: TBody$2I;
    params: TParams$4g;
    query: never;
};

type ReactToCommentRouteConfig = ReactToCommentValidation & {
    files: never;
};
type ReactToCommentResponse = ReactionSummary;

declare const reactToCommentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReactToCommentRouteTypes = ReactToCommentRouteConfig & {
    response: APIResponse<ReactToCommentResponse>;
};

declare const body$2H: z.ZodObject<{
    reactionType: z.ZodNullable<z.ZodNativeEnum<{
        readonly LIKE: "like";
        readonly care: "care";
        readonly LOVE: "love";
        readonly LAUGH: "laugh";
        readonly ANGRY: "angry";
        readonly SAD: "sad";
        readonly SURPRISED: "surprised";
    }>>;
}, "strip", z.ZodTypeAny, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}>;
type TBody$2H = z.infer<typeof body$2H>;
declare const params$4f: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4f = z.infer<typeof params$4f>;
type ReactToPostValidation = {
    body: TBody$2H;
    params: TParams$4f;
    query: never;
};

type ReactToPostRouteConfig = ReactToPostValidation & {
    files: never;
};
type ReactToPostResponse = ReactionSummary;

declare const reactToPostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReactToPostRouteTypes = ReactToPostRouteConfig & {
    response: APIResponse<ReactToPostResponse>;
};

declare const params$4e: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4e = z.infer<typeof params$4e>;
type TogglePinStatusOfPostValidation = {
    body: never;
    params: TParams$4e;
    query: never;
};

type TogglePinStatusOfPostRouteConfig = TogglePinStatusOfPostValidation & {
    files: never;
};
type TogglePinStatusOfPostResponse = void;

declare const togglePinStatusOfPostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type TogglePinStatusOfPostRouteTypes = TogglePinStatusOfPostRouteConfig & {
    response: APIResponse<TogglePinStatusOfPostResponse>;
};

declare const body$2G: z.ZodObject<{
    userTypes: z.ZodArray<z.ZodNativeEnum<Pick<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }, "STUDENT" | "TEACHER" | "PARENT" | "ADMIN">>, "many">;
    category: z.ZodOptional<z.ZodNativeEnum<{
        readonly general: "general";
        readonly academic: "academic";
        readonly activity: "activity";
        readonly administration: "administration";
        readonly alert: "alert";
    }>>;
    hashTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    levels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    groups: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    classes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    isCommentsAllowed: z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, boolean, string>, z.ZodBoolean]>>;
    deleteAttachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    userTypes: ("admin" | "teacher" | "student" | "parent")[];
    category?: "alert" | "activity" | "general" | "academic" | "administration" | undefined;
    hashTags?: string[] | undefined;
    levels?: string[] | undefined;
    groups?: string[] | undefined;
    classes?: string[] | undefined;
    content?: string | undefined;
    isCommentsAllowed?: boolean | undefined;
    deleteAttachments?: string[] | undefined;
}, {
    userTypes: ("admin" | "teacher" | "student" | "parent")[];
    category?: "alert" | "activity" | "general" | "academic" | "administration" | undefined;
    hashTags?: string[] | undefined;
    levels?: string[] | undefined;
    groups?: string[] | undefined;
    classes?: string[] | undefined;
    content?: string | undefined;
    isCommentsAllowed?: string | boolean | undefined;
    deleteAttachments?: string[] | undefined;
}>;
type TBody$2G = z.infer<typeof body$2G>;
declare const params$4d: z.ZodObject<{
    postNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postNewId: string;
}, {
    postNewId: string;
}>;
type TParams$4d = z.infer<typeof params$4d>;
type UpdatePostValidation = {
    body: TBody$2G;
    params: TParams$4d;
    query: never;
};

type UpdatePostRouteConfig = UpdatePostValidation & {
    files: FilesInRequest<"attachments">;
};
type UpdatePostResponse = PostDTO;

declare const updatePostRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdatePostRouteTypes = UpdatePostRouteConfig & {
    response: APIResponse<UpdatePostResponse>;
};

declare const params$4c: z.ZodObject<{
    adminNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adminNewId: string;
}, {
    adminNewId: string;
}>;
type TParams$4c = z.infer<typeof params$4c>;
type ArchiveAdminValidation = {
    body: never;
    params: TParams$4c;
    query: never;
};

type ArchiveAdminRouteConfig = ArchiveAdminValidation & {
    files: never;
};
type ArchiveAdminResponse = void;

declare const archiveAdminByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ArchiveAdminByAdminRouteTypes = ArchiveAdminRouteConfig & {
    response: APIResponse<ArchiveAdminResponse>;
};

declare const params$4b: z.ZodObject<{
    parentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    parentNewId: string;
}, {
    parentNewId: string;
}>;
type TParams$4b = z.infer<typeof params$4b>;
type ArchiveParentValidation = {
    body: never;
    params: TParams$4b;
    query: never;
};

type ArchiveParentRouteConfig = ArchiveParentValidation & {
    files: never;
};
type ArchiveParentResponse = void;

declare const archiveParentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ArchiveParentByAdminRouteTypes = ArchiveParentRouteConfig & {
    response: APIResponse<ArchiveParentResponse>;
};

declare const params$4a: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$4a = z.infer<typeof params$4a>;
type ArchiveStudentValidation = {
    body: never;
    params: TParams$4a;
    query: never;
};

type ArchiveStudentRouteConfig = ArchiveStudentValidation & {
    files: never;
};
type ArchiveStudentResponse = void;

declare const archiveStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ArchiveStudentByAdminRouteTypes = ArchiveStudentRouteConfig & {
    response: APIResponse<ArchiveStudentResponse>;
};

declare const params$49: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$49 = z.infer<typeof params$49>;
type ArchiveTeacherValidation = {
    body: never;
    params: TParams$49;
    query: never;
};

type ArchiveTeacherRouteConfig = ArchiveTeacherValidation & {
    files: never;
};
type ArchiveTeacherResponse = void;

declare const archiveTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ArchiveTeacherByAdminRouteTypes = ArchiveTeacherRouteConfig & {
    response: APIResponse<ArchiveTeacherResponse>;
};

declare const params$48: z.ZodObject<{
    adminNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adminNewId: string;
}, {
    adminNewId: string;
}>;
type TParams$48 = z.infer<typeof params$48>;
type UnArchiveAdminValidation = {
    body: never;
    params: TParams$48;
    query: never;
};

type UnArchiveAdminRouteConfig = UnArchiveAdminValidation & {
    files: never;
};
type UnArchiveAdminResponse = void;

declare const unArchiveAdminByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnArchiveAdminByAdminRouteTypes = UnArchiveAdminRouteConfig & {
    response: APIResponse<UnArchiveAdminResponse>;
};

declare const params$47: z.ZodObject<{
    parentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    parentNewId: string;
}, {
    parentNewId: string;
}>;
type TParams$47 = z.infer<typeof params$47>;
type UnArchiveParentValidation = {
    body: never;
    params: TParams$47;
    query: never;
};

type UnArchiveParentRouteConfig = UnArchiveParentValidation & {
    files: never;
};
type UnArchiveParentResponse = void;

declare const unArchiveParentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnArchiveParentByAdminRouteTypes = UnArchiveParentRouteConfig & {
    response: APIResponse<UnArchiveParentResponse>;
};

declare const params$46: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$46 = z.infer<typeof params$46>;
type UnArchiveStudentValidation = {
    body: never;
    params: TParams$46;
    query: never;
};

type UnArchiveStudentRouteConfig = UnArchiveStudentValidation & {
    files: never;
};
type UnArchiveStudentResponse = void;

declare const unArchiveStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnArchiveStudentByAdminRouteTypes = UnArchiveStudentRouteConfig & {
    response: APIResponse<UnArchiveStudentResponse>;
};

declare const params$45: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$45 = z.infer<typeof params$45>;
type UnArchiveTeacherValidation = {
    body: never;
    params: TParams$45;
    query: never;
};

type UnArchiveTeacherRouteConfig = UnArchiveTeacherValidation & {
    files: never;
};
type UnArchiveTeacherResponse = void;

declare const unArchiveTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnArchiveTeacherByAdminRouteTypes = UnArchiveTeacherRouteConfig & {
    response: APIResponse<UnArchiveTeacherResponse>;
};

declare const body$2F: z.ZodObject<{
    credential: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    credential: string;
}, {
    credential: string;
}>;
type TBody$2F = z.infer<typeof body$2F>;
type ForgetPasswordValidation = {
    body: TBody$2F;
    params: never;
    query: never;
};

type ForgetPasswordRouteConfig = ForgetPasswordValidation & {
    files: never;
};
type ForgetPasswordResponse = {
    email: string;
};

declare const forgetPasswordRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ForgetPasswordRouteTypes = ForgetPasswordRouteConfig & {
    response: APIResponse<ForgetPasswordResponse>;
};

type CurrentUserDTO = {
    _id: ID$1;
    newId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
    gender: string;
    address1: string | null;
    address2: string | null;
    phoneNumber: string | null;
    birthDate: string| null;
    email: string | null;
    roles: {
        _id: ID$1;
        newId: string;
        name: string;
        permissions: string[];
    }[];
    unseenNotification: number;
    unseenConversations: number;
    unseenAnnouncements: number;
    unseenParentDemands: number | null;
    schoolId: string;
    schoolLogo: string | null;
    schoolCover: string;
    schoolSubdomain: string;
    schoolName: string;
    taxRate: number;
    featureFlags: Record<TFeatureFlagsEnum, boolean>;
    schedule: {
        startHour: number;
        endHour: number;
        step: number;
        days: number[];
    };
};

type GetCurrentUserValidation$4 = {
    body: never;
    params: never;
    query: never;
};

type GetCurrentUserRouteConfig$4 = GetCurrentUserValidation$4 & {
    files: never;
};
type GetCurrentUserResponse$4 = CurrentUserDTO & {
    students: {
        _id: ID$1;
        newId: string;
        fullName: string;
        avatar: string;
        level: string;
        instanceType: TInstanceTypeEnum;
        examGradeSystem: TExamGradeSystemEnum | null;
    }[];
};

declare const getCurrentUserRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetCurrentUserRouteTypes = GetCurrentUserRouteConfig$4 & {
    response: APIResponse<GetCurrentUserResponse$4>;
};

type SchoolDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    subdomain: string;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    logo: string | null;
    dueDate: number;
    taxRate: number;
    maxStudentSeats: number;
    educationDepartment: string | null;
    enableSms: boolean;
    enableEmail: boolean;
    instanceType: TInstanceTypeEnum;
    gradeBookTheme: TGradeReportThemEnum;
    featureFlags: Record<TFeatureFlagsEnum, boolean>;
    financeSignature: IFile | null;
    academicSignature: IFile | null;
    directorName: string | null;
    schedule: {
        startHour: number;
        endHour: number;
        days: number[];
        step: string;
    };
    totalSmsSold: number;
};

declare const body$2E: z.ZodObject<{
    credential: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodString, string, string>]>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    credential: string;
}, {
    password: string;
    credential: string;
}>;
type TBody$2E = z.infer<typeof body$2E>;
type LoginValidation$1 = {
    body: TBody$2E;
    params: never;
    query: never;
};

type LoginRouteConfig$1 = LoginValidation$1 & {
    files: never;
};
type LoginResponse$1 = {
    token: string;
    user: UserProfileDTO;
    isActive: true;
    school: null;
} | {
    token: null;
    user: null;
    isActive: false;
    school: SchoolDTO;
};

declare const loginRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type LoginRouteTypes = LoginRouteConfig$1 & {
    response: APIResponse<LoginResponse$1>;
};

declare const body$2D: z.ZodObject<{
    credential: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    credential: string;
}, {
    password: string;
    credential: string;
}>;
type TBody$2D = z.infer<typeof body$2D>;
type LoginByStudentValidation = {
    body: TBody$2D;
    params: never;
    query: never;
};

type LoginByStudentRouteConfig = LoginByStudentValidation & {
    files: never;
};
type LoginByStudentResponse = {
    token: string;
    user: UserProfileDTO;
    isActive: true;
    school: null;
} | {
    token: null;
    user: null;
    isActive: false;
    school: SchoolDTO;
};

declare const loginByStudentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type LoginByStudentRouteTypes = LoginByStudentRouteConfig & {
    response: APIResponse<LoginByStudentResponse>;
};

declare const body$2C: z.ZodObject<{
    userAgent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userAgent?: string | undefined;
}, {
    userAgent?: string | undefined;
}>;
type TBody$2C = z.infer<typeof body$2C>;
type LogoutValidation = {
    body: TBody$2C;
    params: never;
    query: never;
};

type LogoutRouteConfig = LogoutValidation & {
    files: never;
};
type LogoutResponse = void;

declare const logoutRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type LogoutRouteTypes = LogoutRouteConfig & {
    response: APIResponse<LogoutResponse>;
};

declare const body$2B: z.ZodObject<{
    credential: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodString]>;
    newPassword: z.ZodString;
    confirmationCode: z.ZodEffects<z.ZodNumber, string, number>;
}, "strip", z.ZodTypeAny, {
    credential: string;
    newPassword: string;
    confirmationCode: string;
}, {
    credential: string;
    newPassword: string;
    confirmationCode: number;
}>;
type TBody$2B = z.infer<typeof body$2B>;
type ResetPasswordValidation = {
    body: TBody$2B;
    params: never;
    query: never;
};

type ResetPasswordRouteConfig = ResetPasswordValidation & {
    files: never;
};
type ResetPasswordResponse = {
    token: string;
};

declare const resetPasswordRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ResetPasswordRouteTypes = ResetPasswordRouteConfig & {
    response: APIResponse<ResetPasswordResponse>;
};

declare const body$2A: z.ZodEffects<z.ZodObject<{
    newPassword: z.ZodString;
    currentPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    currentPassword: string;
}, {
    newPassword: string;
    currentPassword: string;
}>, {
    newPassword: string;
    currentPassword: string;
}, {
    newPassword: string;
    currentPassword: string;
}>;
type TBody$2A = z.infer<typeof body$2A>;
type UpdateCurrentUserPasswordValidation = {
    body: TBody$2A;
    params: never;
    query: never;
};

type UpdateCurrentUserPasswordRouteConfig = UpdateCurrentUserPasswordValidation & {
    files: never;
};
type UpdateCurrentUserPasswordResponse = {
    token: string;
};

declare const updateCurrentUserPasswordRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UpdateCurrentUserPasswordRouteTypes = UpdateCurrentUserPasswordRouteConfig & {
    response: APIResponse<UpdateCurrentUserPasswordResponse>;
};

declare const body$2z: z.ZodObject<{
    credential: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodString]>;
    confirmationCode: z.ZodEffects<z.ZodNumber, string, number>;
}, "strip", z.ZodTypeAny, {
    credential: string;
    confirmationCode: string;
}, {
    credential: string;
    confirmationCode: number;
}>;
type TBody$2z = z.infer<typeof body$2z>;
type VerifyCodeValidation = {
    body: TBody$2z;
    params: never;
    query: never;
};

type VerifyCodeRouteConfig = VerifyCodeValidation & {
    files: never;
};
type VerifyCodeResponse = void;

declare const verifyCodeRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type VerifyCodeRouteTypes = VerifyCodeRouteConfig & {
    response: APIResponse<VerifyCodeResponse>;
};

type GetCurrentUserValidation$3 = {
    body: never;
    params: never;
    query: never;
};

type GetCurrentUserRouteConfig$3 = GetCurrentUserValidation$3 & {
    files: never;
};
type GetCurrentUserResponse$3 = CurrentUserDTO;

declare const getCurrentUserByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetCurrentUserByAdminRouteTypes = GetCurrentUserRouteConfig$3 & {
    response: APIResponse<GetCurrentUserResponse$3>;
};

declare const body$2y: z.ZodObject<{
    userType: z.ZodEnum<["admin", "teacher", "student", "parent"]>;
    userNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    userType: "admin" | "teacher" | "student" | "parent";
    userNewIds: string[];
}, {
    userType: "admin" | "teacher" | "student" | "parent";
    userNewIds: string[];
}>;
type TBody$2y = z.infer<typeof body$2y>;
type ResendInvitationValidation = {
    body: TBody$2y;
    params: never;
    query: never;
};

type Participant = {
    _id: ID$1 | null;
    newId: string | null;
    userType: TEndUserEnum;
    fullName: string | null;
    avatar: string | null;
    email: string | null;
    phoneNumber: string | null;
};

type ResendInvitationResponseDTO = {
    fullName: string;
    identifier: string;
    password: string;
};

type ResendInvitationRouteConfig = ResendInvitationValidation & {
    files: never;
};
type ResendInvitationResponse = ResendInvitationResponseDTO[];

declare const resendInvitationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ResendInvitationByAdminRouteTypes = ResendInvitationRouteConfig & {
    response: APIResponse<ResendInvitationResponse>;
};

declare const body$2x: z.ZodObject<{
    newPassword: z.ZodString;
    userNewId: z.ZodString;
    userType: z.ZodEnum<["admin", "teacher", "student", "parent"]>;
}, "strip", z.ZodTypeAny, {
    userType: "admin" | "teacher" | "student" | "parent";
    userNewId: string;
    newPassword: string;
}, {
    userType: "admin" | "teacher" | "student" | "parent";
    userNewId: string;
    newPassword: string;
}>;
type TBody$2x = z.infer<typeof body$2x>;
type ResetUserPasswordValidation = {
    body: TBody$2x;
    params: never;
    query: never;
};

type ResetUserPasswordRouteConfig = ResetUserPasswordValidation & {
    files: never;
};
type ResetUserPasswordResponse = void;

declare const resetUserPasswordByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ResetUserPasswordByAdminRouteTypes = ResetUserPasswordRouteConfig & {
    response: APIResponse<ResetUserPasswordResponse>;
};

declare const body$2w: z.ZodObject<{
    userType: z.ZodEnum<["teacher", "student", "parent"]>;
    userId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    userType: "teacher" | "student" | "parent";
    userId: string & {
        _isID: true;
    };
}, {
    userType: "teacher" | "student" | "parent";
    userId: string & {
        _isID: true;
    };
}>;
type TBody$2w = z.infer<typeof body$2w>;
type SwitchToUserValidation = {
    body: TBody$2w;
    params: never;
    query: never;
};

type SwitchToUserRouteConfig = SwitchToUserValidation & {
    files: never;
};
type SwitchToUserResponse = {
    token: string;
};

declare const switchToUserByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type SwitchToUserByAdminRouteTypes = SwitchToUserRouteConfig & {
    response: APIResponse<SwitchToUserResponse>;
};

type GetCurrentUserValidation$2 = {
    body: never;
    params: never;
    query: never;
};

type GetCurrentUserRouteConfig$2 = GetCurrentUserValidation$2 & {
    files: never;
};
type GetCurrentUserResponse$2 = CurrentUserDTO;

declare const getCurrentUserByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetCurrentUserByMasterRouteTypes = GetCurrentUserRouteConfig$2 & {
    response: APIResponse<GetCurrentUserResponse$2>;
};

declare const body$2v: z.ZodObject<{
    credential: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    credential: string;
}, {
    password: string;
    credential: string;
}>;
type TBody$2v = z.infer<typeof body$2v>;
type LoginValidation = {
    body: TBody$2v;
    params: never;
    query: never;
};

type LoginRouteConfig = LoginValidation & {
    files: never;
};
type LoginResponse = {
    token: string;
    user: UserProfileDTO;
};

declare const loginByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type LoginByMasterRouteTypes = LoginRouteConfig & {
    response: APIResponse<LoginResponse>;
};

type GetCurrentUserValidation$1 = {
    body: never;
    params: never;
    query: never;
};

type GetCurrentUserRouteConfig$1 = GetCurrentUserValidation$1 & {
    files: never;
};
type GetCurrentUserResponse$1 = CurrentUserDTO;

declare const getCurrentUserByStudentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetCurrentUserByStudentRouteTypes = GetCurrentUserRouteConfig$1 & {
    response: APIResponse<GetCurrentUserResponse$1>;
};

type GetCurrentUserValidation = {
    body: never;
    params: never;
    query: never;
};

type GetCurrentUserRouteConfig = GetCurrentUserValidation & {
    files: never;
};
type GetCurrentUserResponse = CurrentUserDTO;

declare const getCurrentUserByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetCurrentUserByTeacherRouteTypes = GetCurrentUserRouteConfig & {
    response: APIResponse<GetCurrentUserResponse>;
};

declare const query$2m: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    userType: z.ZodEnum<["admin", "teacher"]>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    userType: "admin" | "teacher";
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    userType: "admin" | "teacher";
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2l = z.infer<typeof query$2m>;
type ListRolesValidation$1 = {
    body: never;
    params: never;
    query: TQuery$2l;
};

type ListRolesRouteConfig$1 = ListRolesValidation$1 & {
    files: never;
};
type ListRolesResponse$1 = ResponseWithPagination<{
    _id: ID$1;
    newId: string;
    name: string;
}>;

declare const listRolesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListRolesByAdminRouteTypes = ListRolesRouteConfig$1 & {
    response: APIResponse<ListRolesResponse$1>;
};

declare const body$2u: z.ZodObject<{
    name: z.ZodString;
    userTypes: z.ZodArray<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }>, "many">;
    permissions: z.ZodArray<z.ZodString, "many">;
    translation: z.ZodObject<{
        ar: z.ZodString;
        en: z.ZodString;
        fr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ar: string;
        en: string;
        fr: string;
    }, {
        ar: string;
        en: string;
        fr: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    userTypes: ("admin" | "teacher" | "student" | "parent" | "master")[];
    permissions: string[];
    translation: {
        ar: string;
        en: string;
        fr: string;
    };
}, {
    name: string;
    userTypes: ("admin" | "teacher" | "student" | "parent" | "master")[];
    permissions: string[];
    translation: {
        ar: string;
        en: string;
        fr: string;
    };
}>;
type TBody$2u = z.infer<typeof body$2u>;
type AddRoleValidation = {
    body: TBody$2u;
    params: never;
    query: never;
};

type AddRoleRouteConfig = AddRoleValidation & {
    files: never;
};
type AddRoleResponse = void;

declare const addRoleByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddRoleByMasterRouteTypes = AddRoleRouteConfig & {
    response: APIResponse<AddRoleResponse>;
};

declare const params$44: z.ZodObject<{
    roleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roleNewId: string;
}, {
    roleNewId: string;
}>;
type TParams$44 = z.infer<typeof params$44>;
type DeleteRoleValidation = {
    body: never;
    params: TParams$44;
    query: never;
};

type DeleteRoleRouteConfig = DeleteRoleValidation & {
    files: never;
};
type DeleteRoleResponse = void;

declare const deleteRoleByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteRoleByMasterRouteTypes = DeleteRoleRouteConfig & {
    response: APIResponse<DeleteRoleResponse>;
};

type RoleDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    permissions: string[];
    userTypes: string[];
    translation: Record<TLanguageEnum, string>;
};

declare const params$43: z.ZodObject<{
    roleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roleNewId: string;
}, {
    roleNewId: string;
}>;
type TParams$43 = z.infer<typeof params$43>;
type GetOneRoleValidation = {
    body: never;
    params: TParams$43;
    query: never;
};

type GetOneRoleRouteConfig = GetOneRoleValidation & {
    files: never;
};
type GetOneRoleResponse = RoleDTO;

declare const getOneRoleByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneRoleByMasterRouteTypes = GetOneRoleRouteConfig & {
    response: APIResponse<GetOneRoleResponse>;
};

declare const query$2l: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    userTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }>, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    userTypes?: ("admin" | "teacher" | "student" | "parent" | "master")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    userTypes?: ("admin" | "teacher" | "student" | "parent" | "master")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2k = z.infer<typeof query$2l>;
type ListRolesValidation = {
    query: TQuery$2k;
    body: never;
    params: never;
};

type ListRolesRouteConfig = ListRolesValidation & {
    files: never;
};
type ListRolesResponse = ResponseWithPagination<RoleDTO>;

declare const listRolesByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListRolesByMasterRouteTypes = ListRolesRouteConfig & {
    response: APIResponse<ListRolesResponse>;
};

declare const body$2t: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    translation: z.ZodOptional<z.ZodObject<{
        ar: z.ZodString;
        en: z.ZodString;
        fr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ar: string;
        en: string;
        fr: string;
    }, {
        ar: string;
        en: string;
        fr: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    permissions?: string[] | undefined;
    translation?: {
        ar: string;
        en: string;
        fr: string;
    } | undefined;
}, {
    name?: string | undefined;
    permissions?: string[] | undefined;
    translation?: {
        ar: string;
        en: string;
        fr: string;
    } | undefined;
}>;
type TBody$2t = z.infer<typeof body$2t>;
declare const params$42: z.ZodObject<{
    roleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roleNewId: string;
}, {
    roleNewId: string;
}>;
type TParams$42 = z.infer<typeof params$42>;
type UpdateRoleValidation = {
    body: TBody$2t;
    params: TParams$42;
    query: never;
};

type UpdateRoleRouteConfig = UpdateRoleValidation & {
    files: never;
};
type UpdateRoleResponse = void;

declare const updateRoleByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateRoleByMasterRouteTypes = UpdateRoleRouteConfig & {
    response: APIResponse<UpdateRoleResponse>;
};

declare const body$2s: z.ZodObject<{
    name: z.ZodString;
    numRows: z.ZodNumber;
    numCodes: z.ZodNumber;
    top: z.ZodNumber;
    left: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    numRows: number;
    numCodes: number;
    top: number;
    left: number;
    width: number;
    height: number;
}, {
    name: string;
    numRows: number;
    numCodes: number;
    top: number;
    left: number;
    width: number;
    height: number;
}>;
type TBody$2s = z.infer<typeof body$2s>;
type AddBarCodeConfigValidation = {
    body: TBody$2s;
    params: never;
    query: never;
};

type AddBarCodeConfigRouteConfig = AddBarCodeConfigValidation & {
    files: never;
};
type AddBarCodeConfigResponse = void;

declare const addBarCodeConfigByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddBarCodeConfigByAdminRouteTypes = AddBarCodeConfigRouteConfig & {
    response: APIResponse<AddBarCodeConfigResponse>;
};

declare const params$41: z.ZodObject<{
    barCodeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    barCodeNewId: string;
}, {
    barCodeNewId: string;
}>;
type TParams$41 = z.infer<typeof params$41>;
type DeleteBarCodeConfigValidation = {
    params: TParams$41;
    body: never;
    query: never;
};

type DeleteBarCodeConfigRouteConfig = DeleteBarCodeConfigValidation & {
    files: never;
};
type DeleteBarCodeConfigResponse = void;

declare const deleteBarCodeConfigByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteBarCodeConfigByAdminRouteTypes = DeleteBarCodeConfigRouteConfig & {
    response: APIResponse<DeleteBarCodeConfigResponse>;
};

type BarCodeConfigDto = {
    newId: string;
    _id: ID$1;
    name: string;
    numRows: number;
    numCodes: number;
    top: number;
    left: number;
    width: number;
    height: number;
};

declare const query$2k: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    name?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2j = z.infer<typeof query$2k>;
type ListBarCodeConfigValidation = {
    body: never;
    params: never;
    query: TQuery$2j;
};

type ListBarCodeConfigRouteConfig = ListBarCodeConfigValidation & {
    files: never;
};
type ListBarCodeConfigResponse = ResponseWithPagination<BarCodeConfigDto>;

declare const listBarCodeConfigByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListBarCodeConfigByAdminRouteTypes = ListBarCodeConfigRouteConfig & {
    response: APIResponse<ListBarCodeConfigResponse>;
};

declare const body$2r: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    numRows: z.ZodOptional<z.ZodNumber>;
    numCodes: z.ZodOptional<z.ZodNumber>;
    top: z.ZodOptional<z.ZodNumber>;
    left: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    numRows?: number | undefined;
    numCodes?: number | undefined;
    top?: number | undefined;
    left?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    name?: string | undefined;
    numRows?: number | undefined;
    numCodes?: number | undefined;
    top?: number | undefined;
    left?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
type TBody$2r = z.infer<typeof body$2r>;
declare const params$40: z.ZodObject<{
    barCodeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    barCodeNewId: string;
}, {
    barCodeNewId: string;
}>;
type TParams$40 = z.infer<typeof params$40>;
type UpdateBarCodeConfigValidation = {
    body: TBody$2r;
    params: TParams$40;
    query: never;
};

type UpdateBarCodeConfigRouteConfig = UpdateBarCodeConfigValidation & {
    files: never;
};
type UpdateBarCodeConfigResponse = void;

declare const updateBarCodeConfigByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateBarCodeConfigByAdminRouteTypes = UpdateBarCodeConfigRouteConfig & {
    response: APIResponse<UpdateBarCodeConfigResponse>;
};

type GroupDto$1 = {
    _id: ID$1;
    newId: string;
    name: string;
};

declare const params$3$: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3$ = z.infer<typeof params$3$>;
type GetGroupsOfClassValidation = {
    body: never;
    params: TParams$3$;
    query: never;
};

type GetGroupsOfClassRouteConfig = GetGroupsOfClassValidation & {
    files: never;
};
type GetGroupsOfClassResponse = GroupDto$1[];

declare const getGroupsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGroupsOfClassByAdminRouteTypes = GetGroupsOfClassRouteConfig & {
    response: APIResponse<GetGroupsOfClassResponse>;
};

type GradeReportTemplateDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    subjects: {
        _id: ID$1;
        newId: string;
        name: string;
    }[];
    classTypes: {
        _id: ID$1;
        newId: string;
        name: string;
    }[];
    isDefault: boolean;
    isBuiltIn: boolean;
};

type ClassOverviewDTO = {
    classNewId: string;
    classId: string;
    className: string;
    levelId: string;
    schoolYearId: string;
    terms: {
        newId: string;
        _id: string;
        name: string;
        isLocked: boolean;
        isCompleted: boolean;
        isPublished: boolean;
    }[];
    currentTermNewId: string;
    examGradeSystem: string | null;
    gradeReportTemplates: GradeReportTemplateDTO[];
    notAvailableTimes: {
        day: number;
        hours: number[];
    }[];
    maxHoursPerDay: number | null;
    maxGapsPerDay: number | null;
    maxContinuousHours: number | null;
    preferredClassroom: {
        _id: ID$1;
        newId: string;
        name: string;
    } | null;
    classGroups: EntityDto[];
    classType: EntityDto;
};

declare const params$3_: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3_ = z.infer<typeof params$3_>;
type GetClassOverviewValidation = {
    body: never;
    params: TParams$3_;
    query: never;
};

type GetClassOverviewRouteConfig = GetClassOverviewValidation & {
    files: never;
};
type GetClassOverviewResponse = ClassOverviewDTO;

declare const getClassOverviewRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetClassOverviewRouteTypes = GetClassOverviewRouteConfig & {
    response: APIResponse<GetClassOverviewResponse>;
};

type StudentInClassDto = {
    _id: ID$1;
    newId: string;
    fullName: string;
    group: GroupDto$1;
    gender: string;
    email: string | null;
    avatar: string;
};

declare const params$3Z: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3Z = z.infer<typeof params$3Z>;
declare const query$2j: z.ZodObject<{
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    export?: "csv" | "xlsx" | undefined;
}, {
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2i = z.infer<typeof query$2j>;
type GetStudentsOfClassValidation = {
    params: TParams$3Z;
    query: TQuery$2i;
    body: never;
};

type GetStudentsOfClassRouteConfig = GetStudentsOfClassValidation & {
    files: never;
};
type GetStudentsOfClassResponse = StudentInClassDto[];

declare const getStudentsOfClassRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentsOfClassRouteTypes = GetStudentsOfClassRouteConfig & {
    response: APIResponse<GetStudentsOfClassResponse>;
};

declare const query$2i: z.ZodObject<{
    teacherNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    teacherNewId?: string | undefined;
}, {
    teacherNewId?: string | undefined;
}>;
type TQuery$2h = z.infer<typeof query$2i>;
type GetTeacherClassAndGroupsValidation$1 = {
    body: never;
    params: never;
    query: TQuery$2h;
};

type GetTeacherClassAndGroupsRouteConfig$1 = GetTeacherClassAndGroupsValidation$1 & {
    files: never;
};
type GetTeacherClassAndGroupsResponse$1 = (EntityDto & {
    isGroup: boolean;
})[];

declare const getTeacherClassAndGroupsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetTeacherClassAndGroupsRouteTypes = GetTeacherClassAndGroupsRouteConfig$1 & {
    response: APIResponse<GetTeacherClassAndGroupsResponse$1>;
};

type ClassDTO = {
    name: string;
    newId: string;
    _id: string;
    classType: ID$1;
};

declare const query$2h: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2g = z.infer<typeof query$2h>;
type ListClassesValidation$1 = {
    params: never;
    query: TQuery$2g;
    body: never;
};

type ListClassesRouteConfig$1 = ListClassesValidation$1 & {
    files: never;
};
type ListClassesResponse$1 = ResponseWithPagination<ClassDTO>;

declare const listClassesRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassesRouteTypes = ListClassesRouteConfig$1 & {
    response: APIResponse<ListClassesResponse$1>;
};

declare const body$2q: z.ZodObject<{
    students: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    students: ID$1[];
}, {
    students: ID$1[];
}>;
type TBody$2q = z.infer<typeof body$2q>;
declare const params$3Y: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3Y = z.infer<typeof params$3Y>;
type AssignStudentToClassValidation = {
    body: TBody$2q;
    params: TParams$3Y;
    query: never;
};
declare const AssignStudentToClassValidation: {
    body: z.ZodObject<{
        students: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
    }, "strip", z.ZodTypeAny, {
        students: ID$1[];
    }, {
        students: ID$1[];
    }>;
    params: z.ZodObject<{
        classNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        classNewId: string;
    }, {
        classNewId: string;
    }>;
};

type AssignStudentToClassRouteConfig = AssignStudentToClassValidation & {
    files: never;
};
type AssignStudentToClassResponse = void;

declare const AssignStudentToClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AssignStudentToClassByAdminRouteTypes = AssignStudentToClassRouteConfig & {
    response: APIResponse<AssignStudentToClassResponse>;
};

declare const body$2p: z.ZodObject<{
    classTypeNewId: z.ZodString;
    name: z.ZodString;
    students: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subjectTeachers: z.ZodRecord<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    subSubjectTeachers: z.ZodRecord<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    classTypeNewId: string;
    subjectTeachers: Partial<Record<ID$1, ID$1>>;
    subSubjectTeachers: Partial<Record<ID$1, ID$1>>;
    students?: ID$1[] | undefined;
}, {
    name: string;
    classTypeNewId: string;
    subjectTeachers: Partial<Record<ID$1, ID$1>>;
    subSubjectTeachers: Partial<Record<ID$1, ID$1>>;
    students?: ID$1[] | undefined;
}>;
type TBody$2p = z.infer<typeof body$2p>;
type AddClassValidation = {
    body: TBody$2p;
    params: never;
    query: never;
};

type AddClassRouteConfig = AddClassValidation & {
    files: never;
};
type AddClassResponse = ClassDTO;

declare const addClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddClassByAdminRouteTypes = AddClassRouteConfig & {
    response: APIResponse<AddClassResponse>;
};

declare const body$2o: z.ZodObject<{
    teacherId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    subSubjectTypeId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    subSubjectTypeId: string & {
        _isID: true;
    };
    teacherId: string & {
        _isID: true;
    };
}, {
    subSubjectTypeId: string & {
        _isID: true;
    };
    teacherId: string & {
        _isID: true;
    };
}>;
type TBody$2o = z.infer<typeof body$2o>;
declare const params$3X: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3X = z.infer<typeof params$3X>;
type AssignTeacherToSubSubjectInClassValidation = {
    body: TBody$2o;
    params: TParams$3X;
    query: never;
};

type AssignTeacherToSubSubjectInClassRouteConfig = AssignTeacherToSubSubjectInClassValidation & {
    files: never;
};
type AssignTeacherToSubSubjectInClassResponse = void;

declare const assignTeacherToSubSubjectInClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AssignTeacherToSubSubjectInClassByAdminRouteTypes = AssignTeacherToSubSubjectInClassRouteConfig & {
    response: APIResponse<AssignTeacherToSubSubjectInClassResponse>;
};

declare const body$2n: z.ZodObject<{
    subjectTypeId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    teacherId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    subjectTypeId: string & {
        _isID: true;
    };
    teacherId: string & {
        _isID: true;
    };
}, {
    subjectTypeId: string & {
        _isID: true;
    };
    teacherId: string & {
        _isID: true;
    };
}>;
type TBody$2n = z.infer<typeof body$2n>;
declare const params$3W: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3W = z.infer<typeof params$3W>;
type AssignTeacherToSubjectInClassValidation = {
    body: TBody$2n;
    params: TParams$3W;
    query: never;
};

type AssignTeacherToSubjectInClassRouteConfig = AssignTeacherToSubjectInClassValidation & {
    files: never;
};
type AssignTeacherToSubjectInClassResponse = void;

declare const assignTeacherToSubjectInClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AssignTeacherToSubjectInClassByAdminRouteTypes = AssignTeacherToSubjectInClassRouteConfig & {
    response: APIResponse<AssignTeacherToSubjectInClassResponse>;
};

declare const params$3V: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3V = z.infer<typeof params$3V>;
type DeleteClassValidation = {
    params: TParams$3V;
    body: never;
    query: never;
};

type DeleteClassRouteConfig = DeleteClassValidation & {
    files: never;
};
type DeleteClassResponse = void;

declare const deleteClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteClassByAdminRouteTypes = DeleteClassRouteConfig & {
    response: APIResponse<DeleteClassResponse>;
};

type SessionAttendanceStats = {
    present: {
        percentage: string;
        count: number;
    };
    absent: {
        percentage: string;
        count: number;
    };
    late: {
        percentage: string;
        count: number;
    };
    expelled: {
        percentage: string;
        count: number;
    };
};

type ClassOverviewDashboardDTO = {
    _id: ID$1;
    newId: string;
    className: string;
    studentsCount: number;
    femalesCount: number;
    malesCount: number;
    capacity: number;
    level: string;
};
type CurrentSessionClassDashboardDTO = {
    id: ID$1;
    newId: string;
    subject: string;
    teacher: UserProfileDTO | null;
    sessionType: string;
    classroom: string;
    attendanceStat: SessionAttendanceStats;
};

declare const SCHEDULE_ENTITY_ENUM: {
    readonly TEACHER: "teacher";
    readonly STUDENT: "student";
    readonly CLASSROOM: "classroom";
    readonly GROUP: "group";
    readonly CLASS: "class";
    readonly CLASS_GROUP: "classGroup";
};
type TScheduleEntityEnum = (typeof SCHEDULE_ENTITY_ENUM)[keyof typeof SCHEDULE_ENTITY_ENUM];

type AttendanceDashboardStats = {
    tabName: "attendance";
    chartData: {
        tag: string;
        percentage: number;
    }[];
    tableData: AttendanceTable[];
};

type TabName = "attendance" | "observationGiven" | "sessionCanceled";

type AdminDashboardDTO = {
    totalClasses: number;
    totalStudentsCount: number;
    unaffectedStudentsCount: number;
    affectedStudentsCount: number;
    totalParents: number;
    totalTeachers: number;
    staffCount: number;
    levels: {
        name: string;
        _id: ID$1;
    }[];
    subLevels: {
        name: string;
        totalClasses: number;
        totalStudents: number;
        affectedStudents: number;
        unaffectedStudents: number;
        newId: string;
    }[];
    tabStats: {
        tabName: TabName;
        chartData: {
            tag: string;
            percentage: number;
        }[];
        tableData: (AttendanceTable | ObservationGivenTable | SessionCanceledTable)[];
    };
};
type AttendanceTable = {
    _id: ID$1;
    newId: string;
    studentFullName: string | null;
    studentAvatar: string | null;
    className: string;
    sessionDate: string
    status: string;
};
type ObservationGivenTable = {
    _id: ID$1;
    newId: string;
    students: UserProfileDTO[];
    issuerFullName: string | null;
    issuerAvatar: string | null;
    reason: string | null;
    urgency: string;
};
type SessionCanceledTable = {
    _id: ID$1;
    newId: string;
    teacherFullName: string | null;
    teacherAvatar: string | null;
    sessionStartDate: string
    reasonForCanceling: string;
    className: string;
    topicName: string;
};

declare const params$3U: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3U = z.infer<typeof params$3U>;
declare const query$2g: z.ZodObject<{
    dateInterval: z.ZodObject<{
        from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    }, "strip", z.ZodTypeAny, {
        from: string
        to: string
    }, {
        from: (string | Date) & (string | string| undefined);
        to: (string | Date) & (string | string| undefined);
    }>;
    tabName: z.ZodOptional<z.ZodEnum<["attendance", "observationGiven", "sessionCanceled"]>>;
}, "strip", z.ZodTypeAny, {
    dateInterval: {
        from: string
        to: string
    };
    tabName?: "attendance" | "observationGiven" | "sessionCanceled" | undefined;
}, {
    dateInterval: {
        from: (string | Date) & (string | string| undefined);
        to: (string | Date) & (string | string| undefined);
    };
    tabName?: "attendance" | "observationGiven" | "sessionCanceled" | undefined;
}>;
type TQuery$2f = z.infer<typeof query$2g>;
type GetClassDashboardValidation = {
    body: never;
    params: TParams$3U;
    query: TQuery$2f;
};

type GetClassDashboardRouteConfig = GetClassDashboardValidation & {
    files: never;
};
type GetClassDashboardResponse = {
    classOverView: ClassOverviewDashboardDTO;
    currentSession: CurrentSessionClassDashboardDTO | null;
    tabStats: {
        tabName: TabName;
        chartData: {
            tag: string;
            percentage: number;
        }[];
        tableData: (AttendanceTable | ObservationGivenTable | SessionCanceledTable)[];
    };
};

declare const getClassDashboardByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetClassDashboardByAdminRouteTypes = GetClassDashboardRouteConfig & {
    response: APIResponse<GetClassDashboardResponse>;
};

type SchoolYearDto = {
    _id: ID$1;
    newId: string;
    name: string;
    startDate: string
    endDate: string
    levelName: string;
};

declare const params$3T: z.ZodObject<{
    subLevelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subLevelNewId: string;
}, {
    subLevelNewId: string;
}>;
type TParams$3T = z.infer<typeof params$3T>;
declare const query$2f: z.ZodObject<{
    classTypeNewId: z.ZodOptional<z.ZodString>;
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    classTypeNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}, {
    classTypeNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}>;
type TQuery$2e = z.infer<typeof query$2f>;
type GetClassListValidation$1 = {
    params: TParams$3T;
    query: TQuery$2e;
    body: never;
};

type GetClassListResponseDto = {
    classList: (EntityDto & {
        students: UserProfileDTO[];
        teachers: UserProfileDTO[];
    })[];
    hasSection: boolean;
    level: EntityDto | null;
    selectedClassType: EntityDto | null;
    classTypes: EntityDto[] | null;
    schoolYears: SchoolYearDto[];
    selectedSchoolYear: SchoolYearDto;
};
type GetClassListRouteConfig$1 = GetClassListValidation$1 & {
    files: never;
};
type GetClassListResponse$1 = GetClassListResponseDto;

declare const getClassListByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetClassListByAdminRouteTypes = GetClassListRouteConfig$1 & {
    response: APIResponse<GetClassListResponse$1>;
};

declare const params$3S: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3S = z.infer<typeof params$3S>;
type GetStudentsCodeBarePdfValidation = {
    body: never;
    params: TParams$3S;
    query: never;
};

type GetStudentsCodeBarePdfRouteConfig = GetStudentsCodeBarePdfValidation & {
    files: never;
};
type GetStudentsCodeBarePdfResponse = {
    students: UserProfileDTO[];
    schoolInformation: {
        className: string;
    };
};

declare const getStudentsCodeBarePdfByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentsCodeBarePdfByAdminRouteTypes = GetStudentsCodeBarePdfRouteConfig & {
    response: APIResponse<GetStudentsCodeBarePdfResponse>;
};

type SubjectOfClassDto = {
    subjectType: EntityDto;
    coefficient: number;
    hasSubSubjects: boolean;
    teacher: UserProfileDTO | null;
    subSubjects: {
        subSubjectType: EntityDto;
        coefficient: number;
        teacher: UserProfileDTO | null;
    }[];
};

declare const params$3R: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3R = z.infer<typeof params$3R>;
type GetSubjectsOfClassValidation = {
    body: never;
    params: TParams$3R;
    query: never;
};

type GetSubjectsOfClassRouteConfig = GetSubjectsOfClassValidation & {
    files: never;
};
type GetSubjectsOfClassResponse = SubjectOfClassDto[];

declare const getSubjectsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSubjectsOfClassByAdminRouteTypes = GetSubjectsOfClassRouteConfig & {
    response: APIResponse<GetSubjectsOfClassResponse>;
};

declare const query$2e: z.ZodObject<{
    teacherNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    teacherNewId?: string | undefined;
}, {
    teacherNewId?: string | undefined;
}>;
type TQuery$2d = z.infer<typeof query$2e>;
declare const params$3Q: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$3Q = z.infer<typeof params$3Q>;
type GetTeacherClassAndGroupsValidation = {
    body: never;
    params: TParams$3Q;
    query: TQuery$2d;
};

type GetTeacherClassAndGroupsRouteConfig = GetTeacherClassAndGroupsValidation & {
    files: never;
};
type GetTeacherClassAndGroupsResponse = (EntityDto & {
    isGroup: boolean;
})[];

declare const getTeacherClassAndGroupsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTeacherClassAndGroupsByAdminRouteTypes = GetTeacherClassAndGroupsRouteConfig & {
    response: APIResponse<GetTeacherClassAndGroupsResponse>;
};

declare const query$2d: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    levels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    levels?: string[] | undefined;
    classTypes?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    levels?: string[] | undefined;
    classTypes?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2c = z.infer<typeof query$2d>;
type ListClassesValidation = {
    body: never;
    params: never;
    query: TQuery$2c;
};

type ListClassesRouteConfig = ListClassesValidation & {
    files: never;
};
type ListClassesResponse = ResponseWithPagination<{
    _id: ID$1;
    name: string;
    newId: string;
}>;

declare const listClassesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassesByAdminRouteTypes = ListClassesRouteConfig & {
    response: APIResponse<ListClassesResponse>;
};

declare const body$2m: z.ZodObject<{
    studentIds: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    studentIds: ID$1[];
}, {
    studentIds: ID$1[];
}>;
type TBody$2m = z.infer<typeof body$2m>;
declare const params$3P: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3P = z.infer<typeof params$3P>;
type UnAssignStudentFromClassValidation = {
    body: TBody$2m;
    params: TParams$3P;
    query: never;
};

type UnAssignStudentFromClassRouteConfig = UnAssignStudentFromClassValidation & {
    files: never;
};
type UnAssignStudentFromClassResponse = void;

declare const unAssignStudentFromClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnAssignStudentFromClassByAdminRouteTypes = UnAssignStudentFromClassRouteConfig & {
    response: APIResponse<UnAssignStudentFromClassResponse>;
};

declare const params$3O: z.ZodObject<{
    subSubjectTypeId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subSubjectTypeId: string & {
        _isID: true;
    };
    classNewId: string;
}, {
    subSubjectTypeId: string & {
        _isID: true;
    };
    classNewId: string;
}>;
type TParams$3O = z.infer<typeof params$3O>;
type UnAssignTeacherFromSubSubjectValidation = {
    body: never;
    params: TParams$3O;
    query: never;
};

type UnAssignTeacherFromSubSubjectRouteConfig = UnAssignTeacherFromSubSubjectValidation & {
    files: never;
};
type UnAssignTeacherFromSubSubjectResponse = void;

declare const unAssignTeacherFromSubSubjectByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnAssignTeacherFromSubSubjectByAdminRouteTypes = UnAssignTeacherFromSubSubjectRouteConfig & {
    response: APIResponse<UnAssignTeacherFromSubSubjectResponse>;
};

declare const params$3N: z.ZodObject<{
    classNewId: z.ZodString;
    subjectTypeId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    subjectTypeId: string & {
        _isID: true;
    };
    classNewId: string;
}, {
    subjectTypeId: string & {
        _isID: true;
    };
    classNewId: string;
}>;
type TParams$3N = z.infer<typeof params$3N>;
type UnAssignTeacherFromSubjectValidation = {
    body: never;
    params: TParams$3N;
    query: never;
};

type UnAssignTeacherFromSubjectRouteConfig = UnAssignTeacherFromSubjectValidation & {
    files: never;
};
type UnAssignTeacherFromSubjectResponse = void;

declare const unAssignTeacherFromSubjectByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnAssignTeacherFromSubjectByAdminRouteTypes = UnAssignTeacherFromSubjectRouteConfig & {
    response: APIResponse<UnAssignTeacherFromSubjectResponse>;
};

declare const body$2l: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type TBody$2l = z.infer<typeof body$2l>;
declare const params$3M: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3M = z.infer<typeof params$3M>;
type UpdateClassValidation = {
    body: TBody$2l;
    params: TParams$3M;
    query: never;
};

type UpdateClassRouteConfig = UpdateClassValidation & {
    files: never;
};
type UpdateClassResponse = void;

declare const updateClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateClassByAdminRouteTypes = UpdateClassRouteConfig & {
    response: APIResponse<UpdateClassResponse>;
};

declare const body$2k: z.ZodObject<{
    classGroupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classGroupNewId: string;
}, {
    classGroupNewId: string;
}>;
type TBody$2k = z.infer<typeof body$2k>;
declare const params$3L: z.ZodObject<{
    classNewId: z.ZodString;
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
    classNewId: string;
}, {
    studentNewId: string;
    classNewId: string;
}>;
type TParams$3L = z.infer<typeof params$3L>;
type UpdateStudentGroupValidation = {
    body: TBody$2k;
    params: TParams$3L;
    query: never;
};

type UpdateStudentGroupRouteConfig = UpdateStudentGroupValidation & {
    files: never;
};
type UpdateStudentGroupResponse = void;

declare const updateStudentGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateStudentGroupByAdminRouteTypes = UpdateStudentGroupRouteConfig & {
    response: APIResponse<UpdateStudentGroupResponse>;
};

type GetClassListValidation = {
    body: never;
    params: never;
    query: never;
};

type GetClassListRouteConfig = GetClassListValidation & {
    files: never;
};
type GetClassListResponse = {
    classes: {
        _id: ID$1;
        newId: string;
        name: string;
        students: UserProfileDTO[];
        levelName: string;
        studentsNumbers: number;
    }[];
    groups: {
        _id: ID$1;
        newId: string;
        name: string;
        students: UserProfileDTO[];
        levelName: string;
        studentsNumbers: number;
    }[];
};

declare const getClassListByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetClassListByTeacherRouteTypes = GetClassListRouteConfig & {
    response: APIResponse<GetClassListResponse>;
};

type ClassTypeDto = {
    _id: ID$1;
    newId: string;
    name: string;
    capacity: number;
    level: {
        name: string;
        newId: string;
    };
    subLevel: {
        name: string;
        newId: string;
    };
    section: {
        name: string;
        newId: string;
    } | null;
    nextClassTypes: {
        name: string;
        newId: string;
    }[] | null;
    isTerminal: boolean;
};
type FieldOfClassTypeDTO = {
    name: string;
    subjects: {
        name: string;
        newId: string;
        _id: string;
    }[];
    coefficient: number;
    rank: number;
};
type ExamDTO = {
    name: string;
    examTypeNewId: string;
    coefficient: number;
};
type SubSubjectOfClassTypeDTO = {
    subSubjectType: {
        name: string;
        _id: ID$1;
        newId: string;
    };
    isIncludedInGradeBook: boolean;
    name: string;
    coefficient: number;
    rank: number;
    exams: ExamDTO[];
};
type SubjectOfClassTypeDTO = {
    subjectType: {
        name: string;
        _id: ID$1;
        newId: string;
    };
    rank: number;
    coefficient: number;
    isIncludedInGradeBook: boolean;
    exams: ExamDTO[];
    hasSubSubjects: boolean;
    subSubjects: SubSubjectOfClassTypeDTO[];
};

declare const body$2j: z.ZodIntersection<z.ZodObject<{
    name: z.ZodString;
    subLevelNewId: z.ZodString;
    sectionNewId: z.ZodOptional<z.ZodString>;
    capacity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    capacity: number;
    subLevelNewId: string;
    sectionNewId?: string | undefined;
}, {
    name: string;
    capacity: number;
    subLevelNewId: string;
    sectionNewId?: string | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    isTerminal: z.ZodLiteral<true>;
    nextClassTypeNewIds: z.ZodUndefined;
}, "strip", z.ZodTypeAny, {
    isTerminal: true;
    nextClassTypeNewIds?: undefined;
}, {
    isTerminal: true;
    nextClassTypeNewIds?: undefined;
}>, z.ZodObject<{
    isTerminal: z.ZodLiteral<false>;
    nextClassTypeNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    isTerminal: false;
    nextClassTypeNewIds: string[];
}, {
    isTerminal: false;
    nextClassTypeNewIds: string[];
}>]>>;
type TBody$2j = z.infer<typeof body$2j>;
type AddClassTypeValidation = {
    body: TBody$2j;
    params: never;
    query: never;
};

type AddClassTypeRouteConfig = AddClassTypeValidation & {
    files: never;
};
type AddClassTypeResponse = ClassTypeDto;

declare const addClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddClassTypeByAdminRouteTypes = AddClassTypeRouteConfig & {
    response: APIResponse<AddClassTypeResponse>;
};

declare const body$2i: z.ZodObject<{
    name: z.ZodString;
    subjectTypeNewIds: z.ZodArray<z.ZodString, "many">;
    coefficient: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    coefficient: number;
    subjectTypeNewIds: string[];
}, {
    name: string;
    coefficient: number;
    subjectTypeNewIds: string[];
}>;
type TBody$2i = z.infer<typeof body$2i>;
declare const params$3K: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3K = z.infer<typeof params$3K>;
type AddFieldToClassTypeValidation = {
    body: TBody$2i;
    params: TParams$3K;
    query: never;
};

type AddFieldToClassTypeRouteConfig = AddFieldToClassTypeValidation & {
    files: never;
};
type AddFieldToClassTypeResponse = void;

declare const addFieldToClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddFieldToClassTypeByAdminRouteTypes = AddFieldToClassTypeRouteConfig & {
    response: APIResponse<AddFieldToClassTypeResponse>;
};

declare const body$2h: z.ZodObject<{
    subSubjectTypeNewId: z.ZodString;
    coefficient: z.ZodNumber;
    exams: z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    coefficient: number;
    exams: {
        coefficient: number;
        examTypeNewId: string;
    }[];
    subSubjectTypeNewId: string;
}, {
    coefficient: number;
    exams: {
        coefficient: number;
        examTypeNewId: string;
    }[];
    subSubjectTypeNewId: string;
}>;
type TBody$2h = z.infer<typeof body$2h>;
declare const params$3J: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}>;
type TParams$3J = z.infer<typeof params$3J>;
type AddSubSubjectToClassTypeValidation = {
    body: TBody$2h;
    params: TParams$3J;
    query: never;
};

type AddSubSubjectToClassTypeRouteConfig = AddSubSubjectToClassTypeValidation & {
    files: never;
};
type AddSubSubjectToClassTypeResponse = void;

declare const addSubSubjectToClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddSubSubjectToClassTypeByAdminRouteTypes = AddSubSubjectToClassTypeRouteConfig & {
    response: APIResponse<AddSubSubjectToClassTypeResponse>;
};

declare const body$2g: z.ZodObject<{
    subjectTypeNewId: z.ZodString;
    coefficient: z.ZodNumber;
    exams: z.ZodOptional<z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    coefficient: number;
    subjectTypeNewId: string;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}, {
    coefficient: number;
    subjectTypeNewId: string;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}>;
type TBody$2g = z.infer<typeof body$2g>;
declare const params$3I: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3I = z.infer<typeof params$3I>;
type AddSubjectToClassTypeValidation = {
    body: TBody$2g;
    params: TParams$3I;
    query: never;
};

type AddSubjectToClassTypeRouteConfig = AddSubjectToClassTypeValidation & {
    files: never;
};
type AddSubjectToClassTypeResponse = void;

declare const addSubjectToClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddSubjectToClassTypeByAdminRouteTypes = AddSubjectToClassTypeRouteConfig & {
    response: APIResponse<AddSubjectToClassTypeResponse>;
};

declare const params$3H: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3H = z.infer<typeof params$3H>;
type DeleteClassTypeValidation = {
    params: TParams$3H;
    body: never;
    query: never;
};

type DeleteClassTypeRouteConfig = DeleteClassTypeValidation & {
    files: never;
};
type DeleteClassTypeResponse = void;

declare const deleteClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteClassTypeByAdminRouteTypes = DeleteClassTypeRouteConfig & {
    response: APIResponse<DeleteClassTypeResponse>;
};

declare const params$3G: z.ZodObject<{
    classTypeNewId: z.ZodString;
    fieldIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    fieldIndex: number;
}, {
    classTypeNewId: string;
    fieldIndex: number;
}>;
type TParams$3G = z.infer<typeof params$3G>;
type DeleteFieldFromClassTypeValidation = {
    body: never;
    params: TParams$3G;
    query: never;
};

type DeleteFieldFromClassTypeRouteConfig = DeleteFieldFromClassTypeValidation & {
    files: never;
};
type DeleteFieldFromClassTypeResponse = void;

declare const deleteFieldFromClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteFieldFromClassTypeByAdminRouteTypes = DeleteFieldFromClassTypeRouteConfig & {
    response: APIResponse<DeleteFieldFromClassTypeResponse>;
};

declare const params$3F: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subSubjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subSubjectNewId: string;
}, {
    classTypeNewId: string;
    subSubjectNewId: string;
}>;
type TParams$3F = z.infer<typeof params$3F>;
type DeleteSubSubjectFromClassTypeValidation = {
    body: never;
    params: TParams$3F;
    query: never;
};

type DeleteSubSubjectFromClassTypeRouteConfig = DeleteSubSubjectFromClassTypeValidation & {
    files: never;
};
type DeleteSubSubjectFromClassTypeResponse = void;

declare const deleteSubSubjectFromClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSubSubjectFromClassTypeByAdminRouteTypes = DeleteSubSubjectFromClassTypeRouteConfig & {
    response: APIResponse<DeleteSubSubjectFromClassTypeResponse>;
};

declare const params$3E: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}>;
type TParams$3E = z.infer<typeof params$3E>;
type DeleteSubjectFromClassTypeValidation = {
    body: never;
    params: TParams$3E;
    query: never;
};

type DeleteSubjectFromClassTypeRouteConfig = DeleteSubjectFromClassTypeValidation & {
    files: never;
};
type DeleteSubjectFromClassTypeResponse = void;

declare const deleteSubjectFromClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSubjectFromClassTypeByAdminRouteTypes = DeleteSubjectFromClassTypeRouteConfig & {
    response: APIResponse<DeleteSubjectFromClassTypeResponse>;
};

declare const params$3D: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3D = z.infer<typeof params$3D>;
type GetClassTypeValidation = {
    body: never;
    params: TParams$3D;
    query: never;
};

type GetClassTypeRouteConfig = GetClassTypeValidation & {
    files: never;
};
type GetClassTypeResponse = Pick<ClassType, "newId" | "_id" | "name">;

declare const getClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetClassTypeByAdminRouteTypes = GetClassTypeRouteConfig & {
    response: APIResponse<GetClassTypeResponse>;
};

declare const params$3C: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3C = z.infer<typeof params$3C>;
type GetFieldsOfClassTypeValidation = {
    body: never;
    params: TParams$3C;
    query: never;
};

type GetFieldsOfClassTypeRouteConfig = GetFieldsOfClassTypeValidation & {
    files: never;
};
type GetFieldsOfClassTypeResponse = FieldOfClassTypeDTO[];

declare const getFieldsOfClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetFieldsOfClassTypeByAdminRouteTypes = GetFieldsOfClassTypeRouteConfig & {
    response: APIResponse<GetFieldsOfClassTypeResponse>;
};

declare const params$3B: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3B = z.infer<typeof params$3B>;
type GetSubjectsOfClassTypesValidation = {
    body: never;
    params: TParams$3B;
    query: never;
};

type GetSubjectsOfClassTypesRouteConfig = GetSubjectsOfClassTypesValidation & {
    files: never;
};
type GetSubjectsOfClassTypesResponse = SubjectOfClassTypeDTO[];

declare const getSubjectsOfClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSubjectsOfClassTypesByAdminRouteTypes = GetSubjectsOfClassTypesRouteConfig & {
    response: APIResponse<GetSubjectsOfClassTypesResponse>;
};

declare const query$2c: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    levelNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subLevelNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sectionNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    levelNewIds?: string[] | undefined;
    subLevelNewIds?: string[] | undefined;
    sectionNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    levelNewIds?: string[] | undefined;
    subLevelNewIds?: string[] | undefined;
    sectionNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2b = z.infer<typeof query$2c>;
type ListClassTypesValidation$2 = {
    body: never;
    params: never;
    query: TQuery$2b;
};

type ListClassTypesRouteConfig$2 = ListClassTypesValidation$2 & {
    files: never;
};
type ListClassTypesResponse$2 = ResponseWithPagination<ClassTypeDto>;

declare const listClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassTypesByAdminRouteTypes = ListClassTypesRouteConfig$2 & {
    response: APIResponse<ListClassTypesResponse$2>;
};

declare const query$2b: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    subLevelNewId: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    subLevelNewId: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    subLevelNewId: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2a = z.infer<typeof query$2b>;
type ListNextClassTypesValidation = {
    body: never;
    params: never;
    query: TQuery$2a;
};

type ListNextClassTypesRouteConfig = ListNextClassTypesValidation & {
    files: never;
};
type ListNextClassTypesResponse = ResponseWithPagination<ClassTypeDto>;

declare const listNextClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListNextClassTypesByAdminRouteTypes = ListNextClassTypesRouteConfig & {
    response: APIResponse<ListNextClassTypesResponse>;
};

declare const body$2f: z.ZodObject<{
    oldRank: z.ZodNumber;
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
    oldRank: number;
}, {
    newRank: number;
    oldRank: number;
}>;
type TBody$2f = z.infer<typeof body$2f>;
declare const params$3A: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3A = z.infer<typeof params$3A>;
type ReorderFieldsOfClassTypesValidation = {
    body: TBody$2f;
    params: TParams$3A;
    query: never;
};

type ReorderFieldsOfClassTypesRouteConfig = ReorderFieldsOfClassTypesValidation & {
    files: never;
};
type ReorderFieldsOfClassTypesResponse = void;

declare const reorderFieldsOfClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderFieldsOfClassTypesByAdminRouteTypes = ReorderFieldsOfClassTypesRouteConfig & {
    response: APIResponse<ReorderFieldsOfClassTypesResponse>;
};

declare const body$2e: z.ZodObject<{
    oldRank: z.ZodNumber;
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
    oldRank: number;
}, {
    newRank: number;
    oldRank: number;
}>;
type TBody$2e = z.infer<typeof body$2e>;
declare const params$3z: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}>;
type TParams$3z = z.infer<typeof params$3z>;
type ReorderSubSubjectsOfClassTypesValidation = {
    body: TBody$2e;
    params: TParams$3z;
    query: never;
};

type ReorderSubSubjectsOfClassTypesRouteConfig = ReorderSubSubjectsOfClassTypesValidation & {
    files: never;
};
type ReorderSubSubjectsOfClassTypesResponse = void;

declare const reorderSubSubjectsOfClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderSubSubjectsOfClassTypesByAdminRouteTypes = ReorderSubSubjectsOfClassTypesRouteConfig & {
    response: APIResponse<ReorderSubSubjectsOfClassTypesResponse>;
};

declare const body$2d: z.ZodObject<{
    oldRank: z.ZodNumber;
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
    oldRank: number;
}, {
    newRank: number;
    oldRank: number;
}>;
type TBody$2d = z.infer<typeof body$2d>;
declare const params$3y: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3y = z.infer<typeof params$3y>;
declare const query$2a: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
type TQuery$29 = z.infer<typeof query$2a>;
type ReorderSubjectsOfClassTypesValidation = {
    body: TBody$2d;
    params: TParams$3y;
    query: TQuery$29;
};

type ReorderSubjectsOfClassTypesRouteConfig = ReorderSubjectsOfClassTypesValidation & {
    files: never;
};
type ReorderSubjectsOfClassTypesResponse = void;

declare const reorderSubjectsOfClassTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderSubjectsOfClassTypesByAdminRouteTypes = ReorderSubjectsOfClassTypesRouteConfig & {
    response: APIResponse<ReorderSubjectsOfClassTypesResponse>;
};

declare const body$2c: z.ZodIntersection<z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    capacity: z.ZodOptional<z.ZodNumber>;
    sectionNewId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isTerminal: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    subLevelNewId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    capacity?: number | undefined;
    sectionNewId?: string | undefined;
    isTerminal?: boolean | undefined;
    subLevelNewId?: string | undefined;
}, {
    name?: string | undefined;
    capacity?: number | undefined;
    sectionNewId?: string | undefined;
    isTerminal?: boolean | undefined;
    subLevelNewId?: string | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    nextClassTypeNewIds: z.ZodArray<z.ZodString, "many">;
    isTerminal: z.ZodLiteral<false>;
}, "strip", z.ZodTypeAny, {
    isTerminal: false;
    nextClassTypeNewIds: string[];
}, {
    isTerminal: false;
    nextClassTypeNewIds: string[];
}>, z.ZodObject<{
    nextClassTypeNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isTerminal: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    isTerminal: true;
    nextClassTypeNewIds?: string[] | undefined;
}, {
    isTerminal: true;
    nextClassTypeNewIds?: string[] | undefined;
}>]>>;
type TBody$2c = z.infer<typeof body$2c>;
declare const params$3x: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$3x = z.infer<typeof params$3x>;
type UpdateClassTypeValidation = {
    body: TBody$2c;
    params: TParams$3x;
    query: never;
};

type UpdateClassTypeRouteConfig = UpdateClassTypeValidation & {
    files: never;
};
type UpdateClassTypeResponse = void;

declare const updateClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateClassTypeByAdminRouteTypes = UpdateClassTypeRouteConfig & {
    response: APIResponse<UpdateClassTypeResponse>;
};

declare const body$2b: z.ZodObject<{
    name: z.ZodString;
    subjectTypeNewIds: z.ZodArray<z.ZodString, "many">;
    coefficient: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    coefficient: number;
    subjectTypeNewIds: string[];
}, {
    name: string;
    coefficient: number;
    subjectTypeNewIds: string[];
}>;
type TBody$2b = z.infer<typeof body$2b>;
declare const params$3w: z.ZodObject<{
    classTypeNewId: z.ZodString;
    fieldRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    fieldRank: number;
}, {
    classTypeNewId: string;
    fieldRank: number;
}>;
type TParams$3w = z.infer<typeof params$3w>;
type UpdateFieldOfClassTypeValidation = {
    body: TBody$2b;
    params: TParams$3w;
    query: never;
};

type UpdateFieldOfClassTypeRouteConfig = UpdateFieldOfClassTypeValidation & {
    files: never;
};
type UpdateFieldOfClassTypeResponse = void;

declare const updateFieldOfClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateFieldOfClassTypeByAdminRouteTypes = UpdateFieldOfClassTypeRouteConfig & {
    response: APIResponse<UpdateFieldOfClassTypeResponse>;
};

declare const body$2a: z.ZodObject<{
    coefficient: z.ZodOptional<z.ZodNumber>;
    exams: z.ZodOptional<z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    coefficient?: number | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}, {
    coefficient?: number | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}>;
type TBody$2a = z.infer<typeof body$2a>;
declare const params$3v: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subSubjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subSubjectNewId: string;
}, {
    classTypeNewId: string;
    subSubjectNewId: string;
}>;
type TParams$3v = z.infer<typeof params$3v>;
type UpdateSubSubjectOfClassTypeValidation = {
    body: TBody$2a;
    params: TParams$3v;
    query: never;
};

type UpdateSubSubjectOfClassTypeRouteConfig = UpdateSubSubjectOfClassTypeValidation & {
    files: never;
};
type UpdateSubSubjectOfClassTypeResponse = void;

declare const updateSubSubjectOfClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSubSubjectOfClassTypeByAdminRouteTypes = UpdateSubSubjectOfClassTypeRouteConfig & {
    response: APIResponse<UpdateSubSubjectOfClassTypeResponse>;
};

declare const body$29: z.ZodObject<{
    coefficient: z.ZodOptional<z.ZodNumber>;
    exams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    coefficient?: number | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}, {
    coefficient?: number | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
}>;
type TBody$29 = z.infer<typeof body$29>;
declare const params$3u: z.ZodObject<{
    classTypeNewId: z.ZodString;
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}, {
    classTypeNewId: string;
    subjectTypeNewId: string;
}>;
type TParams$3u = z.infer<typeof params$3u>;
type UpdateSubjectOfClassTypeValidation = {
    body: TBody$29;
    params: TParams$3u;
    query: never;
};

type UpdateSubjectOfClassTypeRouteConfig = UpdateSubjectOfClassTypeValidation & {
    files: never;
};
type UpdateSubjectOfClassTypeResponse = void;

declare const updateSubjectOfClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSubjectOfClassTypeByAdminRouteTypes = UpdateSubjectOfClassTypeRouteConfig & {
    response: APIResponse<UpdateSubjectOfClassTypeResponse>;
};

declare const query$29: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    schoolSubdomain: z.ZodString;
    levelNewIds: z.ZodArray<z.ZodString, "many">;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    schoolSubdomain: string;
    levelNewIds: string[];
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    schoolSubdomain: string;
    levelNewIds: string[];
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$28 = z.infer<typeof query$29>;
type ListClassTypesValidation$1 = {
    body: never;
    params: never;
    query: TQuery$28;
};

type ListClassTypesRouteConfig$1 = ListClassTypesValidation$1 & {
    files: never;
};
type ListClassTypesResponse$1 = ResponseWithPagination<{
    _id: ID$1;
    newId: string;
    name: string;
}>;

declare const listClassTypesByPublicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassTypesByPublicRouteTypes = ListClassTypesRouteConfig$1 & {
    response: APIResponse<ListClassTypesResponse$1>;
};

declare const query$28: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$27 = z.infer<typeof query$28>;
type ListClassTypesValidation = {
    body: never;
    params: never;
    query: TQuery$27;
};

type ListClassTypesRouteConfig = ListClassTypesValidation & {
    files: never;
};
type ListClassTypesResponse = ResponseWithPagination<ClassTypeDto>;

declare const listClassTypesByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassTypesByTeacherRouteTypes = ListClassTypesRouteConfig & {
    response: APIResponse<ListClassTypesResponse>;
};

declare const body$28: z.ZodObject<{
    name: z.ZodString;
    allowAllSubjects: z.ZodOptional<z.ZodBoolean>;
    allowAllSessionTypes: z.ZodOptional<z.ZodBoolean>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    sessionTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    allowAllSubjects?: boolean | undefined;
    allowAllSessionTypes?: boolean | undefined;
    subjectTypes?: ID$1[] | undefined;
    sessionTypes?: ID$1[] | undefined;
}, {
    name: string;
    allowAllSubjects?: boolean | undefined;
    allowAllSessionTypes?: boolean | undefined;
    subjectTypes?: ID$1[] | undefined;
    sessionTypes?: ID$1[] | undefined;
}>;
type TBody$28 = z.infer<typeof body$28>;
type AddClassroomValidation = {
    body: TBody$28;
    params: never;
    query: never;
};

type AddClassroomRouteConfig = AddClassroomValidation & {
    files: never;
};
type AddClassroomResponse = void;

declare const addClassroomByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddClassroomByAdminRouteTypes = AddClassroomRouteConfig & {
    response: APIResponse<AddClassroomResponse>;
};

declare const params$3t: z.ZodObject<{
    classroomNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classroomNewId: string;
}, {
    classroomNewId: string;
}>;
type TParams$3t = z.infer<typeof params$3t>;
type DeleteClassroomValidation = {
    body: never;
    params: TParams$3t;
    query: never;
};

type DeleteClassroomRouteConfig = DeleteClassroomValidation & {
    files: never;
};
type DeleteClassroomResponse = void;

declare const deleteClassroomByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteClassroomByAdminRouteTypes = DeleteClassroomRouteConfig & {
    response: APIResponse<DeleteClassroomResponse>;
};

declare const query$27: z.ZodObject<{
    startTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    sessionNewId: z.ZodOptional<z.ZodString>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
}, "strip", z.ZodTypeAny, {
    startTime: string
    endTime: string
    sessionNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}, {
    startTime: (string | Date) & (string | string| undefined);
    endTime: (string | Date) & (string | string| undefined);
    sessionNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}>;
type TQuery$26 = z.infer<typeof query$27>;
type GetAvailableClassroomValidation = {
    body: never;
    params: never;
    query: TQuery$26;
};

type GetAvailableClassroomRouteConfig = GetAvailableClassroomValidation & {
    files: never;
};
type GetAvailableClassroomResponse = EntityDto[];

declare const getAvailableClassroomByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetAvailableClassroomByAdminRouteTypes = GetAvailableClassroomRouteConfig & {
    response: APIResponse<GetAvailableClassroomResponse>;
};

declare const query$26: z.ZodObject<{
    startTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    endTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    weeklySessionNewId: z.ZodOptional<z.ZodString>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
}, "strip", z.ZodTypeAny, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    weeklySessionNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    weeklySessionNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}>;
type TQuery$25 = z.infer<typeof query$26>;
type GetAvailableClassroomInWeeklySessionValidation = {
    body: never;
    params: never;
    query: TQuery$25;
};

type GetAvailableClassroomInWeeklySessionRouteConfig = GetAvailableClassroomInWeeklySessionValidation & {
    files: never;
};
type GetAvailableClassroomInWeeklySessionResponse = EntityDto[];

declare const getAvailableClassroomInWeeklySessionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetAvailableClassroomInWeeklySessionByAdminRouteTypes = GetAvailableClassroomInWeeklySessionRouteConfig & {
    response: APIResponse<GetAvailableClassroomInWeeklySessionResponse>;
};

type ClassroomDTO = {
    _id: string;
    newId: string;
    name: string;
    allowAllSubjects: boolean;
    allowAllSessionTypes: boolean;
    subjectTypes: {
        _id: string;
        newId: string;
        name: string;
    }[];
    sessionTypes: {
        _id: string;
        newId: string;
        name: string;
    }[];
};

declare const query$25: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$24 = z.infer<typeof query$25>;
type ListClassroomsValidation = {
    body: never;
    params: never;
    query: TQuery$24;
};

type ListClassroomsRouteConfig = ListClassroomsValidation & {
    files: never;
};
type ListClassroomsResponse = ResponseWithPagination<ClassroomDTO>;

declare const listClassroomsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListClassroomsByAdminRouteTypes = ListClassroomsRouteConfig & {
    response: APIResponse<ListClassroomsResponse>;
};

declare const body$27: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    allowAllSubjects: z.ZodOptional<z.ZodBoolean>;
    allowAllSessionTypes: z.ZodOptional<z.ZodBoolean>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    sessionTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    allowAllSubjects?: boolean | undefined;
    allowAllSessionTypes?: boolean | undefined;
    subjectTypes?: ID$1[] | undefined;
    sessionTypes?: ID$1[] | undefined;
}, {
    name?: string | undefined;
    allowAllSubjects?: boolean | undefined;
    allowAllSessionTypes?: boolean | undefined;
    subjectTypes?: ID$1[] | undefined;
    sessionTypes?: ID$1[] | undefined;
}>;
type TBody$27 = z.infer<typeof body$27>;
declare const params$3s: z.ZodObject<{
    classroomNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classroomNewId: string;
}, {
    classroomNewId: string;
}>;
type TParams$3s = z.infer<typeof params$3s>;
type UpdateClassroomValidation = {
    body: TBody$27;
    params: TParams$3s;
    query: never;
};

type UpdateClassroomRouteConfig = UpdateClassroomValidation & {
    files: never;
};
type UpdateClassroomResponse = void;

declare const updateClassroomByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateClassroomByAdminRouteTypes = UpdateClassroomRouteConfig & {
    response: APIResponse<UpdateClassroomResponse>;
};

declare const query$24: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    levels: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    dateInterval: z.ZodObject<{
        from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    }, "strip", z.ZodTypeAny, {
        from: string
        to: string
    }, {
        from: (string | Date) & (string | string| undefined);
        to: (string | Date) & (string | string| undefined);
    }>;
    tabName: z.ZodDefault<z.ZodEnum<["attendance", "observationGiven", "sessionCanceled"]>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    dateInterval: {
        from: string
        to: string
    };
    tabName: "attendance" | "observationGiven" | "sessionCanceled";
    search?: string | undefined;
    levels?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    dateInterval: {
        from: (string | Date) & (string | string| undefined);
        to: (string | Date) & (string | string| undefined);
    };
    search?: string | undefined;
    levels?: ID$1[] | undefined;
    tabName?: "attendance" | "observationGiven" | "sessionCanceled" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$23 = z.infer<typeof query$24>;
type GetDashboardValidation$3 = {
    body: never;
    params: never;
    query: TQuery$23;
};

type GetDashboardRouteConfig$3 = GetDashboardValidation$3 & {
    files: never;
};
type GetDashboardResponse$3 = AdminDashboardDTO;

declare const getDashboardByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetDashboardByAdminRouteTypes = GetDashboardRouteConfig$3 & {
    response: APIResponse<GetDashboardResponse$3>;
};

type HomeworkDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    description: string | null;
    teacher: UserProfileDTO | null;
    subjectType: EntityDto | null;
    subSubjectType: EntityDto | null;
    group: EntityDto | null;
    groupType: EntityDto | null;
    class: EntityDto | null;
    classGroup: EntityDto | null;
    files: IFile[];
    status: THomeworkStatusEnum;
    dueDate: string
    createdAt: string
};

type ObservationReasonDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    urgency: TObservationUrgencyEnum;
};

type ObservationDTO = {
    _id: ID$1;
    newId: string;
    students: UserProfileDTO[];
    teacher: UserProfileDTO | null;
    admin: UserProfileDTO | null;
    reason: ObservationReasonDTO;
    note: string;
    files: IFile[];
    issueDate: string
    topicName: string | null;
};

type SessionDTO = {
    _id: ID$1;
    newId: string;
    status: TSessionStatusEnum;
    topicName: string;
    topicNewId: string;
    className: string;
    classroom: EntityDto;
    startTime: string
    endTime: string
    classGroup: EntityDto | null;
    attendence: TAttendanceEnum | null;
    sessionType: EntityDto;
};

type UserDashboardDTO = {
    homeworks: HomeworkDTO[];
    observations: ObservationDTO[];
    schedule: SessionDTO[];
    posts: PostDTO[];
};

declare const query$23: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type Query = z.infer<typeof query$23>;
type GetDashboardValidation$2 = {
    query: Query;
    body: never;
    params: never;
};

type GetDashboardRouteConfig$2 = GetDashboardValidation$2 & {
    files: never;
};
type GetDashboardResponse$2 = UserDashboardDTO;

declare const getDashboardByParentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetDashboardByParentRouteTypes = GetDashboardRouteConfig$2 & {
    response: APIResponse<GetDashboardResponse$2>;
};

type GetDashboardValidation$1 = {
    body: never;
    params: never;
    query: never;
};

type GetDashboardRouteConfig$1 = GetDashboardValidation$1 & {
    files: never;
};
type GetDashboardResponse$1 = UserDashboardDTO;

declare const getDashboardByStudentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetDashboardByStudentRouteTypes = GetDashboardRouteConfig$1 & {
    response: APIResponse<GetDashboardResponse$1>;
};

type GetDashboardValidation = {
    body: never;
    params: never;
    query: never;
};

type GetDashboardRouteConfig = GetDashboardValidation & {
    files: never;
};
type GetDashboardResponse = UserDashboardDTO;

declare const getDashboardByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetDashboardByTeacherRouteTypes = GetDashboardRouteConfig & {
    response: APIResponse<GetDashboardResponse>;
};

declare const body$26: z.ZodEffects<z.ZodObject<{
    template: z.ZodNativeEnum<{
        readonly GREEN: "green";
        readonly GOLD: "gold";
        readonly BLUE: "blue";
        readonly RED: "red";
        readonly PURPLE: "purple";
    }>;
    maxAverage: z.ZodNumber;
    minAverage: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    minAverage: number;
    maxAverage: number;
    template: "blue" | "green" | "gold" | "red" | "purple";
}, {
    name: string;
    minAverage: number;
    maxAverage: number;
    template: "blue" | "green" | "gold" | "red" | "purple";
}>, {
    name: string;
    minAverage: number;
    maxAverage: number;
    template: "blue" | "green" | "gold" | "red" | "purple";
}, {
    name: string;
    minAverage: number;
    maxAverage: number;
    template: "blue" | "green" | "gold" | "red" | "purple";
}>;
type TBody$26 = z.infer<typeof body$26>;
type AddDiplomaValidation = {
    body: TBody$26;
    params: never;
    query: never;
};

type AddDiplomaRouteConfig = AddDiplomaValidation & {
    files: never;
};
type AddDiplomaResponse = Diploma;

declare const addDiplomaByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddDiplomaByAdminRouteTypes = AddDiplomaRouteConfig & {
    response: APIResponse<AddDiplomaResponse>;
};

declare const body$25: z.ZodObject<{
    newIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    newIds: string[];
}, {
    newIds: string[];
}>;
type TBody$25 = z.infer<typeof body$25>;
type DeleteDiplomaValidation = {
    body: TBody$25;
    params: never;
    query: never;
};

type DeleteDiplomaRouteConfig = DeleteDiplomaValidation & {
    files: never;
};
type DeleteDiplomaResponse = void;

declare const deleteDiplomaByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type DeleteDiplomaByAdminRouteTypes = DeleteDiplomaRouteConfig & {
    response: APIResponse<DeleteDiplomaResponse>;
};

type StudentDiplomaDTO = {
    schoolId: string;
    studentFullName: string;
    className: string;
    establishmentTitle: TEstablishmentTitleEnum;
    educationDepartment: string;
    schoolYearName: string;
    termName: string;
    diplomaName: string;
    schoolName: string;
    directorName: string | null;
    diplomaTemplate: string;
};

declare const params$3r: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3r = z.infer<typeof params$3r>;
declare const query$22: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$22 = z.infer<typeof query$22>;
type GetClassDiplomasValidation = {
    body: never;
    params: TParams$3r;
    query: TQuery$22;
};

type GetClassDiplomasRouteConfig = GetClassDiplomasValidation & {
    files: never;
};
type GetClassDiplomasResponse = StudentDiplomaDTO[];

declare const getClassDiplomasByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetClassDiplomasByAdminRouteTypes = GetClassDiplomasRouteConfig & {
    response: APIResponse<GetClassDiplomasResponse>;
};

declare const params$3q: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$3q = z.infer<typeof params$3q>;
declare const query$21: z.ZodObject<{
    termNewId: z.ZodString;
    schoolYearId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}>;
type TQuery$21 = z.infer<typeof query$21>;
type GetStudentDiplomaValidation = {
    body: never;
    params: TParams$3q;
    query: TQuery$21;
};

type GetStudentDiplomaRouteConfig = GetStudentDiplomaValidation & {
    files: never;
};
type GetStudentDiplomaResponse = StudentDiplomaDTO;

declare const getStudentDiplomaByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentDiplomaByAdminRouteTypes = GetStudentDiplomaRouteConfig & {
    response: APIResponse<GetStudentDiplomaResponse>;
};

declare const query$20: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$20 = z.infer<typeof query$20>;
type ListDiplomasValidation = {
    query: TQuery$20;
    params: never;
    body: never;
};

type ListDiplomasRouteConfig = ListDiplomasValidation & {
    files: never;
};
type ListDiplomasResponse = ResponseWithPagination<Diploma>;

declare const listDiplomasByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListDiplomasByAdminRouteTypes = ListDiplomasRouteConfig & {
    response: APIResponse<ListDiplomasResponse>;
};

declare const body$24: z.ZodEffects<z.ZodObject<{
    template: z.ZodOptional<z.ZodNativeEnum<{
        readonly GREEN: "green";
        readonly GOLD: "gold";
        readonly BLUE: "blue";
        readonly RED: "red";
        readonly PURPLE: "purple";
    }>>;
    maxAverage: z.ZodOptional<z.ZodNumber>;
    minAverage: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    template?: "blue" | "green" | "gold" | "red" | "purple" | undefined;
    maxAverage?: number | undefined;
    minAverage?: number | undefined;
    name?: string | undefined;
}, {
    template?: "blue" | "green" | "gold" | "red" | "purple" | undefined;
    maxAverage?: number | undefined;
    minAverage?: number | undefined;
    name?: string | undefined;
}>, {
    template?: "blue" | "green" | "gold" | "red" | "purple" | undefined;
    maxAverage?: number | undefined;
    minAverage?: number | undefined;
    name?: string | undefined;
}, {
    template?: "blue" | "green" | "gold" | "red" | "purple" | undefined;
    maxAverage?: number | undefined;
    minAverage?: number | undefined;
    name?: string | undefined;
}>;
type TBody$24 = z.infer<typeof body$24>;
declare const params$3p: z.ZodObject<{
    diplomaNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    diplomaNewId: string;
}, {
    diplomaNewId: string;
}>;
type TParams$3p = z.infer<typeof params$3p>;
type UpdateDiplomaValidation = {
    body: TBody$24;
    params: TParams$3p;
    query: never;
};

type UpdateDiplomaRouteConfig = UpdateDiplomaValidation & {
    files: never;
};
type UpdateDiplomaResponse = Diploma;

declare const updateDiplomaByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateDiplomaByAdminRouteTypes = UpdateDiplomaRouteConfig & {
    response: APIResponse<UpdateDiplomaResponse>;
};

declare const body$23: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type TBody$23 = z.infer<typeof body$23>;
type AddExamTypeValidation = {
    body: TBody$23;
    params: never;
    query: never;
};

type AddExamTypeRouteConfig = AddExamTypeValidation & {
    files: never;
};
type AddExamTypeResponse = void;

declare const addExamTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddExamTypeByAdminRouteTypes = AddExamTypeRouteConfig & {
    response: APIResponse<AddExamTypeResponse>;
};

declare const params$3o: z.ZodObject<{
    examTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    examTypeNewId: string;
}, {
    examTypeNewId: string;
}>;
type TParams$3o = z.infer<typeof params$3o>;
type DeleteExamTypeValidation = {
    body: never;
    params: TParams$3o;
    query: never;
};

type DeleteExamTypeRouteConfig = DeleteExamTypeValidation & {
    files: never;
};
type DeleteExamTypeResponse = void;

declare const deleteExamTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteExamTypeByAdminRouteTypes = DeleteExamTypeRouteConfig & {
    response: APIResponse<DeleteExamTypeResponse>;
};

type ExamTypeDto = {
    _id: ID$1;
    name: string;
    newId: string;
    rank: number;
};

declare const query$1$: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    name?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1$ = z.infer<typeof query$1$>;
type ListExamTypesValidation = {
    body: never;
    params: never;
    query: TQuery$1$;
};

type ListExamTypesRouteConfig = ListExamTypesValidation & {
    files: never;
};
type ListExamTypesResponse = ResponseWithPagination<ExamTypeDto>;

declare const listExamTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListExamTypesByAdminRouteTypes = ListExamTypesRouteConfig & {
    response: APIResponse<ListExamTypesResponse>;
};

declare const body$22: z.ZodObject<{
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
}, {
    newRank: number;
}>;
type TBody$22 = z.infer<typeof body$22>;
declare const params$3n: z.ZodObject<{
    examTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    examTypeNewId: string;
}, {
    examTypeNewId: string;
}>;
type TParams$3n = z.infer<typeof params$3n>;
type ReorderExamTypeValidation = {
    body: TBody$22;
    params: TParams$3n;
    query: never;
};

type ReorderExamTypeRouteConfig = ReorderExamTypeValidation & {
    files: never;
};
type ReorderExamTypeResponse = void;

declare const reorderExamTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderExamTypeByAdminRouteTypes = ReorderExamTypeRouteConfig & {
    response: APIResponse<ReorderExamTypeResponse>;
};

declare const body$21: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
type TBody$21 = z.infer<typeof body$21>;
declare const params$3m: z.ZodObject<{
    examTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    examTypeNewId: string;
}, {
    examTypeNewId: string;
}>;
type TParams$3m = z.infer<typeof params$3m>;
type UpdateExamTypeValidation = {
    body: TBody$21;
    params: TParams$3m;
    query: never;
};

type UpdateExamTypeRouteConfig = UpdateExamTypeValidation & {
    files: never;
};
type UpdateExamTypeResponse = void;

declare const updateExamTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateExamTypeByAdminRouteTypes = UpdateExamTypeRouteConfig & {
    response: APIResponse<UpdateExamTypeResponse>;
};

declare const params$3l: z.ZodObject<{
    classNewId: z.ZodString;
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    termNewId: string;
}, {
    classNewId: string;
    termNewId: string;
}>;
type TParams$3l = z.infer<typeof params$3l>;
type CompleteTermValidation = {
    body: never;
    params: TParams$3l;
    query: never;
};

type CompleteTermRouteConfig = CompleteTermValidation & {
    files: never;
};
type CompleteTermResponse = void;

declare const completeTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CompleteTermByAdminRouteTypes = CompleteTermRouteConfig & {
    response: APIResponse<CompleteTermResponse>;
};

type AnnualAveragesOfClassDTO = {
    termNames: string[];
    studentAverages: {
        student: UserProfileDTO;
        termAverages: Record<string, string | null>;
        annualAverage: string | null;
        rank: number | null;
        promotionStatus: TPromotionStatusEnum;
    }[];
};

declare const params$3k: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3k = z.infer<typeof params$3k>;
type GetAnnualAveragesOfClassValidation = {
    body: never;
    params: TParams$3k;
    query: never;
};

type GetAnnualAveragesOfClassRouteConfig = GetAnnualAveragesOfClassValidation & {
    files: never;
};
type GetAnnualAveragesOfClassResponse = AnnualAveragesOfClassDTO;

declare const getAnnualAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAnnualAveragesOfClassByAdminRouteTypes = GetAnnualAveragesOfClassRouteConfig & {
    response: APIResponse<GetAnnualAveragesOfClassResponse>;
};

type LevelDegreesCoverageDTO = {
    levels: {
        level: {
            _id: string;
            newId: string;
            name: string;
            color: string;
        };
        subLevels: {
            name: string;
            areAllTermsCompleted: boolean;
            classesPreventingSwitch: {
                name: string;
                newId: string;
                id: string;
            }[];
        }[];
    }[];
    canSwitchToNextYear: boolean;
};

type GetLevelDegreesCoverageValidation = {
    body: never;
    params: never;
    query: never;
};

type GetLevelDegreesCoverageRouteConfig = GetLevelDegreesCoverageValidation & {
    files: never;
};
type GetLevelDegreesCoverageResponse = LevelDegreesCoverageDTO;

declare const getLevelDegreesCoverageByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetLevelDegreesCoverageByAdminRouteTypes = GetLevelDegreesCoverageRouteConfig & {
    response: APIResponse<GetLevelDegreesCoverageResponse>;
};

type NotPromotedStudentDTO = {
    students: {
        _id: string;
        newId: string;
        avatar: string;
        fullName: string;
        className: string;
        termAverages: Record<string, string | null>;
        annualAverage: string | null;
        promotionStatus: TPromotionStatusEnum;
    }[];
    termNames: string[];
};

type GetNotPromotedStudentsValidation = {
    body: never;
    params: never;
    query: never;
};

type GetNotPromotedStudentsRouteConfig = GetNotPromotedStudentsValidation & {
    files: never;
};
type GetNotPromotedStudentsResponse = NotPromotedStudentDTO;

declare const getNotPromotedStudentsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetNotPromotedStudentsByAdminRouteTypes = GetNotPromotedStudentsRouteConfig & {
    response: APIResponse<GetNotPromotedStudentsResponse>;
};

declare const params$3j: z.ZodObject<{
    classNewId: z.ZodString;
    termId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    termId: string;
}, {
    classNewId: string;
    termId: string;
}>;
type TParams$3j = z.infer<typeof params$3j>;
type HideTermValidation = {
    body: never;
    params: TParams$3j;
    query: never;
};

type HideTermRouteConfig = HideTermValidation & {
    files: never;
};
type HideTermResponse = void;

declare const hideTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type HideTermByAdminRouteTypes = HideTermRouteConfig & {
    response: APIResponse<HideTermResponse>;
};

declare const params$3i: z.ZodObject<{
    classNewId: z.ZodString;
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    termNewId: string;
}, {
    classNewId: string;
    termNewId: string;
}>;
type TParams$3i = z.infer<typeof params$3i>;
declare const body$20: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
type TBody$20 = z.infer<typeof body$20>;
type IncompleteTermValidation = {
    body: TBody$20;
    params: TParams$3i;
    query: never;
};

type IncompleteTermRouteConfig = IncompleteTermValidation & {
    files: never;
};
type IncompleteTermResponse = void;

declare const incompleteTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type IncompleteTermByAdminRouteTypes = IncompleteTermRouteConfig & {
    response: APIResponse<IncompleteTermResponse>;
};

declare const params$3h: z.ZodObject<{
    classNewId: z.ZodString;
    termId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    termId: string;
}, {
    classNewId: string;
    termId: string;
}>;
type TParams$3h = z.infer<typeof params$3h>;
type PublishTermValidation = {
    body: never;
    params: TParams$3h;
    query: never;
};

type PublishTermRouteConfig = PublishTermValidation & {
    files: never;
};
type PublishTermResponse = void;

declare const publishTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type PublishTermByAdminRouteTypes = PublishTermRouteConfig & {
    response: APIResponse<PublishTermResponse>;
};

declare const body$1$: z.ZodObject<{
    schoolYearName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolYearName: string;
}, {
    schoolYearName: string;
}>;
type TBody$1$ = z.infer<typeof body$1$>;
type SwitchLevelsToNextSchoolYearValidation = {
    body: TBody$1$;
    params: never;
    query: never;
};

type SwitchLevelsToNextSchoolYearRouteConfig = SwitchLevelsToNextSchoolYearValidation & {
    files: never;
};
type SwitchLevelsToNextSchoolYearResponse = void;

declare const switchLevelsToNextSchoolYearByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type SwitchLevelsToNextSchoolYearByAdminRouteTypes = SwitchLevelsToNextSchoolYearRouteConfig & {
    response: APIResponse<SwitchLevelsToNextSchoolYearResponse>;
};

declare const body$1_: z.ZodObject<{
    termNewId: z.ZodString;
    adminObservations: z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    adminObservations: Record<string, string | null>;
    termNewId: string;
}, {
    adminObservations: Record<string, string | null>;
    termNewId: string;
}>;
type TBody$1_ = z.infer<typeof body$1_>;
declare const params$3g: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3g = z.infer<typeof params$3g>;
type UpdateAdminObservationsValidation = {
    body: TBody$1_;
    params: TParams$3g;
    query: never;
};

type UpdateAdminObservationsRouteConfig = UpdateAdminObservationsValidation & {
    files: never;
};
type UpdateAdminObservationsResponse = void;

declare const updateAdminObservationsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateAdminObservationsByAdminRouteTypes = UpdateAdminObservationsRouteConfig & {
    response: APIResponse<UpdateAdminObservationsResponse>;
};

declare const body$1Z: z.ZodObject<{
    promotionStatus: z.ZodEnum<["EXCEPTIONALLY_PROMOTED", "NOT_PROMOTED"]>;
}, "strip", z.ZodTypeAny, {
    promotionStatus: "NOT_PROMOTED" | "EXCEPTIONALLY_PROMOTED";
}, {
    promotionStatus: "NOT_PROMOTED" | "EXCEPTIONALLY_PROMOTED";
}>;
type TBody$1Z = z.infer<typeof body$1Z>;
declare const params$3f: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$3f = z.infer<typeof params$3f>;
type UpdateStudentPromotionStatusValidation = {
    body: TBody$1Z;
    params: TParams$3f;
    query: never;
};

type UpdateStudentPromotionStatusRouteConfig = UpdateStudentPromotionStatusValidation & {
    files: never;
};
type UpdateStudentPromotionStatusResponse = void;

declare const updateStudentPromotionStatusByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateStudentPromotionStatusByAdminRouteTypes = UpdateStudentPromotionStatusRouteConfig & {
    response: APIResponse<UpdateStudentPromotionStatusResponse>;
};

type ChildCambridgeGradeReportDto = {
    terms: {
        newId: string;
        name: string;
        isLocked: boolean;
    }[];
    selectedTermNewId: string | null;
    studentAverage: string | null;
    studentRank: number | null;
    diplomaName: string | null;
    subjects: {
        name: string;
        average: string | null;
        gradeLetter: string | null;
        exams: {
            name: string;
            grade: string | null;
            gradeLetter: string | null;
        }[];
    }[] | null;
};

declare const params$3e: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$3e = z.infer<typeof params$3e>;
declare const query$1_: z.ZodObject<{
    termNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    termNewId?: string | undefined;
}, {
    termNewId?: string | undefined;
}>;
type TQuery$1_ = z.infer<typeof query$1_>;
type GetCambridgeChildGradeReportValidation = {
    body: never;
    params: TParams$3e;
    query: TQuery$1_;
};

type GetCambridgeChildGradeReportRouteConfig = GetCambridgeChildGradeReportValidation & {
    files: never;
};
type GetCambridgeChildGradeReportResponse = ChildCambridgeGradeReportDto;

declare const getCambridgeChildGradeReportRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeChildGradeReportRouteTypes = GetCambridgeChildGradeReportRouteConfig & {
    response: APIResponse<GetCambridgeChildGradeReportResponse>;
};

type CambridgeGradeReportDTO = {
    examGradeSystem: TExamGradeSystemEnum | null;
    student: {
        _id: string;
        newId: string;
        fullName: string;
        className: string;
        birthDate: string| null;
    };
    school: {
        _id: string;
        name: string;
        address: string | null;
        email: string | null;
        phoneNumber: string | null;
        educationDepartment: string | null;
        currentTermName: string;
        schoolYearName: string;
    };
    examNames: string[];
    gradeReport: {
        studentAverage: string | null;
        studentAverageEquivalence: string | null;
        studentLetterGrade: string | null;
        studentRank: number | null;
        subjects: {
            name: string;
            teacherName: string | null;
            studentAverage: string | null;
            studentAverageEquivalence: string | null;
            studentLetterGrade: string | null;
            studentRank: number | null;
            teacherObservation: string | null;
            grades: Record<string, string | null>;
        }[];
        studentDiploma: string | null;
    };
    letterGradeIntervals: {
        letter: string;
        interval: string;
    }[];
};

declare const params$3d: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$3d = z.infer<typeof params$3d>;
declare const query$1Z: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1Z = z.infer<typeof query$1Z>;
type GetCambridgeChildGradeReportPDFValidation = {
    body: never;
    params: TParams$3d;
    query: TQuery$1Z;
};

type GetCambridgeChildGradeReportPDFRouteConfig = GetCambridgeChildGradeReportPDFValidation & {
    files: never;
};
type GetCambridgeChildGradeReportPDFResponse = CambridgeGradeReportDTO;

declare const getCambridgeChildGradeReportPDFRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeChildGradeReportPDFRouteTypes = GetCambridgeChildGradeReportPDFRouteConfig & {
    response: APIResponse<GetCambridgeChildGradeReportPDFResponse>;
};

declare const body$1Y: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}>;
type TBody$1Y = z.infer<typeof body$1Y>;
declare const params$3c: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$3c = z.infer<typeof params$3c>;
type UpdateCambridgeGradesValidation = {
    body: TBody$1Y;
    params: TParams$3c;
    query: never;
};

type UpdateCambridgeGradesRouteConfig = UpdateCambridgeGradesValidation & {
    files: never;
};
type UpdateCambridgeGradesResponse = void;

declare const updateCambridgeGradesRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateCambridgeGradesRouteTypes = UpdateCambridgeGradesRouteConfig & {
    response: APIResponse<UpdateCambridgeGradesResponse>;
};

declare const body$1X: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodString>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}>;
type TBody$1X = z.infer<typeof body$1X>;
declare const params$3b: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$3b = z.infer<typeof params$3b>;
type UpdateCambridgeGradesOfGroupValidation = {
    body: TBody$1X;
    params: TParams$3b;
    query: never;
};

type UpdateCambridgeGradesOfGroupRouteConfig = UpdateCambridgeGradesOfGroupValidation & {
    files: never;
};
type UpdateCambridgeGradesOfGroupResponse = void;

declare const updateCambridgeGradesOfGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateCambridgeGradesOfGroupRouteTypes = UpdateCambridgeGradesOfGroupRouteConfig & {
    response: APIResponse<UpdateCambridgeGradesOfGroupResponse>;
};

type CambridgeAnnualGradeReportDTO = {
    student: {
        _id: string;
        newId: string;
        fullName: string;
        className: string;
        birthDate: string| null;
    };
    school: {
        _id: string;
        name: string;
        address: string | null;
        email: string | null;
        phoneNumber: string | null;
        schoolYearName: string;
    };
    termNames: string[];
    subjectGrades: {
        name: string;
        termGrades: Record<string, string | null>;
        annualGrade: string | null;
        annualGradeLetter: string | null;
    }[];
    adminObservation: string | null;
};

declare const params$3a: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$3a = z.infer<typeof params$3a>;
type GetAllCambridgeAnnualGradeReportsValidation = {
    body: never;
    params: TParams$3a;
    query: never;
};

type GetAllCambridgeAnnualGradeReportsRouteConfig = GetAllCambridgeAnnualGradeReportsValidation & {
    files: never;
};
type GetAllCambridgeAnnualGradeReportsResponse = CambridgeAnnualGradeReportDTO[];

declare const getAllCambridgeAnnualGradeReportsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllCambridgeAnnualGradeReportsByAdminRouteTypes = GetAllCambridgeAnnualGradeReportsRouteConfig & {
    response: APIResponse<GetAllCambridgeAnnualGradeReportsResponse>;
};

declare const params$39: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$39 = z.infer<typeof params$39>;
declare const query$1Y: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1Y = z.infer<typeof query$1Y>;
type GetAllCambridgeGradeReportsOfClassValidation = {
    body: never;
    params: TParams$39;
    query: TQuery$1Y;
};

type GetAllCambridgeGradeReportsOfClassRouteConfig = GetAllCambridgeGradeReportsOfClassValidation & {
    files: never;
};
type GetAllCambridgeGradeReportsOfClassResponse = CambridgeGradeReportDTO[];

declare const getAllCambridgeGradeReportsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllCambridgeGradeReportsOfClassByAdminRouteTypes = GetAllCambridgeGradeReportsOfClassRouteConfig & {
    response: APIResponse<GetAllCambridgeGradeReportsOfClassResponse>;
};

type CambridgeAnnualAveragesOfClassDTO = {
    termNames: string[];
    studentAverages: {
        student: UserProfileDTO;
        termAverages: Record<string, string | null>;
        annualAverage: string | null;
        rank: number | null;
        promotionStatus: TPromotionStatusEnum;
        adminObservation: string | null;
    }[];
};

declare const params$38: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$38 = z.infer<typeof params$38>;
type GetCambridgeAnnualAveragesOfClassValidation = {
    body: never;
    params: TParams$38;
    query: never;
};

type GetCambridgeAnnualAveragesOfClassRouteConfig = GetCambridgeAnnualAveragesOfClassValidation & {
    files: never;
};
type GetCambridgeAnnualAveragesOfClassResponse = CambridgeAnnualAveragesOfClassDTO;

declare const getCambridgeAnnualAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeAnnualAveragesOfClassByAdminRouteTypes = GetCambridgeAnnualAveragesOfClassRouteConfig & {
    response: APIResponse<GetCambridgeAnnualAveragesOfClassResponse>;
};

type CambridgeAveragesOfClassDTO = {
    stats: {
        studentWithHighestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        studentWithLowestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        numberOfStudents: number;
    };
    classAverages: {
        className: string;
        rank: number | null;
        average: string | null;
        numberOfStudents: number;
    }[];
    studentAverages: {
        student: UserProfileDTO;
        average: string | null;
        averageEquivalence: string | null;
        letterGrade: string | null;
        rank: number | null;
        diplomaName: string | null;
    }[];
};

declare const params$37: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$37 = z.infer<typeof params$37>;
declare const query$1X: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1X = z.infer<typeof query$1X>;
type GetCambridgeAveragesOfClassValidation = {
    body: never;
    params: TParams$37;
    query: TQuery$1X;
};

type GetCambridgeAveragesOfClassRouteConfig = GetCambridgeAveragesOfClassValidation & {
    files: never;
};
type GetCambridgeAveragesOfClassResponse = CambridgeAveragesOfClassDTO;

declare const getCambridgeAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeAveragesOfClassByAdminRouteTypes = GetCambridgeAveragesOfClassRouteConfig & {
    response: APIResponse<GetCambridgeAveragesOfClassResponse>;
};

type BlankExamPageDTO = {
    records: {
        student: UserProfileDTO;
        grades: Record<string, string | null>;
    }[];
    headers: string[];
    schoolInformation: {
        name: string;
        address: string | null;
        phoneNumber: string | null;
        email: string | null;
    };
    termName: string;
    className: string;
    teacherName: string | null;
    subjectName: string;
};

declare const params$36: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$36 = z.infer<typeof params$36>;
declare const query$1W: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1W = z.infer<typeof query$1W>;
type GetCambridgeBlankExamPageValidation = {
    body: never;
    params: TParams$36;
    query: TQuery$1W;
};

type GetCambridgeBlankExamPageRouteConfig = GetCambridgeBlankExamPageValidation & {
    files: never;
};
type GetCambridgeBlankExamPageResponse = BlankExamPageDTO;

declare const getCambridgeBlankExamPageByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeBlankExamPageByAdminRouteTypes = GetCambridgeBlankExamPageRouteConfig & {
    response: APIResponse<GetCambridgeBlankExamPageResponse>;
};

type CambridgeSubjectOfClassDTO = {
    canCompleteTerm: boolean;
    subjects: {
        name: string;
        newId: string;
        isCovered: boolean;
        degreesCovered: number;
        totalDegrees: number;
        teachers: UserProfileDTO[];
    }[];
};

declare const params$35: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$35 = z.infer<typeof params$35>;
declare const query$1V: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1V = z.infer<typeof query$1V>;
type GetCambridgeSubjectsOfClassValidation$1 = {
    body: never;
    params: TParams$35;
    query: TQuery$1V;
};

type GetCambridgeSubjectsOfClassRouteConfig$1 = GetCambridgeSubjectsOfClassValidation$1 & {
    files: never;
};
type GetCambridgeSubjectsOfClassResponse$1 = CambridgeSubjectOfClassDTO;

declare const getCambridgeSubjectsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeSubjectsOfClassByAdminRouteTypes = GetCambridgeSubjectsOfClassRouteConfig$1 & {
    response: APIResponse<GetCambridgeSubjectsOfClassResponse$1>;
};

type GradesOfCambridgeSubjectDTO = {
    subjectName: string;
    totalNumberOfStudents: number;
    highestAverage: string | null;
    lowestAverage: string | null;
    canEdit: boolean;
    headers: {
        name: string;
        examGradeId: ID$1;
        coefficient: number;
    }[];
    studentGrades: {
        student: UserProfileDTO;
        average: string | null;
        averageEquivalence: string | null;
        letterGrade: string | null;
        teacherObservation: string | null;
        grades: Record<string, string | null>;
    }[];
};

declare const params$34: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$34 = z.infer<typeof params$34>;
declare const query$1U: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1U = z.infer<typeof query$1U>;
type GetGradesOfCambridgeGroupValidation$1 = {
    body: never;
    params: TParams$34;
    query: TQuery$1U;
};

type GetGradesOfCambridgeGroupRouteConfig$1 = GetGradesOfCambridgeGroupValidation$1 & {
    files: never;
};
type GetGradesOfCambridgeGroupResponse$1 = GradesOfCambridgeSubjectDTO;

declare const getGradesOfCambridgeGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfCambridgeGroupByAdminRouteTypes = GetGradesOfCambridgeGroupRouteConfig$1 & {
    response: APIResponse<GetGradesOfCambridgeGroupResponse$1>;
};

declare const params$33: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$33 = z.infer<typeof params$33>;
declare const query$1T: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1T = z.infer<typeof query$1T>;
type GetGradesOfCambridgeSubjectValidation$1 = {
    body: never;
    params: TParams$33;
    query: TQuery$1T;
};

type GetGradesOfCambridgeSubjectRouteConfig$1 = GetGradesOfCambridgeSubjectValidation$1 & {
    files: never;
};
type GetGradesOfCambridgeSubjectResponse$1 = GradesOfCambridgeSubjectDTO;

declare const getGradesOfCambridgeSubjectByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfCambridgeSubjectByAdminRouteTypes = GetGradesOfCambridgeSubjectRouteConfig$1 & {
    response: APIResponse<GetGradesOfCambridgeSubjectResponse$1>;
};

declare const params$32: z.ZodObject<{
    classNewId: z.ZodString;
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
    classNewId: string;
}, {
    studentNewId: string;
    classNewId: string;
}>;
type TParams$32 = z.infer<typeof params$32>;
type GetStudentCambridgeAnnualGradeReportValidation = {
    body: never;
    params: TParams$32;
    query: never;
};

type GetStudentCambridgeAnnualGradeReportRouteConfig = GetStudentCambridgeAnnualGradeReportValidation & {
    files: never;
};
type GetStudentCambridgeAnnualGradeReportResponse = CambridgeAnnualGradeReportDTO;

declare const getStudentCambridgeAnnualGradeReportByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentCambridgeAnnualGradeReportByAdminRouteTypes = GetStudentCambridgeAnnualGradeReportRouteConfig & {
    response: APIResponse<GetStudentCambridgeAnnualGradeReportResponse>;
};

declare const params$31: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$31 = z.infer<typeof params$31>;
declare const query$1S: z.ZodObject<{
    termNewId: z.ZodString;
    schoolYearId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}>;
type TQuery$1S = z.infer<typeof query$1S>;
type GetStudentGradeReportCambridgeValidation = {
    body: never;
    params: TParams$31;
    query: TQuery$1S;
};

type GetStudentGradeReportCambridgeRouteConfig = GetStudentGradeReportCambridgeValidation & {
    files: never;
};
type GetStudentGradeReportCambridgeResponse = CambridgeGradeReportDTO;

declare const getStudentGradeReportCambridgeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentGradeReportCambridgeByAdminRouteTypes = GetStudentGradeReportCambridgeRouteConfig & {
    response: APIResponse<GetStudentGradeReportCambridgeResponse>;
};

declare const params$30: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$30 = z.infer<typeof params$30>;
declare const query$1R: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1R = z.infer<typeof query$1R>;
type GetCambridgeSubjectsOfClassValidation = {
    body: never;
    params: TParams$30;
    query: TQuery$1R;
};

type GetCambridgeSubjectsOfClassRouteConfig = GetCambridgeSubjectsOfClassValidation & {
    files: never;
};
type GetCambridgeSubjectsOfClassResponse = CambridgeSubjectOfClassDTO;

declare const getCambridgeSubjectsOfClassByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetCambridgeSubjectsOfClassByTeacherRouteTypes = GetCambridgeSubjectsOfClassRouteConfig & {
    response: APIResponse<GetCambridgeSubjectsOfClassResponse>;
};

declare const params$2$: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2$ = z.infer<typeof params$2$>;
declare const query$1Q: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1Q = z.infer<typeof query$1Q>;
type GetGradesOfCambridgeGroupValidation = {
    body: never;
    params: TParams$2$;
    query: TQuery$1Q;
};

type GetGradesOfCambridgeGroupRouteConfig = GetGradesOfCambridgeGroupValidation & {
    files: never;
};
type GetGradesOfCambridgeGroupResponse = GradesOfCambridgeSubjectDTO;

declare const getGradesOfCambridgeGroupByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfCambridgeGroupByTeacherRouteTypes = GetGradesOfCambridgeGroupRouteConfig & {
    response: APIResponse<GetGradesOfCambridgeGroupResponse>;
};

declare const params$2_: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2_ = z.infer<typeof params$2_>;
declare const query$1P: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1P = z.infer<typeof query$1P>;
type GetGradesOfCambridgeSubjectValidation = {
    body: never;
    params: TParams$2_;
    query: TQuery$1P;
};

type GetGradesOfCambridgeSubjectRouteConfig = GetGradesOfCambridgeSubjectValidation & {
    files: never;
};
type GetGradesOfCambridgeSubjectResponse = GradesOfCambridgeSubjectDTO;

declare const getGradesOfCambridgeSubjectByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfCambridgeSubjectByTeacherRouteTypes = GetGradesOfCambridgeSubjectRouteConfig & {
    response: APIResponse<GetGradesOfCambridgeSubjectResponse>;
};

declare const params$2Z: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2Z = z.infer<typeof params$2Z>;
declare const query$1O: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1O = z.infer<typeof query$1O>;
type GetGradesOfIBGroupValidation = {
    body: never;
    params: TParams$2Z;
    query: TQuery$1O;
};

type GradesOfIBSubjectDTO = {
    subjectName: string;
    totalNumberOfStudents: number;
    highestAverage: string | null;
    lowestAverage: string | null;
    canEdit: boolean;
    headers: {
        name: string;
        examGradeId: ID$1;
        coefficient: number;
    }[];
    studentGrades: {
        student: UserProfileDTO;
        average: string | null;
        investment: string | null;
        teacherObservation: string | null;
        grades: Record<string, string | null>;
    }[];
};

type GetGradesOfIBGroupRouteConfig = GetGradesOfIBGroupValidation & {
    files: never;
};
type GetGradesOfIBGroupResponse = GradesOfIBSubjectDTO;

declare const getGradesOfIBGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfIBGroupRouteTypes = GetGradesOfIBGroupRouteConfig & {
    response: APIResponse<GetGradesOfIBGroupResponse>;
};

declare const params$2Y: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2Y = z.infer<typeof params$2Y>;
declare const query$1N: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1N = z.infer<typeof query$1N>;
type GetGradesOfIBSubjectValidation = {
    body: never;
    params: TParams$2Y;
    query: TQuery$1N;
};

type GetGradesOfIBSubjectRouteConfig = GetGradesOfIBSubjectValidation & {
    files: never;
};
type GetGradesOfIBSubjectResponse = GradesOfIBSubjectDTO;

declare const getGradesOfIBSubjectRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfIBSubjectRouteTypes = GetGradesOfIBSubjectRouteConfig & {
    response: APIResponse<GetGradesOfIBSubjectResponse>;
};

type IBGradeReportDTO = {
    examGradeSystem: TExamGradeSystemEnum | null;
    student: {
        _id: string;
        newId: string;
        fullName: string;
        className: string;
        classTypeId: string;
    };
    school: {
        _id: string;
        directorName: string | null;
        currentTermName: string;
        schoolYearName: string;
    };
    examNames: string[];
    gradeReport: {
        studentAverage: string | null;
        subjects: {
            name: string;
            teacherName: string | null;
            studentAverage: string | null;
            teacherObservation: string | null;
            investment: string | null;
            grades: Record<string, string | null>;
        }[];
        adminObservation: string | null;
    };
    termNames: string[];
    termAverages: Record<string, string | null>;
    annualAverage: string | null;
    attendanceStats: {
        absent: number;
        late: number;
        expelled: number;
    };
};

declare const params$2X: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$2X = z.infer<typeof params$2X>;
declare const query$1M: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1M = z.infer<typeof query$1M>;
type GetIBChildGradeReportPDFValidation = {
    body: never;
    params: TParams$2X;
    query: TQuery$1M;
};

type GetIBChildGradeReportPDFRouteConfig = GetIBChildGradeReportPDFValidation & {
    files: never;
};
type GetIBChildGradeReportPDFResponse = IBGradeReportDTO;

declare const getIBChildGradeReportPDFRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBChildGradeReportPDFRouteTypes = GetIBChildGradeReportPDFRouteConfig & {
    response: APIResponse<GetIBChildGradeReportPDFResponse>;
};

type IBSubjectOfClassDTO = {
    canCompleteTerm: boolean;
    subjects: {
        name: string;
        newId: string;
        isCovered: boolean;
        degreesCovered: number;
        totalDegrees: number;
        teachers: UserProfileDTO[];
    }[];
};

declare const params$2W: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2W = z.infer<typeof params$2W>;
declare const query$1L: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1L = z.infer<typeof query$1L>;
type GetIBSubjectsOfClassValidation = {
    body: never;
    params: TParams$2W;
    query: TQuery$1L;
};

type GetIBSubjectsOfClassRouteConfig = GetIBSubjectsOfClassValidation & {
    files: never;
};
type GetIBSubjectsOfClassResponse = IBSubjectOfClassDTO;

declare const getIBSubjectsOfClassRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBSubjectsOfClassRouteTypes = GetIBSubjectsOfClassRouteConfig & {
    response: APIResponse<GetIBSubjectsOfClassResponse>;
};

declare const body$1W: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
    investments: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    investments: Record<string, string>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    investments: Record<string, string>;
}>;
type TBody$1W = z.infer<typeof body$1W>;
declare const params$2V: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2V = z.infer<typeof params$2V>;
type UpdateIBGradesOfClassValidation = {
    body: TBody$1W;
    params: TParams$2V;
    query: never;
};

type UpdateIBGradesOfClassRouteConfig = UpdateIBGradesOfClassValidation & {
    files: never;
};
type UpdateIBGradesOfClassResponse = void;

declare const updateIBGradesOfClassRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateIBGradesOfClassRouteTypes = UpdateIBGradesOfClassRouteConfig & {
    response: APIResponse<UpdateIBGradesOfClassResponse>;
};

declare const body$1V: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodString>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
    investments: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    investments: Record<string, string>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    investments: Record<string, string>;
}>;
type TBody$1V = z.infer<typeof body$1V>;
declare const params$2U: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2U = z.infer<typeof params$2U>;
type UpdateIBGradesOfGroupValidation = {
    body: TBody$1V;
    params: TParams$2U;
    query: never;
};

type UpdateIBGradesOfGroupRouteConfig = UpdateIBGradesOfGroupValidation & {
    files: never;
};
type UpdateIBGradesOfGroupResponse = void;

declare const updateIBGradesOfGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateIBGradesOfGroupRouteTypes = UpdateIBGradesOfGroupRouteConfig & {
    response: APIResponse<UpdateIBGradesOfGroupResponse>;
};

declare const params$2T: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2T = z.infer<typeof params$2T>;
declare const query$1K: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1K = z.infer<typeof query$1K>;
type GetAllIBGradeReportsOfClassValidation = {
    body: never;
    params: TParams$2T;
    query: TQuery$1K;
};

type GetAllIBGradeReportsOfClassRouteConfig = GetAllIBGradeReportsOfClassValidation & {
    files: never;
};
type GetAllIBGradeReportsOfClassResponse = IBGradeReportDTO[];

declare const getAllIBGradeReportsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllIBGradeReportsOfClassByAdminRouteTypes = GetAllIBGradeReportsOfClassRouteConfig & {
    response: APIResponse<GetAllIBGradeReportsOfClassResponse>;
};

type IBAdminObservationsDTO = {
    records: {
        student: UserProfileDTO;
        observation: string | null;
    }[];
};

declare const params$2S: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2S = z.infer<typeof params$2S>;
declare const query$1J: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1J = z.infer<typeof query$1J>;
type GetIBAdminObservationsValidation = {
    body: never;
    params: TParams$2S;
    query: TQuery$1J;
};

type GetIBAdminObservationsRouteConfig = GetIBAdminObservationsValidation & {
    files: never;
};
type GetIBAdminObservationsResponse = IBAdminObservationsDTO;

declare const getIBAdminObservationsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBAdminObservationsByAdminRouteTypes = GetIBAdminObservationsRouteConfig & {
    response: APIResponse<GetIBAdminObservationsResponse>;
};

declare const IB_ANNUAL_GRADE_LEVELS_ENUM: {
    readonly N0: "N0";
    readonly N1: "N1";
    readonly N2: "N2";
    readonly N3: "N3";
};
type TIBAnnualGradeLevelsEnum = (typeof IB_ANNUAL_GRADE_LEVELS_ENUM)[keyof typeof IB_ANNUAL_GRADE_LEVELS_ENUM];

type IBAnnualAveragesOfClassDTO = {
    termNames: string[];
    studentAverages: {
        student: UserProfileDTO;
        termAverages: Record<string, string | null>;
        annualAverage: string | null;
        promotionStatus: TPromotionStatusEnum;
        adminObservation: string | null;
        annualLevel: TIBAnnualGradeLevelsEnum | null;
    }[];
};

declare const params$2R: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2R = z.infer<typeof params$2R>;
type GetIBAnnualAveragesOfClassValidation = {
    body: never;
    params: TParams$2R;
    query: never;
};

type GetIBAnnualAveragesOfClassRouteConfig = GetIBAnnualAveragesOfClassValidation & {
    files: never;
};
type GetIBAnnualAveragesOfClassResponse = IBAnnualAveragesOfClassDTO;

declare const getIBAnnualAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBAnnualAveragesOfClassByAdminRouteTypes = GetIBAnnualAveragesOfClassRouteConfig & {
    response: APIResponse<GetIBAnnualAveragesOfClassResponse>;
};

type IBAveragesOfClassDTO = {
    numberOfStudents: number;
    studentAverages: {
        student: UserProfileDTO;
        average: string | null;
        diplomaName: string | null;
    }[];
};

declare const params$2Q: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2Q = z.infer<typeof params$2Q>;
declare const query$1I: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1I = z.infer<typeof query$1I>;
type GetIBAveragesOfClassValidation = {
    body: never;
    params: TParams$2Q;
    query: TQuery$1I;
};

type GetIBAveragesOfClassRouteConfig = GetIBAveragesOfClassValidation & {
    files: never;
};
type GetIBAveragesOfClassResponse = IBAveragesOfClassDTO;

declare const getIBAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBAveragesOfClassByAdminRouteTypes = GetIBAveragesOfClassRouteConfig & {
    response: APIResponse<GetIBAveragesOfClassResponse>;
};

declare const params$2P: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2P = z.infer<typeof params$2P>;
declare const query$1H: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1H = z.infer<typeof query$1H>;
type GetIBBlankExamPageValidation = {
    body: never;
    params: TParams$2P;
    query: TQuery$1H;
};

type GetIBBlankExamPageRouteConfig = GetIBBlankExamPageValidation & {
    files: never;
};
type GetIBBlankExamPageResponse = BlankExamPageDTO;

declare const getIBBlankExamPageByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBBlankExamPageByAdminRouteTypes = GetIBBlankExamPageRouteConfig & {
    response: APIResponse<GetIBBlankExamPageResponse>;
};

declare const params$2O: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$2O = z.infer<typeof params$2O>;
declare const query$1G: z.ZodObject<{
    termNewId: z.ZodString;
    schoolYearId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}>;
type TQuery$1G = z.infer<typeof query$1G>;
type GetIBStudentGradeReportValidation = {
    body: never;
    params: TParams$2O;
    query: TQuery$1G;
};

type GetIBStudentGradeReportRouteConfig = GetIBStudentGradeReportValidation & {
    files: never;
};
type GetIBStudentGradeReportResponse = IBGradeReportDTO;

declare const getIBStudentGradeReportByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetIBStudentGradeReportByAdminRouteTypes = GetIBStudentGradeReportRouteConfig & {
    response: APIResponse<GetIBStudentGradeReportResponse>;
};

type ChildPrimaryGradeReportDto = {
    terms: {
        newId: string;
        name: string;
        isLocked: boolean;
    }[];
    selectedTermNewId: string | null;
    studentAverage: string | null;
    studentRank: number | null;
    diplomaName: string | null;
    fields: {
        name: string;
        average: string | null;
        subjects: {
            name: string;
            average: string | null;
        }[];
    }[] | null;
};

declare const params$2N: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$2N = z.infer<typeof params$2N>;
declare const query$1F: z.ZodObject<{
    termNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    termNewId?: string | undefined;
}, {
    termNewId?: string | undefined;
}>;
type TQuery$1F = z.infer<typeof query$1F>;
type GetPrimaryChildGradeReportValidation = {
    body: never;
    params: TParams$2N;
    query: TQuery$1F;
};

type GetPrimaryChildGradeReportRouteConfig = GetPrimaryChildGradeReportValidation & {
    files: never;
};
type GetPrimaryChildGradeReportResponse = ChildPrimaryGradeReportDto;

declare const getPrimaryChildGradeReportRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryChildGradeReportRouteTypes = GetPrimaryChildGradeReportRouteConfig & {
    response: APIResponse<GetPrimaryChildGradeReportResponse>;
};

type PrimaryGradeReportDTO = {
    examGradeSystem: TExamGradeSystemEnum | null;
    templateName: string | null;
    student: {
        _id: string;
        newId: string;
        uniqueId: string | null;
        fullName: string;
        className: string;
    };
    school: {
        _id: string;
        name: string;
        address: string | null;
        email: string | null;
        phoneNumber: string | null;
        establishmentTitle: TEstablishmentTitleEnum;
        educationDepartment: string | null;
        schoolYearName: string;
        gradeReportTheme: TGradeReportThemEnum;
        termName: string;
    };
    gradeReport: {
        totalStudentNumber: number;
        studentAverage: string | null;
        studentRank: number | null;
        lowestAverage: string | null;
        highestAverage: string | null;
        fields: {
            name: string;
            studentAverage: string | null;
            teacherObservation: string | null;
            subjects: {
                name: string;
                studentGrade: string | null;
                highestGrade: string | null;
                lowestGrade: string | null;
                subSubjects: {
                    name: string;
                    studentGrade: string | null;
                    highestGrade: string | null;
                    lowestGrade: string | null;
                }[];
            }[];
        }[];
        studentDiploma: string | null;
        studentAnnualAverage: string | null;
    };
};

declare const params$2M: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$2M = z.infer<typeof params$2M>;
declare const query$1E: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1E = z.infer<typeof query$1E>;
type GetPrimaryChildGradeReportPDFValidation = {
    body: never;
    params: TParams$2M;
    query: TQuery$1E;
};

type GetPrimaryChildGradeReportPDFRouteConfig = GetPrimaryChildGradeReportPDFValidation & {
    files: never;
};
type GetPrimaryChildGradeReportPDFResponse = PrimaryGradeReportDTO[];

declare const getPrimaryChildGradeReportPDFRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryChildGradeReportPDFRouteTypes = GetPrimaryChildGradeReportPDFRouteConfig & {
    response: APIResponse<GetPrimaryChildGradeReportPDFResponse>;
};

declare const body$1U: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}>;
type TBody$1U = z.infer<typeof body$1U>;
declare const params$2L: z.ZodObject<{
    classNewId: z.ZodString;
    fieldIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    fieldIndex: string;
}, {
    classNewId: string;
    fieldIndex: string;
}>;
type TParams$2L = z.infer<typeof params$2L>;
type UpdatePrimaryGradesValidation = {
    body: TBody$1U;
    params: TParams$2L;
    query: never;
};

type UpdatePrimaryGradesRouteConfig = UpdatePrimaryGradesValidation & {
    files: never;
};
type UpdatePrimaryGradesResponse = void;

declare const updatePrimaryGradesRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdatePrimaryGradesRouteTypes = UpdatePrimaryGradesRouteConfig & {
    response: APIResponse<UpdatePrimaryGradesResponse>;
};

type PrimaryAnnualGradeReportDTO = {
    information: {
        schoolId: string;
        schoolName: string;
        schoolYearName: string;
        educationDepartment: string;
        address: string | null;
        phoneNumber: string | null;
        email: string | null;
        className: string;
        numberOfStudents: number;
        directorName: string | null;
    };
    student: {
        name: string;
        uniqueId: string | null;
        termNames: string[];
        termAverages: Record<string, string | null>;
        annualAverage: string | null;
        highestAnnualAverage: string | null;
        lowestAnnualAverage: string | null;
        promotionStatus: TPromotionStatusEnum;
    };
    teacherNames: string[];
    gradeReportTheme: TGradeReportThemEnum;
};

declare const params$2K: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2K = z.infer<typeof params$2K>;
type GetAllPrimaryAnnualGradeReportOfClassValidation = {
    body: never;
    params: TParams$2K;
    query: never;
};

type GetAllPrimaryAnnualGradeReportOfClassRouteConfig = GetAllPrimaryAnnualGradeReportOfClassValidation & {
    files: never;
};
type GetAllPrimaryAnnualGradeReportOfClassResponse = PrimaryAnnualGradeReportDTO[];

declare const getAllPrimaryAnnualGradeReportOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllPrimaryAnnualGradeReportOfClassByAdminRouteTypes = GetAllPrimaryAnnualGradeReportOfClassRouteConfig & {
    response: APIResponse<GetAllPrimaryAnnualGradeReportOfClassResponse>;
};

declare const params$2J: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2J = z.infer<typeof params$2J>;
declare const query$1D: z.ZodObject<{
    termNewId: z.ZodString;
    templateIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
    templateIds?: ID$1[] | undefined;
}, {
    termNewId: string;
    templateIds?: ID$1[] | undefined;
}>;
type TQuery$1D = z.infer<typeof query$1D>;
type GetAllPrimaryGradeReportsOfClassValidation = {
    body: never;
    params: TParams$2J;
    query: TQuery$1D;
};

type GetAllPrimaryGradeReportsOfClassRouteConfig = GetAllPrimaryGradeReportsOfClassValidation & {
    files: never;
};
type GetAllPrimaryGradeReportsOfClassResponse = PrimaryGradeReportDTO[];

declare const getAllPrimaryGradeReportsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllPrimaryGradeReportsOfClassByAdminRouteTypes = GetAllPrimaryGradeReportsOfClassRouteConfig & {
    response: APIResponse<GetAllPrimaryGradeReportsOfClassResponse>;
};

type ExamFieldListDTO = {
    canCompleteTerm: boolean;
    fields: {
        name: string;
        newId: string;
        subjects: {
            name: string;
            subSubjects: {
                name: string;
            }[];
            isCovered: boolean;
            degreesCovered: number;
            totalDegrees: number;
        }[];
        teachers: UserProfileDTO[];
    }[];
};

declare const params$2I: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2I = z.infer<typeof params$2I>;
declare const query$1C: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1C = z.infer<typeof query$1C>;
type GetFieldsOfClassValidation$1 = {
    body: never;
    params: TParams$2I;
    query: TQuery$1C;
};

type GetFieldsOfClassRouteConfig$1 = GetFieldsOfClassValidation$1 & {
    files: never;
};
type GetFieldsOfClassResponse$1 = ExamFieldListDTO;

declare const getFieldsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetFieldsOfClassByAdminRouteTypes = GetFieldsOfClassRouteConfig$1 & {
    response: APIResponse<GetFieldsOfClassResponse$1>;
};

type GradesOfFieldDTO = {
    fieldName: string;
    totalNumberOfStudents: number;
    highestAverage: string | null;
    lowestAverage: string | null;
    canEdit: boolean;
    headers: {
        name: string;
        examGradeId: ID$1;
        coefficient: number;
    }[];
    studentGrades: {
        student: UserProfileDTO;
        average: string | null;
        teacherObservation: string | null;
        grades: Record<string, string | null>;
    }[];
};

declare const params$2H: z.ZodObject<{
    classNewId: z.ZodString;
    fieldIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    fieldIndex: string;
}, {
    classNewId: string;
    fieldIndex: string;
}>;
type TParams$2H = z.infer<typeof params$2H>;
declare const query$1B: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1B = z.infer<typeof query$1B>;
type GetGradesOfFieldValidation$1 = {
    body: never;
    params: TParams$2H;
    query: TQuery$1B;
};

type GetGradesOfFieldRouteConfig$1 = GetGradesOfFieldValidation$1 & {
    files: never;
};
type GetGradesOfFieldResponse$1 = GradesOfFieldDTO;

declare const getGradesOfFieldByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfFieldByAdminRouteTypes = GetGradesOfFieldRouteConfig$1 & {
    response: APIResponse<GetGradesOfFieldResponse$1>;
};

declare const params$2G: z.ZodObject<{
    classNewId: z.ZodString;
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
    classNewId: string;
}, {
    studentNewId: string;
    classNewId: string;
}>;
type TParams$2G = z.infer<typeof params$2G>;
type GetPrimaryAnnualGradeReportOfStudentValidation = {
    body: never;
    params: TParams$2G;
    query: never;
};

type GetPrimaryAnnualGradeReportOfStudentRouteConfig = GetPrimaryAnnualGradeReportOfStudentValidation & {
    files: never;
};
type GetPrimaryAnnualGradeReportOfStudentResponse = PrimaryAnnualGradeReportDTO;

declare const getPrimaryAnnualGradeReportOfStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryAnnualGradeReportOfStudentByAdminRouteTypes = GetPrimaryAnnualGradeReportOfStudentRouteConfig & {
    response: APIResponse<GetPrimaryAnnualGradeReportOfStudentResponse>;
};

type PrimaryAveragesOfClassDTO = {
    stats: {
        studentWithHighestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        studentWithLowestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        numberOfStudents: number;
    };
    classAverages: {
        className: string;
        classNewId: string;
        rank: number | null;
        average: string | null;
        numberOfStudents: number;
    }[];
    studentAverages: {
        student: UserProfileDTO;
        average: string | null;
        rank: number | null;
        diplomaName: string | null;
    }[];
};

declare const params$2F: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2F = z.infer<typeof params$2F>;
declare const query$1A: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1A = z.infer<typeof query$1A>;
type GetPrimaryAveragesOfClassValidation = {
    body: never;
    params: TParams$2F;
    query: TQuery$1A;
};

type GetPrimaryAveragesOfClassRouteConfig = GetPrimaryAveragesOfClassValidation & {
    files: never;
};
type GetPrimaryAveragesOfClassResponse = PrimaryAveragesOfClassDTO;

declare const getPrimaryAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryAveragesOfClassByAdminRouteTypes = GetPrimaryAveragesOfClassRouteConfig & {
    response: APIResponse<GetPrimaryAveragesOfClassResponse>;
};

declare const params$2E: z.ZodObject<{
    classNewId: z.ZodString;
    fieldIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    fieldIndex: string;
}, {
    classNewId: string;
    fieldIndex: string;
}>;
type TParams$2E = z.infer<typeof params$2E>;
declare const query$1z: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1z = z.infer<typeof query$1z>;
type GetPrimaryBlankExamPageValidation = {
    body: never;
    params: TParams$2E;
    query: TQuery$1z;
};

type GetPrimaryBlankExamPageRouteConfig = GetPrimaryBlankExamPageValidation & {
    files: never;
};
type GetPrimaryBlankExamPageResponse = BlankExamPageDTO;

declare const getPrimaryBlankExamPageByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryBlankExamPageByAdminRouteTypes = GetPrimaryBlankExamPageRouteConfig & {
    response: APIResponse<GetPrimaryBlankExamPageResponse>;
};

type PrimaryGradeReportStatsDTO = {
    school: {
        name: string;
        educationDepartment: string;
        establishmentTitle: TEstablishmentTitleEnum;
        _id: string;
    };
    schoolYear: {
        name: string;
    };
    term: {
        name: string;
    };
    level: {
        name: string;
    };
    class: {
        name: string;
    };
    studentNumber: number;
    headers: {
        fieldName: string;
        topics: {
            name: string;
        }[];
    }[];
    studentStats: {
        diploma: {
            name: string;
        } | null;
        average: string | null;
        rank: number | null;
        fullName: string;
        fields: {
            [key: string]: string | number | null;
            rank: number | null;
            average: string | null;
            name: string;
        }[];
    }[];
    fields: {
        name: string;
        subjects: {
            name: string;
            highestGrade: string | null;
            lowestGrade: string | null;
            averageOfClass: string | null;
            studentBelowAverage: string;
            studentAboveAverage: string;
        }[];
        fieldStats: {
            highestGrade: string | null;
            lowestGrade: string | null;
            averageOfClass: string | null;
            studentBelowAverage: string;
            studentAboveAverage: string;
        };
    }[];
    globalStats: {
        termAverage: string | null;
        fieldAverages: {
            name: string;
            average: string | null;
        }[];
        diplomaNumbers: {
            name: string;
            number: number;
        }[];
        studentBelowAverageNumber: number;
        studentBelowAveragePercentage: string;
        studentAboveAverageNumber: number;
        studentAboveAveragePercentage: string;
    };
};

declare const params$2D: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2D = z.infer<typeof params$2D>;
declare const query$1y: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1y = z.infer<typeof query$1y>;
type GetPrimaryGradeReportStatsValidation = {
    body: never;
    params: TParams$2D;
    query: TQuery$1y;
};

type GetPrimaryGradeReportStatsRouteConfig = GetPrimaryGradeReportStatsValidation & {
    files: never;
};
type GetPrimaryGradeReportStatsResponse = PrimaryGradeReportStatsDTO;

declare const getPrimaryGradeReportStatsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPrimaryGradeReportStatsByAdminRouteTypes = GetPrimaryGradeReportStatsRouteConfig & {
    response: APIResponse<GetPrimaryGradeReportStatsResponse>;
};

declare const params$2C: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$2C = z.infer<typeof params$2C>;
declare const query$1x: z.ZodObject<{
    termNewId: z.ZodString;
    templateIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    schoolYearId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
    templateIds?: ID$1[] | undefined;
}, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
    templateIds?: ID$1[] | undefined;
}>;
type TQuery$1x = z.infer<typeof query$1x>;
type GetStudentGradeReportPrimaryValidation = {
    body: never;
    params: TParams$2C;
    query: TQuery$1x;
};

type GetStudentGradeReportPrimaryRouteConfig = GetStudentGradeReportPrimaryValidation & {
    files: never;
};
type GetStudentGradeReportPrimaryResponse = PrimaryGradeReportDTO[];

declare const getStudentGradeReportPrimaryByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentGradeReportPrimaryByAdminRouteTypes = GetStudentGradeReportPrimaryRouteConfig & {
    response: APIResponse<GetStudentGradeReportPrimaryResponse>;
};

declare const params$2B: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2B = z.infer<typeof params$2B>;
declare const query$1w: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1w = z.infer<typeof query$1w>;
type GetFieldsOfClassValidation = {
    body: never;
    params: TParams$2B;
    query: TQuery$1w;
};

type GetFieldsOfClassRouteConfig = GetFieldsOfClassValidation & {
    files: never;
};
type GetFieldsOfClassResponse = ExamFieldListDTO;

declare const getFieldsOfClassByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetFieldsOfClassByTeacherRouteTypes = GetFieldsOfClassRouteConfig & {
    response: APIResponse<GetFieldsOfClassResponse>;
};

declare const params$2A: z.ZodObject<{
    classNewId: z.ZodString;
    fieldIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    fieldIndex: string;
}, {
    classNewId: string;
    fieldIndex: string;
}>;
type TParams$2A = z.infer<typeof params$2A>;
declare const query$1v: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1v = z.infer<typeof query$1v>;
type GetGradesOfFieldValidation = {
    body: never;
    params: TParams$2A;
    query: TQuery$1v;
};

type GetGradesOfFieldRouteConfig = GetGradesOfFieldValidation & {
    files: never;
};
type GetGradesOfFieldResponse = GradesOfFieldDTO;

declare const getGradesOfFieldByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfFieldByTeacherRouteTypes = GetGradesOfFieldRouteConfig & {
    response: APIResponse<GetGradesOfFieldResponse>;
};

type ChildSecondaryGradeReportDto = {
    terms: {
        newId: string;
        name: string;
        isLocked: boolean;
    }[];
    selectedTermNewId: string | null;
    studentAverage: string | null;
    studentRank: number | null;
    diplomaName: string | null;
    subjects: {
        name: string;
        average: string | null;
        hasSubSubjects: boolean;
        exams: {
            name: string;
            grade: string | null;
        }[];
        subSubjects: {
            name: string;
            exams: {
                name: string;
                grade: string | null;
            }[];
        }[];
    }[] | null;
};

declare const params$2z: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$2z = z.infer<typeof params$2z>;
declare const query$1u: z.ZodObject<{
    termNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    termNewId?: string | undefined;
}, {
    termNewId?: string | undefined;
}>;
type TQuery$1u = z.infer<typeof query$1u>;
type GetSecondaryChildGradeReportValidation = {
    body: never;
    params: TParams$2z;
    query: TQuery$1u;
};

type GetSecondaryChildGradeReportRouteConfig = GetSecondaryChildGradeReportValidation & {
    files: never;
};
type GetSecondaryChildGradeReportResponse = ChildSecondaryGradeReportDto;

declare const getSecondaryChildGradeReportRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondaryChildGradeReportRouteTypes = GetSecondaryChildGradeReportRouteConfig & {
    response: APIResponse<GetSecondaryChildGradeReportResponse>;
};

type SecondaryGradeReportDTO = {
    examGradeSystem: TExamGradeSystemEnum | null;
    student: {
        _id: string;
        newId: string;
        fullName: string;
        className: string;
        uniqueId: string | null;
    };
    school: {
        _id: string;
        name: string;
        address: string | null;
        email: string | null;
        phoneNumber: string | null;
        establishmentTitle: TEstablishmentTitleEnum;
        educationDepartment: string | null;
        schoolYearName: string;
        termName: string;
        directorName: string | null;
        totalNumberOfStudents: number;
    };
    examNames: string[];
    gradeReport: {
        studentAverage: string | null;
        studentRank: number | null;
        subjects: {
            name: string;
            teacherName: string | null;
            coefficient: number;
            studentAverage: string | null;
            studentRank: number | null;
            teacherObservation: string | null;
            grades: Record<string, string | null>;
        }[];
        studentDiploma: string | null;
    };
    termAverages: {
        termName: string;
        average: string | null;
        rank: number | null;
        diplomaName: string | null;
    }[];
    promotionStatus: TPromotionStatusEnum | null;
};

declare const params$2y: z.ZodObject<{
    childNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    childNewId: string;
}, {
    childNewId: string;
}>;
type TParams$2y = z.infer<typeof params$2y>;
declare const query$1t: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1t = z.infer<typeof query$1t>;
type GetSecondaryChildGradeReportPDFValidation = {
    body: never;
    params: TParams$2y;
    query: TQuery$1t;
};

type GetSecondaryChildGradeReportPDFRouteConfig = GetSecondaryChildGradeReportPDFValidation & {
    files: never;
};
type GetSecondaryChildGradeReportPDFResponse = SecondaryGradeReportDTO;

declare const getSecondaryChildGradeReportPDFRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondaryChildGradeReportPDFRouteTypes = GetSecondaryChildGradeReportPDFRouteConfig & {
    response: APIResponse<GetSecondaryChildGradeReportPDFResponse>;
};

declare const body$1T: z.ZodObject<{
    termNewId: z.ZodString;
    subSubjectNewId: z.ZodOptional<z.ZodString>;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNull]>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    subSubjectNewId?: string | undefined;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    subSubjectNewId?: string | undefined;
}>;
type TBody$1T = z.infer<typeof body$1T>;
declare const params$2x: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2x = z.infer<typeof params$2x>;
type UpdateSecondaryGradesValidation = {
    body: TBody$1T;
    params: TParams$2x;
    query: never;
};

type UpdateSecondaryGradesRouteConfig = UpdateSecondaryGradesValidation & {
    files: never;
};
type UpdateSecondaryGradesResponse = void;

declare const updateSecondaryGradesRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSecondaryGradesRouteTypes = UpdateSecondaryGradesRouteConfig & {
    response: APIResponse<UpdateSecondaryGradesResponse>;
};

declare const body$1S: z.ZodObject<{
    termNewId: z.ZodString;
    grades: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodString>>>;
    observations: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}, {
    observations: Record<string, string>;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
}>;
type TBody$1S = z.infer<typeof body$1S>;
declare const params$2w: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2w = z.infer<typeof params$2w>;
type UpdateSecondaryGradesOfGroupValidation = {
    body: TBody$1S;
    params: TParams$2w;
    query: never;
};

type UpdateSecondaryGradesOfGroupRouteConfig = UpdateSecondaryGradesOfGroupValidation & {
    files: never;
};
type UpdateSecondaryGradesOfGroupResponse = void;

declare const updateSecondaryGradesOfGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSecondaryGradesOfGroupRouteTypes = UpdateSecondaryGradesOfGroupRouteConfig & {
    response: APIResponse<UpdateSecondaryGradesOfGroupResponse>;
};

declare const params$2v: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2v = z.infer<typeof params$2v>;
declare const query$1s: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1s = z.infer<typeof query$1s>;
type GetAllSecondaryGradeReportsOfClassValidation = {
    body: never;
    params: TParams$2v;
    query: TQuery$1s;
};

type GetAllSecondaryGradeReportsOfClassRouteConfig = GetAllSecondaryGradeReportsOfClassValidation & {
    files: never;
};
type GetAllSecondaryGradeReportsOfClassResponse = SecondaryGradeReportDTO[];

declare const getAllSecondaryGradeReportsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetAllSecondaryGradeReportsOfClassByAdminRouteTypes = GetAllSecondaryGradeReportsOfClassRouteConfig & {
    response: APIResponse<GetAllSecondaryGradeReportsOfClassResponse>;
};

type GradesOfSecondarySubjectDTO = {
    subjectName: string;
    totalNumberOfStudents: number;
    highestAverage: string | null;
    lowestAverage: string | null;
    canEdit: boolean;
    hasSubSubjects: boolean;
    subSubjects: {
        name: string;
        newId: string;
    }[];
    selectedSubSubject: {
        name: string;
        newId: string;
    } | null;
    headers: {
        name: string;
        examGradeId: ID$1;
        coefficient: number;
    }[];
    studentGrades: {
        student: UserProfileDTO;
        average: string | null;
        teacherObservation: string | null;
        grades: Record<string, string | null>;
    }[];
};

declare const params$2u: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2u = z.infer<typeof params$2u>;
declare const query$1r: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1r = z.infer<typeof query$1r>;
type GetGradesOfSecondaryGroupValidation$1 = {
    body: never;
    params: TParams$2u;
    query: TQuery$1r;
};

type GetGradesOfSecondaryGroupRouteConfig$1 = GetGradesOfSecondaryGroupValidation$1 & {
    files: never;
};
type GetGradesOfSecondaryGroupResponse$1 = GradesOfSecondarySubjectDTO;

declare const getGradesOfSecondaryGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfSecondaryGroupByAdminRouteTypes = GetGradesOfSecondaryGroupRouteConfig$1 & {
    response: APIResponse<GetGradesOfSecondaryGroupResponse$1>;
};

declare const params$2t: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2t = z.infer<typeof params$2t>;
declare const query$1q: z.ZodObject<{
    termNewId: z.ZodString;
    subSubjectNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}>;
type TQuery$1q = z.infer<typeof query$1q>;
type GetGradesOfSecondarySubjectValidation$1 = {
    body: never;
    params: TParams$2t;
    query: TQuery$1q;
};

type GetGradesOfSecondarySubjectRouteConfig$1 = GetGradesOfSecondarySubjectValidation$1 & {
    files: never;
};
type GetGradesOfSecondarySubjectResponse$1 = GradesOfSecondarySubjectDTO;

declare const getGradesOfSecondarySubjectByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfSecondarySubjectByAdminRouteTypes = GetGradesOfSecondarySubjectRouteConfig$1 & {
    response: APIResponse<GetGradesOfSecondarySubjectResponse$1>;
};

type SecondaryAveragesOfClassDTO = {
    stats: {
        studentWithHighestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        studentWithLowestAverage: {
            student: UserProfileDTO | null;
            average: string | null;
        };
        numberOfStudents: number;
    };
    classAverages: {
        className: string;
        classNewId: string;
        rank: number | null;
        average: string | null;
        numberOfStudents: number;
    }[];
    studentAverages: {
        student: UserProfileDTO;
        average: string | null;
        rank: number | null;
        diplomaName: string | null;
    }[];
};

declare const params$2s: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2s = z.infer<typeof params$2s>;
declare const query$1p: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1p = z.infer<typeof query$1p>;
type GetSecondaryAveragesOfClassValidation = {
    body: never;
    params: TParams$2s;
    query: TQuery$1p;
};

type GetSecondaryAveragesOfClassRouteConfig = GetSecondaryAveragesOfClassValidation & {
    files: never;
};
type GetSecondaryAveragesOfClassResponse = SecondaryAveragesOfClassDTO;

declare const getSecondaryAveragesOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondaryAveragesOfClassByAdminRouteTypes = GetSecondaryAveragesOfClassRouteConfig & {
    response: APIResponse<GetSecondaryAveragesOfClassResponse>;
};

declare const params$2r: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2r = z.infer<typeof params$2r>;
declare const query$1o: z.ZodObject<{
    subSubjectNewId: z.ZodOptional<z.ZodString>;
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}>;
type TQuery$1o = z.infer<typeof query$1o>;
type GetSecondaryBlankExamPageValidation = {
    body: never;
    params: TParams$2r;
    query: TQuery$1o;
};

type GetSecondaryBlankExamPageRouteConfig = GetSecondaryBlankExamPageValidation & {
    files: never;
};
type GetSecondaryBlankExamPageResponse = BlankExamPageDTO;

declare const getSecondaryBlankExamPageByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondaryBlankExamPageByAdminRouteTypes = GetSecondaryBlankExamPageRouteConfig & {
    response: APIResponse<GetSecondaryBlankExamPageResponse>;
};

type SecondaryGradeReportStatsDTO = {
    schoolYear: {
        name: string;
    };
    school: {
        name: string;
        educationDepartment: string;
        establishmentTitle: TEstablishmentTitleEnum;
        _id: string;
    };
    studentNumber: number;
    class: {
        name: string;
    };
    term: {
        name: string;
    };
    headers: {
        topic: {
            name: string;
        };
        coefficient: number;
    }[];
    studentStats: {
        fullName: string;
        average: string | null;
        rank: number | null;
        [key: string]: number | null | string;
    }[];
    topicsStats: {
        topicName: string;
        maxAverage: string | null;
        minAverage: string | null;
        topicAverage: string | null;
        teacher: string | null;
        avgRateAbove10: string;
    }[];
    totalAverage: {
        classAverage: string | null;
        maxAverage: string | null;
        minAverage: string | null;
        avgRateAbove10: string;
    };
};

declare const params$2q: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2q = z.infer<typeof params$2q>;
declare const query$1n: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1n = z.infer<typeof query$1n>;
type GetSecondaryGradeReportStatsValidation = {
    body: never;
    params: TParams$2q;
    query: TQuery$1n;
};

type GetSecondaryGradeReportStatsRouteConfig = GetSecondaryGradeReportStatsValidation & {
    files: never;
};
type GetSecondaryGradeReportStatsResponse = SecondaryGradeReportStatsDTO;

declare const getSecondaryGradeReportStatsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondaryGradeReportStatsByAdminRouteTypes = GetSecondaryGradeReportStatsRouteConfig & {
    response: APIResponse<GetSecondaryGradeReportStatsResponse>;
};

type SecondarySubjectsOfClassDTO = {
    canCompleteTerm: boolean;
    subjects: {
        name: string;
        newId: string;
        isCovered: boolean;
        degreesCovered: number;
        totalDegrees: number;
        subSubjects: {
            name: string;
        }[];
        teachers: UserProfileDTO[];
    }[];
};

declare const params$2p: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2p = z.infer<typeof params$2p>;
declare const query$1m: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1m = z.infer<typeof query$1m>;
type GetSecondarySubjectsOfClassValidation$1 = {
    body: never;
    params: TParams$2p;
    query: TQuery$1m;
};

type GetSecondarySubjectsOfClassRouteConfig$1 = GetSecondarySubjectsOfClassValidation$1 & {
    files: never;
};
type GetSecondarySubjectsOfClassResponse$1 = SecondarySubjectsOfClassDTO;

declare const getSecondarySubjectsOfClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondarySubjectsOfClassByAdminRouteTypes = GetSecondarySubjectsOfClassRouteConfig$1 & {
    response: APIResponse<GetSecondarySubjectsOfClassResponse$1>;
};

declare const params$2o: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$2o = z.infer<typeof params$2o>;
declare const query$1l: z.ZodObject<{
    termNewId: z.ZodString;
    schoolYearId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}, {
    schoolYearId: string & {
        _isID: true;
    };
    termNewId: string;
}>;
type TQuery$1l = z.infer<typeof query$1l>;
type GetStudentGradeReportSecondaryValidation = {
    params: TParams$2o;
    query: TQuery$1l;
    body: never;
};

type GetStudentGradeReportSecondaryRouteConfig = GetStudentGradeReportSecondaryValidation & {
    files: never;
};
type GetStudentGradeReportSecondaryResponse = SecondaryGradeReportDTO;

declare const getStudentGradeReportSecondaryByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentGradeReportSecondaryByAdminRouteTypes = GetStudentGradeReportSecondaryRouteConfig & {
    response: APIResponse<GetStudentGradeReportSecondaryResponse>;
};

declare const params$2n: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2n = z.infer<typeof params$2n>;
declare const query$1k: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1k = z.infer<typeof query$1k>;
type GetGradesOfSecondaryGroupValidation = {
    body: never;
    params: TParams$2n;
    query: TQuery$1k;
};

type GetGradesOfSecondaryGroupRouteConfig = GetGradesOfSecondaryGroupValidation & {
    files: never;
};
type GetGradesOfSecondaryGroupResponse = GradesOfSecondarySubjectDTO;

declare const getGradesOfSecondaryGroupByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfSecondaryGroupByTeacherRouteTypes = GetGradesOfSecondaryGroupRouteConfig & {
    response: APIResponse<GetGradesOfSecondaryGroupResponse>;
};

declare const params$2m: z.ZodObject<{
    classNewId: z.ZodString;
    subjectNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
    subjectNewId: string;
}, {
    classNewId: string;
    subjectNewId: string;
}>;
type TParams$2m = z.infer<typeof params$2m>;
declare const query$1j: z.ZodObject<{
    subSubjectNewId: z.ZodOptional<z.ZodString>;
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}, {
    termNewId: string;
    subSubjectNewId?: string | undefined;
}>;
type TQuery$1j = z.infer<typeof query$1j>;
type GetGradesOfSecondarySubjectValidation = {
    body: never;
    params: TParams$2m;
    query: TQuery$1j;
};

type GetGradesOfSecondarySubjectRouteConfig = GetGradesOfSecondarySubjectValidation & {
    files: never;
};
type GetGradesOfSecondarySubjectResponse = GradesOfSecondarySubjectDTO;

declare const getGradesOfSecondarySubjectByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGradesOfSecondarySubjectByTeacherRouteTypes = GetGradesOfSecondarySubjectRouteConfig & {
    response: APIResponse<GetGradesOfSecondarySubjectResponse>;
};

declare const params$2l: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$2l = z.infer<typeof params$2l>;
declare const query$1i: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TQuery$1i = z.infer<typeof query$1i>;
type GetSecondarySubjectsOfClassValidation = {
    body: never;
    params: TParams$2l;
    query: TQuery$1i;
};

type GetSecondarySubjectsOfClassRouteConfig = GetSecondarySubjectsOfClassValidation & {
    files: never;
};
type GetSecondarySubjectsOfClassResponse = SecondarySubjectsOfClassDTO;

declare const getSecondarySubjectsOfClassByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSecondarySubjectsOfClassByTeacherRouteTypes = GetSecondarySubjectsOfClassRouteConfig & {
    response: APIResponse<GetSecondarySubjectsOfClassResponse>;
};

declare const body$1R: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    amount?: number | undefined;
    description?: string | undefined;
}, {
    name: string;
    amount?: number | undefined;
    description?: string | undefined;
}>;
type TBody$1R = z.infer<typeof body$1R>;
type AddExpenseValidation = {
    body: TBody$1R;
    params: never;
    query: never;
};

type AddExpenseRouteConfig = AddExpenseValidation & {
    files: never;
};
type AddExpenseResponse = void;

declare const addExpenseByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddExpenseByAdminRouteTypes = AddExpenseRouteConfig & {
    response: APIResponse<AddExpenseResponse>;
};

declare const params$2k: z.ZodObject<{
    expenseNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    expenseNewId: string;
}, {
    expenseNewId: string;
}>;
type TParams$2k = z.infer<typeof params$2k>;
type DeleteExpenseValidation = {
    body: never;
    params: TParams$2k;
    query: never;
};

type DeleteExpenseRouteConfig = DeleteExpenseValidation & {
    files: never;
};
type DeleteExpenseResponse = void;

declare const deleteExpenseByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteExpenseByAdminRouteTypes = DeleteExpenseRouteConfig & {
    response: APIResponse<DeleteExpenseResponse>;
};

declare const query$1h: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1h = z.infer<typeof query$1h>;
type ListExpensesValidation = {
    body: never;
    params: never;
    query: TQuery$1h;
};

type ListExpensesRouteConfig = ListExpensesValidation & {
    files: never;
};
type ListExpensesResponse = ResponseWithPagination<Expense>;

declare const listExpensesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListExpensesByAdminRouteTypes = ListExpensesRouteConfig & {
    response: APIResponse<ListExpensesResponse>;
};

declare const body$1Q: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount?: number | null | undefined;
    description?: string | null | undefined;
    name?: string | undefined;
}, {
    amount?: number | null | undefined;
    description?: string | null | undefined;
    name?: string | undefined;
}>;
type TBody$1Q = z.infer<typeof body$1Q>;
declare const params$2j: z.ZodObject<{
    expenseNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    expenseNewId: string;
}, {
    expenseNewId: string;
}>;
type TParams$2j = z.infer<typeof params$2j>;
type UpdateExpenseValidation = {
    body: TBody$1Q;
    params: TParams$2j;
    query: never;
};

type UpdateExpenseRouteConfig = UpdateExpenseValidation & {
    files: never;
};
type UpdateExpenseResponse = void;

declare const updateExpenseByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateExpenseByAdminRouteTypes = UpdateExpenseRouteConfig & {
    response: APIResponse<UpdateExpenseResponse>;
};

declare const body$1P: z.ZodIntersection<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    showByDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | null | undefined;
    showByDefault?: boolean | undefined;
}, {
    name: string;
    description?: string | null | undefined;
    showByDefault?: boolean | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    invoiceType: z.ZodLiteral<"extra">;
    amount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    invoiceType: "extra";
    amount?: number | undefined;
}, {
    invoiceType: "extra";
    amount?: number | undefined;
}>, z.ZodObject<{
    invoiceType: z.ZodEnum<["monthly", "oneTime"]>;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    invoiceType: "monthly" | "oneTime";
}, {
    amount: number;
    invoiceType: "monthly" | "oneTime";
}>]>>;
type TBody$1P = z.infer<typeof body$1P>;
type AddServiceValidation = {
    body: TBody$1P;
    params: never;
    query: never;
};

type AddServiceRouteConfig = AddServiceValidation & {
    files: never;
};
type AddServiceResponse = void;

declare const addServiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddServiceByAdminRouteTypes = AddServiceRouteConfig & {
    response: APIResponse<AddServiceResponse>;
};

declare const body$1O: z.ZodObject<{
    transaction: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    level: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    amount: z.ZodNumber;
    transactionType: z.ZodNativeEnum<{
        readonly EXPENSE: "expense";
        readonly SERVICE: "service";
    }>;
    paidAt: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    supplier: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    transaction: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    amount: number;
    paidAt: string
    transactionType: "service" | "expense";
    supplier?: string | undefined;
    description?: string | undefined;
}, {
    transaction: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    amount: number;
    paidAt: (string | Date) & (string | string| undefined);
    transactionType: "service" | "expense";
    supplier?: string | undefined;
    description?: string | undefined;
}>;
type TBody$1O = z.infer<typeof body$1O>;
type AddTransactionValidation = {
    body: TBody$1O;
    query: never;
    params: never;
};

type AddTransactionRouteConfig = AddTransactionValidation & {
    files: never;
};
type AddTransactionResponse = void;

declare const addTransactionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddTransactionByAdminRouteTypes = AddTransactionRouteConfig & {
    response: APIResponse<AddTransactionResponse>;
};

declare const body$1N: z.ZodObject<{
    ids: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    ids: ID$1[];
}, {
    ids: ID$1[];
}>;
type TBody$1N = z.infer<typeof body$1N>;
type DeleteServiceValidation = {
    body: TBody$1N;
    params: never;
    query: never;
};

type DeleteServiceRouteConfig = DeleteServiceValidation & {
    files: never;
};
type DeleteServiceResponse = void;

declare const deleteServiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type DeleteServiceByAdminRouteTypes = DeleteServiceRouteConfig & {
    response: APIResponse<DeleteServiceResponse>;
};

declare const body$1M: z.ZodObject<{
    ids: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    ids: ID$1[];
}, {
    ids: ID$1[];
}>;
type TBody$1M = z.infer<typeof body$1M>;
type DeleteTransactionsValidation = {
    body: TBody$1M;
    params: never;
    query: never;
};

type DeleteTransactionsRouteConfig = DeleteTransactionsValidation & {
    files: never;
};
type DeleteTransactionsResponse = void;

declare const deleteTransactionsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type DeleteTransactionsByAdminRouteTypes = DeleteTransactionsRouteConfig & {
    response: APIResponse<DeleteTransactionsResponse>;
};

type Distribution = {
    tag: string;
    percentage: number;
};
type transactionDistribution = {
    amount: number;
    rate: number | null;
    distribution: Distribution[];
};
type LatestTransaction = {
    _id: ID$1;
    name: string;
    date: string
    amount: number;
    type: TTransactionTypeEnum;
};
type FinanceDashboardDto = {
    incomes: transactionDistribution;
    expenses: transactionDistribution;
    revenue: {
        amount: number;
        rate: number | null;
    };
    latestTransactions: LatestTransaction[];
};

declare const query$1g: z.ZodObject<{
    levels: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
}, "strip", z.ZodTypeAny, {
    startDate: string
    endDate: string
    levels: ID$1[];
}, {
    startDate: (string | Date) & (string | string| undefined);
    endDate: (string | Date) & (string | string| undefined);
    levels: ID$1[];
}>;
type TQuery$1g = z.infer<typeof query$1g>;
type GetFinanceDashboardValidation = {
    body: never;
    params: never;
    query: TQuery$1g;
};

type GetFinanceDashboardRouteConfig = GetFinanceDashboardValidation & {
    files: never;
};
type GetFinanceDashboardResponse = FinanceDashboardDto;

declare const getFinanceDashboardByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetFinanceDashboardByAdminRouteTypes = GetFinanceDashboardRouteConfig & {
    response: APIResponse<GetFinanceDashboardResponse>;
};

declare const body$1L: z.ZodIntersection<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    showByDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | null | undefined;
    showByDefault?: boolean | undefined;
}, {
    name: string;
    description?: string | null | undefined;
    showByDefault?: boolean | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    invoiceType: z.ZodLiteral<"extra">;
    amount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    invoiceType: "extra";
    amount?: number | undefined;
}, {
    invoiceType: "extra";
    amount?: number | undefined;
}>, z.ZodObject<{
    invoiceType: z.ZodEnum<["monthly", "oneTime"]>;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    invoiceType: "monthly" | "oneTime";
}, {
    amount: number;
    invoiceType: "monthly" | "oneTime";
}>]>>;
type TBody$1L = z.infer<typeof body$1L>;
declare const params$2i: z.ZodObject<{
    serviceId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    serviceId: string & {
        _isID: true;
    };
}, {
    serviceId: string & {
        _isID: true;
    };
}>;
type TParams$2i = z.infer<typeof params$2i>;
type UpdateServiceValidation = {
    body: TBody$1L;
    params: TParams$2i;
    query: never;
};

type UpdateServiceRouteConfig = UpdateServiceValidation & {
    files: never;
};
type UpdateServiceResponse = void;

declare const updateServiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateServiceByAdminRouteTypes = UpdateServiceRouteConfig & {
    response: APIResponse<UpdateServiceResponse>;
};

declare const body$1K: z.ZodObject<{
    transaction: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    level: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    amount: z.ZodNumber;
    transactionType: z.ZodNativeEnum<{
        readonly EXPENSE: "expense";
        readonly SERVICE: "service";
    }>;
    paidAt: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    supplier: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    transaction: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    amount: number;
    paidAt: string
    transactionType: "service" | "expense";
    supplier?: string | undefined;
    description?: string | null | undefined;
}, {
    transaction: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    amount: number;
    paidAt: (string | Date) & (string | string| undefined);
    transactionType: "service" | "expense";
    supplier?: string | undefined;
    description?: string | null | undefined;
}>;
type TBody$1K = z.infer<typeof body$1K>;
declare const params$2h: z.ZodObject<{
    transactionId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    transactionId: string & {
        _isID: true;
    };
}, {
    transactionId: string & {
        _isID: true;
    };
}>;
type TParams$2h = z.infer<typeof params$2h>;
type UpdateTransactionsValidation = {
    body: TBody$1K;
    params: TParams$2h;
    query: never;
};

type UpdateTransactionsRouteConfig = UpdateTransactionsValidation & {
    files: never;
};
type UpdateTransactionsResponse = void;

declare const updateTransactionsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTransactionsByAdminRouteTypes = UpdateTransactionsRouteConfig & {
    response: APIResponse<UpdateTransactionsResponse>;
};

declare const body$1J: z.ZodObject<{
    name: z.ZodString;
    subjectTypes: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
    classTypes: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
    isDefault: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    subjectTypes: ID$1[];
    classTypes: ID$1[];
    isDefault: boolean;
}, {
    name: string;
    subjectTypes: ID$1[];
    classTypes: ID$1[];
    isDefault: boolean;
}>;
type TBody$1J = z.infer<typeof body$1J>;
type AddGradeReportTemplateValidation = {
    body: TBody$1J;
    params: never;
    query: never;
};

type AddGradeReportTemplateRouteConfig = AddGradeReportTemplateValidation & {
    files: never;
};
type AddGradeReportTemplateResponse = void;

declare const addGradeReportTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddGradeReportTemplateByAdminRouteTypes = AddGradeReportTemplateRouteConfig & {
    response: APIResponse<AddGradeReportTemplateResponse>;
};

declare const params$2g: z.ZodObject<{
    templateNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateNewId: string;
}, {
    templateNewId: string;
}>;
type TParams$2g = z.infer<typeof params$2g>;
type DeleteGradeReportTemplateValidation = {
    body: never;
    params: TParams$2g;
    query: never;
};

type DeleteGradeReportTemplateRouteConfig = DeleteGradeReportTemplateValidation & {
    files: never;
};
type DeleteGradeReportTemplateResponse = void;

declare const deleteGradeReportTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteGradeReportTemplateByAdminRouteTypes = DeleteGradeReportTemplateRouteConfig & {
    response: APIResponse<DeleteGradeReportTemplateResponse>;
};

declare const query$1f: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    classTypeId: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    classTypeId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    classTypeId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1f = z.infer<typeof query$1f>;
type ListGradeReportTemplatesValidation = {
    body: never;
    params: never;
    query: TQuery$1f;
};

type ListGradeReportTemplatesRouteConfig = ListGradeReportTemplatesValidation & {
    files: never;
};
type ListGradeReportTemplatesResponse = ResponseWithPagination<GradeReportTemplateDTO>;

declare const listGradeReportTemplatesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListGradeReportTemplatesByAdminRouteTypes = ListGradeReportTemplatesRouteConfig & {
    response: APIResponse<ListGradeReportTemplatesResponse>;
};

declare const body$1I: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    classTypes?: ID$1[] | undefined;
    isDefault?: boolean | undefined;
}, {
    name?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    classTypes?: ID$1[] | undefined;
    isDefault?: boolean | undefined;
}>;
type TBody$1I = z.infer<typeof body$1I>;
declare const params$2f: z.ZodObject<{
    templateNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    templateNewId: string;
}, {
    templateNewId: string;
}>;
type TParams$2f = z.infer<typeof params$2f>;
type UpdateGradeReportTemplateValidation = {
    body: TBody$1I;
    params: TParams$2f;
    query: never;
};

type UpdateGradeReportTemplateRouteConfig = UpdateGradeReportTemplateValidation & {
    files: never;
};
type UpdateGradeReportTemplateResponse = void;

declare const updateGradeReportTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateGradeReportTemplateByAdminRouteTypes = UpdateGradeReportTemplateRouteConfig & {
    response: APIResponse<UpdateGradeReportTemplateResponse>;
};

declare const body$1H: z.ZodObject<{
    name: z.ZodString;
    coefficient: z.ZodNullable<z.ZodNumber>;
    exams: z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">;
    illustration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    coefficient: number | null;
    exams: {
        coefficient: number;
        examTypeNewId: string;
    }[];
    illustration: string;
}, {
    name: string;
    coefficient: number | null;
    exams: {
        coefficient: number;
        examTypeNewId: string;
    }[];
    illustration: string;
}>;
type TBody$1H = z.infer<typeof body$1H>;
type AddGroupTypeValidation = {
    body: TBody$1H;
    params: never;
    query: never;
};

type AddGroupTypeRouteConfig = AddGroupTypeValidation & {
    files: never;
};
type AddGroupTypeResponse = void;

declare const addGroupTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddGroupTypeByAdminRouteTypes = AddGroupTypeRouteConfig & {
    response: APIResponse<AddGroupTypeResponse>;
};

declare const params$2e: z.ZodObject<{
    groupTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupTypeNewId: string;
}, {
    groupTypeNewId: string;
}>;
type TParams$2e = z.infer<typeof params$2e>;
type DeleteGroupTypeValidation = {
    body: never;
    params: TParams$2e;
    query: never;
};

type DeleteGroupTypeRouteConfig = DeleteGroupTypeValidation & {
    files: never;
};
type DeleteGroupTypeResponse = void;

declare const deleteGroupTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteGroupTypeByAdminRouteTypes = DeleteGroupTypeRouteConfig & {
    response: APIResponse<DeleteGroupTypeResponse>;
};

type GroupTypeDto = EntityDto & {
    coefficient: number | null;
    exams: ExamDTO[];
    illustration: string;
};

declare const query$1e: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1e = z.infer<typeof query$1e>;
type ListGroupTypesValidation = {
    body: never;
    params: never;
    query: TQuery$1e;
};

type ListGroupTypesRouteConfig = ListGroupTypesValidation & {
    files: never;
};
type ListGroupTypesResponse = ResponseWithPagination<GroupTypeDto>;

declare const listGroupTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListGroupTypesByAdminRouteTypes = ListGroupTypesRouteConfig & {
    response: APIResponse<ListGroupTypesResponse>;
};

declare const body$1G: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    coefficient: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    exams: z.ZodOptional<z.ZodArray<z.ZodObject<{
        examTypeNewId: z.ZodString;
        coefficient: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        coefficient: number;
        examTypeNewId: string;
    }, {
        coefficient: number;
        examTypeNewId: string;
    }>, "many">>;
    illustration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    coefficient?: number | null | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
    illustration?: string | undefined;
}, {
    name?: string | undefined;
    coefficient?: number | null | undefined;
    exams?: {
        coefficient: number;
        examTypeNewId: string;
    }[] | undefined;
    illustration?: string | undefined;
}>;
type TBody$1G = z.infer<typeof body$1G>;
declare const params$2d: z.ZodObject<{
    groupTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupTypeNewId: string;
}, {
    groupTypeNewId: string;
}>;
type TParams$2d = z.infer<typeof params$2d>;
type UpdateGroupTypeValidation = {
    body: TBody$1G;
    params: TParams$2d;
    query: never;
};

type UpdateGroupTypeRouteConfig = UpdateGroupTypeValidation & {
    files: never;
};
type UpdateGroupTypeResponse = void;

declare const updateGroupTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateGroupTypeByAdminRouteTypes = UpdateGroupTypeRouteConfig & {
    response: APIResponse<UpdateGroupTypeResponse>;
};

declare const params$2c: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2c = z.infer<typeof params$2c>;
type CheckGroupValidation = {
    body: never;
    params: TParams$2c;
    query: never;
};

type CheckGroupRouteConfig = CheckGroupValidation & {
    files: never;
};
type CheckGroupResponse = GroupDto$1;

declare const checkGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CheckGroupRouteTypes = CheckGroupRouteConfig & {
    response: APIResponse<CheckGroupResponse>;
};

type GroupOverviewDTO = {
    _id: ID$1;
    newId: string;
    name: string;
    terms: {
        newId: string;
        _id: string;
        name: string;
        isLocked: boolean;
        isCompleted: boolean;
    }[];
    isIncludeInGradeBook: boolean;
    currentTermNewId: string | null;
};

declare const params$2b: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2b = z.infer<typeof params$2b>;
type GetGroupOverviewValidation = {
    params: TParams$2b;
    query: never;
    body: never;
};

type GetGroupOverviewRouteConfig = GetGroupOverviewValidation & {
    files: never;
};
type GetGroupOverviewResponse = GroupOverviewDTO;

declare const getGroupOverviewRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetGroupOverviewRouteTypes = GetGroupOverviewRouteConfig & {
    response: APIResponse<GetGroupOverviewResponse>;
};

type GroupDto = EntityDto;

declare const query$1d: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1d = z.infer<typeof query$1d>;
type ListGroupsValidation$1 = {
    body: never;
    params: never;
    query: TQuery$1d;
};

type ListGroupsRouteConfig$1 = ListGroupsValidation$1 & {
    files: never;
};
type ListGroupsResponse$1 = ResponseWithPagination<GroupDto>;

declare const listGroupsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListGroupsRouteTypes = ListGroupsRouteConfig$1 & {
    response: APIResponse<ListGroupsResponse$1>;
};

declare const body$1F: z.ZodObject<{
    name: z.ZodString;
    groupTypeNewId: z.ZodString;
    teacherNewId: z.ZodString;
    classTypeNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    classTypeNewIds: string[];
    teacherNewId: string;
    groupTypeNewId: string;
}, {
    name: string;
    classTypeNewIds: string[];
    teacherNewId: string;
    groupTypeNewId: string;
}>;
type TBody$1F = z.infer<typeof body$1F>;
type AddGroupValidation = {
    body: TBody$1F;
    params: never;
    query: never;
};

type AddGroupRouteConfig = AddGroupValidation & {
    files: never;
};
type AddGroupResponse = GroupDto$1;

declare const addGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddGroupByAdminRouteTypes = AddGroupRouteConfig & {
    response: APIResponse<AddGroupResponse>;
};

declare const body$1E: z.ZodObject<{
    studentNewIds: z.ZodArray<z.ZodString, "atleastone">;
}, "strip", z.ZodTypeAny, {
    studentNewIds: [string, ...string[]];
}, {
    studentNewIds: [string, ...string[]];
}>;
type TBody$1E = z.infer<typeof body$1E>;
declare const params$2a: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$2a = z.infer<typeof params$2a>;
type AssignStudentToGroupValidation = {
    body: TBody$1E;
    params: TParams$2a;
    query: never;
};

type AssignStudentToGroupRouteConfig = AssignStudentToGroupValidation & {
    files: never;
};
type AssignStudentToGroupResponse = void;

declare const assignStudentToGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AssignStudentToGroupByAdminRouteTypes = AssignStudentToGroupRouteConfig & {
    response: APIResponse<AssignStudentToGroupResponse>;
};

declare const params$29: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$29 = z.infer<typeof params$29>;
type DeleteGroupValidation = {
    body: never;
    params: TParams$29;
    query: never;
};

type DeleteGroupRouteConfig = DeleteGroupValidation & {
    files: never;
};
type DeleteGroupResponse = void;

declare const deleteGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteGroupByAdminRouteTypes = DeleteGroupRouteConfig & {
    response: APIResponse<DeleteGroupResponse>;
};

declare const query$1c: z.ZodObject<{
    groupTypeNewId: z.ZodOptional<z.ZodString>;
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    groupTypeNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}, {
    groupTypeNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}>;
type TQuery$1c = z.infer<typeof query$1c>;
type GetGroupListValidation = {
    body: never;
    params: never;
    query: TQuery$1c;
};

type GetGroupsSummaryResponse = {
    selectedGroupType: EntityDto | null;
    groupTypes: EntityDto[];
    groupLists: (EntityDto & {
        teacher: UserProfileDTO;
        classTypes: EntityDto[];
        levels: EntityDto[];
        studentNumber: number;
        students: UserProfileDTO[];
    })[];
    schoolYears: SchoolYearDto[];
    selectedSchoolYear: SchoolYearDto | null;
};
type GetGroupListRouteConfig = GetGroupListValidation & {
    files: never;
};
type GetGroupListResponse = GetGroupsSummaryResponse;

declare const getGroupListByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetGroupListByAdminRouteTypes = GetGroupListRouteConfig & {
    response: APIResponse<GetGroupListResponse>;
};

type StudentInGroupDto = {
    _id: string;
    newId: string;
    fullName: string;
    gender: string;
    email: string | null;
    avatar: string;
};

declare const params$28: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$28 = z.infer<typeof params$28>;
declare const query$1b: z.ZodObject<{
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    export?: "csv" | "xlsx" | undefined;
}, {
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1b = z.infer<typeof query$1b>;
type GetStudentsOfGroupValidation = {
    body: never;
    params: TParams$28;
    query: TQuery$1b;
};

type GetStudentsOfGroupRouteConfig = GetStudentsOfGroupValidation & {
    files: never;
};
type GetStudentsOfGroupResponse = {
    studentList: StudentInGroupDto[];
    classTypes: ID$1[];
};

declare const getStudentsOfGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentsOfGroupByAdminRouteTypes = GetStudentsOfGroupRouteConfig & {
    response: APIResponse<GetStudentsOfGroupResponse>;
};

declare const params$27: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$27 = z.infer<typeof params$27>;
type GetTopicOfGroupValidation = {
    body: never;
    params: TParams$27;
    query: never;
};

type GetTopicOfGroupRouteConfig = GetTopicOfGroupValidation & {
    files: never;
};
type GetTopicOfGroupResponse = (EntityDto & {
    teacher: UserProfileDTO;
})[];

declare const getTopicOfGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTopicOfGroupByAdminRouteTypes = GetTopicOfGroupRouteConfig & {
    response: APIResponse<GetTopicOfGroupResponse>;
};

declare const query$1a: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    levelNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    levelNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    levelNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$1a = z.infer<typeof query$1a>;
type ListGroupsValidation = {
    body: never;
    params: never;
    query: TQuery$1a;
};

type ListGroupsRouteConfig = ListGroupsValidation & {
    files: never;
};
type ListGroupsResponse = ResponseWithPagination<EntityDto>;

declare const listGroupsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListGroupsByAdminRouteTypes = ListGroupsRouteConfig & {
    response: APIResponse<ListGroupsResponse>;
};

declare const query$19: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    groupNewId: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$19 = z.infer<typeof query$19>;
type ListUnenrolledStudentsForGroupValidation = {
    body: never;
    params: never;
    query: TQuery$19;
};

type ListUnenrolledStudentsForGroupRouteConfig = ListUnenrolledStudentsForGroupValidation & {
    files: never;
};
type ListUnenrolledStudentsForGroupResponse = ResponseWithPagination<UserProfileDTO>;

declare const listUnenrolledStudentsForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListUnenrolledStudentsForGroupByAdminRouteTypes = ListUnenrolledStudentsForGroupRouteConfig & {
    response: APIResponse<ListUnenrolledStudentsForGroupResponse>;
};

declare const body$1D: z.ZodObject<{
    studentNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    studentNewIds: string[];
}, {
    studentNewIds: string[];
}>;
type TBody$1D = z.infer<typeof body$1D>;
declare const params$26: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$26 = z.infer<typeof params$26>;
type UnassignStudentFromGroupValidation = {
    body: TBody$1D;
    params: TParams$26;
    query: never;
};

type UnassignStudentFromGroupRouteConfig = UnassignStudentFromGroupValidation & {
    files: never;
};
type UnassignStudentFromGroupResponse = void;

declare const unassignStudentFromGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnassignStudentFromGroupByAdminRouteTypes = UnassignStudentFromGroupRouteConfig & {
    response: APIResponse<UnassignStudentFromGroupResponse>;
};

declare const body$1C: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    teacherNewId?: string | undefined;
}, {
    name?: string | undefined;
    teacherNewId?: string | undefined;
}>;
type TBody$1C = z.infer<typeof body$1C>;
declare const params$25: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TParams$25 = z.infer<typeof params$25>;
type UpdateGroupValidation = {
    body: TBody$1C;
    params: TParams$25;
    query: never;
};

type UpdateGroupRouteConfig = UpdateGroupValidation & {
    files: never;
};
type UpdateGroupResponse = void;

declare const updateGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateGroupByAdminRouteTypes = UpdateGroupRouteConfig & {
    response: APIResponse<UpdateGroupResponse>;
};

declare const body$1B: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    levelNewIds: z.ZodArray<z.ZodString, "many">;
    isDeletionOfSessionDisabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    startDate: string
    endDate: string
    levelNewIds: string[];
    isDeletionOfSessionDisabled: boolean;
}, {
    name: string;
    startDate: (string | Date) & (string | string| undefined);
    endDate: (string | Date) & (string | string| undefined);
    levelNewIds: string[];
    isDeletionOfSessionDisabled: boolean;
}>, {
    name: string;
    startDate: string
    endDate: string
    levelNewIds: string[];
    isDeletionOfSessionDisabled: boolean;
}, {
    name: string;
    startDate: (string | Date) & (string | string| undefined);
    endDate: (string | Date) & (string | string| undefined);
    levelNewIds: string[];
    isDeletionOfSessionDisabled: boolean;
}>;
type TBody$1B = z.infer<typeof body$1B>;
type AddHolidayValidation = {
    body: TBody$1B;
    params: never;
    query: never;
};

type AddHolidayRouteConfig = AddHolidayValidation & {
    files: never;
};
type AddHolidayResponse = void;

declare const addHolidayByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddHolidayByAdminRouteTypes = AddHolidayRouteConfig & {
    response: APIResponse<AddHolidayResponse>;
};

declare const params$24: z.ZodObject<{
    holidayNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    holidayNewId: string;
}, {
    holidayNewId: string;
}>;
type TParams$24 = z.infer<typeof params$24>;
type DeleteHolidayValidation = {
    body: never;
    params: TParams$24;
    query: never;
};

type DeleteHolidayRouteConfig = DeleteHolidayValidation & {
    files: never;
};
type DeleteHolidayResponse = void;

declare const deleteHolidayByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteHolidayByAdminRouteTypes = DeleteHolidayRouteConfig & {
    response: APIResponse<DeleteHolidayResponse>;
};

type HolidayDto = {
    name: string;
    startDate: string
    endDate: string
    levels: {
        newId: string;
        _id: ID$1;
        name: string;
    }[];
    newId: string;
};
type HolidayInScheduleDto = {
    name: string;
    newId: string;
    _id: ID$1;
    date: string
};

declare const query$18: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$18 = z.infer<typeof query$18>;
type ListHolidayValidation = {
    body: never;
    params: never;
    query: TQuery$18;
};

type ListHolidayRouteConfig = ListHolidayValidation & {
    files: never;
};
type ListHolidayResponse = ResponseWithPagination<HolidayDto>;

declare const listHolidayByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListHolidayByAdminRouteTypes = ListHolidayRouteConfig & {
    response: APIResponse<ListHolidayResponse>;
};

declare const body$1A: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isDeletionOfSessionDisabled: z.ZodOptional<z.ZodBoolean>;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
}, "strip", z.ZodTypeAny, {
    startDate: string
    endDate: string
    name?: string | undefined;
    isDeletionOfSessionDisabled?: boolean | undefined;
}, {
    startDate: (string | Date) & (string | string| undefined);
    endDate: (string | Date) & (string | string| undefined);
    name?: string | undefined;
    isDeletionOfSessionDisabled?: boolean | undefined;
}>;
type TBody$1A = z.infer<typeof body$1A>;
declare const params$23: z.ZodObject<{
    holidayNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    holidayNewId: string;
}, {
    holidayNewId: string;
}>;
type TParams$23 = z.infer<typeof params$23>;
type UpdateHolidayValidation = {
    body: TBody$1A;
    params: TParams$23;
    query: never;
};

type UpdateHolidayRouteConfig = UpdateHolidayValidation & {
    files: never;
};
type UpdateHolidayResponse = void;

declare const updateHolidayByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateHolidayByAdminRouteTypes = UpdateHolidayRouteConfig & {
    response: APIResponse<UpdateHolidayResponse>;
};

declare const params$22: z.ZodObject<{
    homeworkNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    homeworkNewId: string;
}, {
    homeworkNewId: string;
}>;
type TParams$22 = z.infer<typeof params$22>;
type GetOneHomeworkValidation = {
    body: never;
    params: TParams$22;
    query: never;
};

type GetOneHomeworkRouteConfig = GetOneHomeworkValidation & {
    files: never;
};
type GetOneHomeworkResponse = HomeworkDTO;

declare const getOneHomeworkRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneHomeworkRouteTypes = GetOneHomeworkRouteConfig & {
    response: APIResponse<GetOneHomeworkResponse>;
};

declare const params$21: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$21 = z.infer<typeof params$21>;
declare const query$17: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly TODO: "to do";
        readonly DONE: "done";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$17 = z.infer<typeof query$17>;
type ListHomeworksByParentValidation = {
    body: never;
    params: TParams$21;
    query: TQuery$17;
};

type ListHomeworksByParentRouteConfig = ListHomeworksByParentValidation & {
    files: never;
};
type ListHomeworksByParentResponse = ResponseWithPagination<HomeworkDTO>;

declare const listHomeworksByParentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListHomeworksByParentRouteTypes = ListHomeworksByParentRouteConfig & {
    response: APIResponse<ListHomeworksByParentResponse>;
};

declare const query$16: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly TODO: "to do";
        readonly DONE: "done";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$16 = z.infer<typeof query$16>;
type ListHomeworksByStudentValidation = {
    body: never;
    params: never;
    query: TQuery$16;
};

type ListHomeworksByStudentRouteConfig = ListHomeworksByStudentValidation & {
    files: never;
};
type ListHomeworksByStudentResponse = ResponseWithPagination<HomeworkDTO>;

declare const listHomeworksByStudentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListHomeworksByStudentRouteTypes = ListHomeworksByStudentRouteConfig & {
    response: APIResponse<ListHomeworksByStudentResponse>;
};

declare const query$15: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly TODO: "to do";
        readonly DONE: "done";
    }>>;
    classNewId: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    classNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    classNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$15 = z.infer<typeof query$15>;
type ListHomeworksByTeacherValidation = {
    body: never;
    params: never;
    query: TQuery$15;
};

type ListHomeworksByTeacherRouteConfig = ListHomeworksByTeacherValidation & {
    files: never;
};
type ListHomeworksByTeacherResponse = ResponseWithPagination<HomeworkDTO>;

declare const listHomeworksByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListHomeworksByTeacherRouteTypes = ListHomeworksByTeacherRouteConfig & {
    response: APIResponse<ListHomeworksByTeacherResponse>;
};

declare const query$14: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly TODO: "to do";
        readonly DONE: "done";
    }>>;
    studentNewId: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodOptional<z.ZodString>;
    classNewId: z.ZodOptional<z.ZodString>;
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    groupNewId: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
    groupNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    status?: "to do" | "done" | undefined;
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
    groupNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$14 = z.infer<typeof query$14>;
type ListHomeworksValidation = {
    body: never;
    params: never;
    query: TQuery$14;
};

type ListHomeworksRouteConfig = ListHomeworksValidation & {
    files: never;
};
type ListHomeworksResponse = ResponseWithPagination<HomeworkDTO>;

declare const listHomeworksByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListHomeworksByAdminRouteTypes = ListHomeworksRouteConfig & {
    response: APIResponse<ListHomeworksResponse>;
};

type StudentServiceDto = {
    _id: ID$1;
    uuid: string;
    name: string;
    amountBeforeDiscount: number;
    discount: number;
    amountAfterDiscount: number;
    newId: string;
    index: number;
};

type InvoiceDto = {
    _id: ID$1;
    students: UserProfileDTO[];
    parents: UserProfileDTO[];
    newId: string;
    invoiceType: TInvoiceTypeEnum;
    status: TInvoiceStatusEnum;
    splits: PaymentSplitDto[];
    services: {
        name: string;
        amount: number;
        month: number;
    }[];
    servicesCount: number;
    dates: Date[];
    isMerged: boolean;
    isPartiallyPaid: boolean;
    amount: number;
    dueDate: string
    paidAt: string| null;
};
type InvoiceSearchDto = {
    _id: ID$1;
    newId: string;
    avatar: string | null;
    name: string;
    type: "student" | "parent" | "class";
};
type PaymentSplitDto = {
    id: string;
    index: number;
    amount: number;
    dueDate: string
    paymentMethod: TPaymentMethodsEnum;
    status: TSplitsStatusEnum;
    paidAt: string| null;
};
type StudentInvoiceDto = {
    mainInvoices: InvoiceDto[];
    oneTimeInvoices: InvoiceDto[];
};
type UnMergePreview = {
    student: UserProfileDTO;
    invoice: {
        newId: string;
        month: number;
    };
    amount: number;
};
type InvoiceDetailsDto = {
    status: TInvoiceStatusEnum;
    isMerged: boolean;
    statuses: {
        isPaid: boolean;
        isOverdue: boolean;
        isMerged: boolean;
        isPartiallyPaid: boolean;
    };
    unMergePreview: UnMergePreview[];
    invoiceInformation: {
        newId: string;
        dueDate: string
        creationDate: string
        paidAt: string| null;
        paymentMethod: TPaymentMethodsEnum | null;
        invoiceType: TInvoiceTypeEnum;
        parents: UserProfileDTO[];
    };
    services: {
        _id: ID$1;
        uuid: string;
        name: string;
        amountBeforeDiscount: number;
        discount: number;
        amountAfterDiscount: number;
        newId: string;
        date: string
    }[];
    children: UserProfileDTO[];
    reminders: {
        email: string | null;
        sms: string | null;
    };
    amount: {
        TVAFees: number;
        amount: number;
        discount: number;
        taxRate: number;
    };
    splits: PaymentSplitDto[];
};
type InvoicePdfDataDto = {
    invoice: {
        newId: string;
        paidAt: string| null;
        dueDate: string
        paymentMethod: TPaymentMethodsEnum;
        dates: Date[];
        isMerged: boolean;
        invoiceType: TInvoiceTypeEnum;
        status: TInvoiceStatusEnum;
        lastSplitPaid: {
            index: number;
            amount: number;
        } | null;
    };
    total: {
        amountBeforeDiscount: number;
        amountAfterDiscount: number;
        discount: string;
        taxRate: number;
        dueAmount: number | null;
    };
    parent: UserProfileDTO & {
        address: string | null;
    };
    students: {
        name: string;
        className: string | null;
    }[];
    services: {
        month: number;
        services: StudentServiceDto[];
    }[];
    schoolInformation: SchoolDTO & {
        currency: string;
    };
    splits: PaymentSplitDto[];
};

declare const params$20: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$20 = z.infer<typeof params$20>;
type GetInvoiceDetailsValidation$1 = {
    params: TParams$20;
    body: never;
    query: never;
};

type GetInvoiceDetailsRouteConfig$1 = GetInvoiceDetailsValidation$1 & {
    files: never;
};
type GetInvoiceDetailsResponse$1 = InvoiceDetailsDto;

declare const getInvoiceDetailsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetInvoiceDetailsRouteTypes = GetInvoiceDetailsRouteConfig$1 & {
    response: APIResponse<GetInvoiceDetailsResponse$1>;
};

declare const body$1z: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    studentNewId: z.ZodString;
    invoiceType: z.ZodEnum<["monthly", "oneTime"]>;
    services: z.ZodArray<z.ZodObject<{
        id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }>, "many">;
    emailReminder: z.ZodOptional<z.ZodBoolean>;
    email: z.ZodOptional<z.ZodString>;
    smsReminder: z.ZodOptional<z.ZodBoolean>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    discount: z.ZodNumber;
    dates: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>, "many">;
}, "strip", z.ZodTypeAny, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: Date[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: (string | Date)[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}>, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: Date[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: (string | Date)[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}>, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: Date[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    invoiceType: "monthly" | "oneTime";
    discount: number;
    dates: (string | Date)[];
    studentNewId: string;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}>;
type TBody$1z = z.infer<typeof body$1z>;
type AddInvoiceForStudentValidation = {
    body: TBody$1z;
    params: never;
    query: never;
};

type AddInvoiceForStudentRouteConfig = AddInvoiceForStudentValidation & {
    files: never;
};
type AddInvoiceForStudentResponse = void;

declare const addInvoiceForStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddInvoiceForStudentByAdminRouteTypes = AddInvoiceForStudentRouteConfig & {
    response: APIResponse<AddInvoiceForStudentResponse>;
};

declare const params$1$: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1$ = z.infer<typeof params$1$>;
type DeleteInvoiceValidation = {
    body: never;
    params: TParams$1$;
    query: never;
};

type DeleteInvoiceRouteConfig = DeleteInvoiceValidation & {
    files: never;
};
type DeleteInvoiceResponse = void;

declare const deleteInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteInvoiceByAdminRouteTypes = DeleteInvoiceRouteConfig & {
    response: APIResponse<DeleteInvoiceResponse>;
};

declare const params$1_: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1_ = z.infer<typeof params$1_>;
type GetInvoiceDetailsValidation = {
    params: TParams$1_;
    query: never;
    body: never;
};

type GetInvoiceDetailsRouteConfig = GetInvoiceDetailsValidation & {
    files: never;
};
type GetInvoiceDetailsResponse = InvoiceDetailsDto;

declare const getInvoiceDetailsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetInvoiceDetailsByAdminRouteTypes = GetInvoiceDetailsRouteConfig & {
    response: APIResponse<GetInvoiceDetailsResponse>;
};

declare const params$1Z: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1Z = z.infer<typeof params$1Z>;
type GetInvoicePdfDataValidation = {
    body: never;
    params: TParams$1Z;
    query: never;
};

type GetInvoicePdfDataRouteConfig = GetInvoicePdfDataValidation & {
    files: never;
};
type GetInvoicePdfDataResponse = InvoicePdfDataDto;

declare const getInvoicePdfDataByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetInvoicePdfDataByAdminRouteTypes = GetInvoicePdfDataRouteConfig & {
    response: APIResponse<GetInvoicePdfDataResponse>;
};

declare const params$1Y: z.ZodObject<{
    searchTerm: z.ZodString;
}, "strip", z.ZodTypeAny, {
    searchTerm: string;
}, {
    searchTerm: string;
}>;
type TParams$1Y = z.infer<typeof params$1Y>;
type GetSearchInvoiceValidation = {
    body: never;
    query: never;
    params: TParams$1Y;
};

type GetSearchInvoiceRouteConfig = GetSearchInvoiceValidation & {
    files: never;
};
type GetSearchInvoiceResponse = InvoiceSearchDto[];

declare const getSearchInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSearchInvoiceByAdminRouteTypes = GetSearchInvoiceRouteConfig & {
    response: APIResponse<GetSearchInvoiceResponse>;
};

declare const params$1X: z.ZodObject<{
    parentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    parentNewId: string;
}, {
    parentNewId: string;
}>;
type TParams$1X = z.infer<typeof params$1X>;
declare const query$13: z.ZodObject<{
    studentNewId: z.ZodOptional<z.ZodString>;
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    studentNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}, {
    studentNewId?: string | undefined;
    schoolYearId?: ID$1 | undefined;
}>;
type TQuery$13 = z.infer<typeof query$13>;
type GetStudentInvoicesValidation = {
    body: never;
    params: TParams$1X;
    query: TQuery$13;
};

type GetStudentInvoicesRouteConfig = GetStudentInvoicesValidation & {
    files: never;
};
type GetStudentInvoicesResponse = StudentInvoiceDto;

declare const getStudentInvoicesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentInvoicesByAdminRouteTypes = GetStudentInvoicesRouteConfig & {
    response: APIResponse<GetStudentInvoicesResponse>;
};

type StudentPaymentConfigurationDto = {
    newId: string;
    _id: ID$1;
    emailReminder: boolean;
    email: string | null;
    smsReminder: boolean;
    phoneNumber: string | null;
    discount: number;
    studentId: ID$1;
    totalAmount: number;
    services: {
        amount: number;
        discount: number;
        name: string;
        newId: string;
        _id: ID$1;
    }[];
};

declare const params$1W: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$1W = z.infer<typeof params$1W>;
type GetStudentPaymentConfigurationValidation = {
    body: never;
    query: never;
    params: TParams$1W;
};

type GetStudentPaymentConfigurationRouteConfig = GetStudentPaymentConfigurationValidation & {
    files: never;
};
type GetStudentPaymentConfigurationResponse = StudentPaymentConfigurationDto;

declare const getStudentPaymentConfigurationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentPaymentConfigurationByAdminRouteTypes = GetStudentPaymentConfigurationRouteConfig & {
    response: APIResponse<GetStudentPaymentConfigurationResponse>;
};

declare const query$12: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly PAID: "paid";
        readonly UNPAID: "unpaid";
        readonly OVERDUE: "overdue";
        readonly PARTIALLY_PAID: "partiallyPaid";
    }>>;
    month: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    invoiceType: z.ZodOptional<z.ZodNativeEnum<{
        readonly MONTHLY: "monthly";
        readonly ONE_TIME: "oneTime";
        readonly EXTRA: "extra";
    }>>;
    paymentMethod: z.ZodOptional<z.ZodNativeEnum<{
        readonly CASH: "cash";
        readonly BANK_CHECK: "bankCheck";
        readonly BANK_TRANSFER: "bankTransfer";
    }>>;
    searchNewId: z.ZodOptional<z.ZodString>;
    searchType: z.ZodOptional<z.ZodEnum<["student", "parent", "class"]>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    status?: "paid" | "unpaid" | "overdue" | "partiallyPaid" | undefined;
    month?: number[] | undefined;
    invoiceType?: "monthly" | "oneTime" | "extra" | undefined;
    paymentMethod?: "bankCheck" | "bankTransfer" | "cash" | undefined;
    searchNewId?: string | undefined;
    searchType?: "student" | "parent" | "class" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    status?: "paid" | "unpaid" | "overdue" | "partiallyPaid" | undefined;
    month?: number[] | undefined;
    invoiceType?: "monthly" | "oneTime" | "extra" | undefined;
    paymentMethod?: "bankCheck" | "bankTransfer" | "cash" | undefined;
    searchNewId?: string | undefined;
    searchType?: "student" | "parent" | "class" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$12 = z.infer<typeof query$12>;
type ListInvoicesValidation = {
    body: never;
    params: never;
    query: TQuery$12;
};

type ListInvoicesRouteConfig = ListInvoicesValidation & {
    files: never;
};
type ListInvoicesResponse = ResponseWithPagination<InvoiceDto>;

declare const listInvoicesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListInvoicesByAdminRouteTypes = ListInvoicesRouteConfig & {
    response: APIResponse<ListInvoicesResponse>;
};

declare const body$1y: z.ZodObject<{
    invoices: z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>;
}, "strip", z.ZodTypeAny, {
    invoices: ID$1[];
}, {
    invoices: ID$1[];
}>;
type TBody$1y = z.infer<typeof body$1y>;
type MergeInvoicesValidation = {
    body: TBody$1y;
    params: never;
    query: never;
};

type MergeInvoicesRouteConfig = MergeInvoicesValidation & {
    files: never;
};
type MergeInvoicesResponse = {
    newId: string;
};

declare const mergeInvoicesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type MergeInvoicesByAdminRouteTypes = MergeInvoicesRouteConfig & {
    response: APIResponse<MergeInvoicesResponse>;
};

declare const body$1x: z.ZodDiscriminatedUnion<"paymentMethod", [z.ZodObject<{
    splitIndex: z.ZodOptional<z.ZodNumber>;
    parentId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    paymentMethod: z.ZodLiteral<"cash">;
}, "strip", z.ZodTypeAny, {
    paymentMethod: "cash";
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
}, {
    paymentMethod: "cash";
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
}>, z.ZodObject<{
    splitIndex: z.ZodOptional<z.ZodNumber>;
    parentId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    paymentMethod: z.ZodLiteral<"bankCheck">;
    fullName: z.ZodString;
    checkNumber: z.ZodString;
    bankName: z.ZodString;
    withdrawDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    paymentMethod: "bankCheck";
    bankName: string;
    checkNumber: string;
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
    withdrawDate?: string| undefined;
}, {
    fullName: string;
    paymentMethod: "bankCheck";
    bankName: string;
    checkNumber: string;
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
    withdrawDate?: string | string| undefined;
}>, z.ZodObject<{
    splitIndex: z.ZodOptional<z.ZodNumber>;
    parentId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    paymentMethod: z.ZodLiteral<"bankTransfer">;
    fullName: z.ZodString;
    amount: z.ZodNumber;
    transactionReference: z.ZodOptional<z.ZodString>;
    transferDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    bankName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    amount: number;
    paymentMethod: "bankTransfer";
    transferDate: string
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
    transactionReference?: string | undefined;
    bankName?: string | undefined;
}, {
    fullName: string;
    amount: number;
    paymentMethod: "bankTransfer";
    transferDate: (string | Date) & (string | string| undefined);
    parentId: string & {
        _isID: true;
    };
    splitIndex?: number | undefined;
    transactionReference?: string | undefined;
    bankName?: string | undefined;
}>]>;
type TBody$1x = z.infer<typeof body$1x>;
declare const params$1V: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1V = z.infer<typeof params$1V>;
type PayInvoiceValidation = {
    body: TBody$1x;
    params: TParams$1V;
    query: never;
};

type PayInvoiceRouteConfig = PayInvoiceValidation & {
    files: never;
};
type PayInvoiceResponse = void;

declare const payInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type PayInvoiceByAdminRouteTypes = PayInvoiceRouteConfig & {
    response: APIResponse<PayInvoiceResponse>;
};

declare const params$1U: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1U = z.infer<typeof params$1U>;
type UnmergeInvoiceValidation = {
    params: TParams$1U;
    body: never;
    query: never;
};

type UnmergeInvoiceRouteConfig = UnmergeInvoiceValidation & {
    files: never;
};
type UnmergeInvoiceResponse = void;

declare const unmergeInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnmergeInvoiceByAdminRouteTypes = UnmergeInvoiceRouteConfig & {
    response: APIResponse<UnmergeInvoiceResponse>;
};

declare const params$1T: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1T = z.infer<typeof params$1T>;
type UnpayInvoiceValidation = {
    params: TParams$1T;
    body: never;
    query: never;
};

type UnpayInvoiceRouteConfig = UnpayInvoiceValidation & {
    files: never;
};
type UnpayInvoiceResponse = void;

declare const unpayInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnpayInvoiceByAdminRouteTypes = UnpayInvoiceRouteConfig & {
    response: APIResponse<UnpayInvoiceResponse>;
};

declare const params$1S: z.ZodObject<{
    invoiceNewId: z.ZodString;
    splitIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
    splitIndex: number;
}, {
    invoiceNewId: string;
    splitIndex: number;
}>;
type TParams$1S = z.infer<typeof params$1S>;
type UnpaySplitValidation = {
    params: TParams$1S;
    query: never;
    body: never;
};

type UnpaySplitRouteConfig = UnpaySplitValidation & {
    files: never;
};
type UnpaySplitResponse = void;

declare const unpaySplitByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnpaySplitByAdminRouteTypes = UnpaySplitRouteConfig & {
    response: APIResponse<UnpaySplitResponse>;
};

declare const body$1w: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    bankName: z.ZodOptional<z.ZodString>;
    transactionReference: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName?: string | undefined;
    bankName?: string | undefined;
    transactionReference?: string | undefined;
}, {
    fullName?: string | undefined;
    bankName?: string | undefined;
    transactionReference?: string | undefined;
}>;
type TBody$1w = z.infer<typeof body$1w>;
declare const params$1R: z.ZodObject<{
    bankTransferNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bankTransferNewId: string;
}, {
    bankTransferNewId: string;
}>;
type TParams$1R = z.infer<typeof params$1R>;
type UpdateBankTransferValidation = {
    body: TBody$1w;
    params: TParams$1R;
    query: never;
};

type UpdateBankTransferRouteConfig = UpdateBankTransferValidation & {
    files: never;
};
type UpdateBankTransferResponse = void;

declare const updateBankTransferByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateBankTransferByAdminRouteTypes = UpdateBankTransferRouteConfig & {
    response: APIResponse<UpdateBankTransferResponse>;
};

declare const body$1v: z.ZodObject<{
    services: z.ZodArray<z.ZodObject<{
        id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        discount: z.ZodNumber;
        month: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string & {
            _isID: true;
        };
        month: number;
        discount: number;
    }, {
        id: string & {
            _isID: true;
        };
        month: number;
        discount: number;
    }>, "many">;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    discount: z.ZodNumber;
    splits: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodObject<{
        _id: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
        amount: z.ZodNumber;
        dueDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        paymentMethod: z.ZodNativeEnum<{
            readonly CASH: "cash";
            readonly BANK_CHECK: "bankCheck";
            readonly BANK_TRANSFER: "bankTransfer";
        }>;
        status: z.ZodNativeEnum<{
            readonly PAID: "paid";
            readonly UNPAID: "unpaid";
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "paid" | "unpaid";
        dueDate: string
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }, {
        status: "paid" | "unpaid";
        dueDate: (string | Date) & (string | string| undefined);
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }>, "many">, {
        status: "paid" | "unpaid";
        dueDate: string
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }[], {
        status: "paid" | "unpaid";
        dueDate: (string | Date) & (string | string| undefined);
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }[]>>;
}, "strip", z.ZodTypeAny, {
    services: {
        id: string & {
            _isID: true;
        };
        month: number;
        discount: number;
    }[];
    discount: number;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    splits?: {
        status: "paid" | "unpaid";
        dueDate: string
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }[] | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        month: number;
        discount: number;
    }[];
    discount: number;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    splits?: {
        status: "paid" | "unpaid";
        dueDate: (string | Date) & (string | string| undefined);
        amount: number;
        paymentMethod: "bankCheck" | "bankTransfer" | "cash";
        _id?: ID$1 | undefined;
    }[] | undefined;
}>;
type TBody$1v = z.infer<typeof body$1v>;
declare const params$1Q: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1Q = z.infer<typeof params$1Q>;
type UpdateInvoiceValidation = {
    body: TBody$1v;
    params: TParams$1Q;
    query: never;
};

type UpdateInvoiceRouteConfig = UpdateInvoiceValidation & {
    files: never;
};
type UpdateInvoiceResponse = void;

declare const updateInvoiceByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateInvoiceByAdminRouteTypes = UpdateInvoiceRouteConfig & {
    response: APIResponse<UpdateInvoiceResponse>;
};

declare const params$1P: z.ZodObject<{
    invoiceNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoiceNewId: string;
}, {
    invoiceNewId: string;
}>;
type TParams$1P = z.infer<typeof params$1P>;
declare const body$1u: z.ZodObject<{
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
}, {
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
}>;
type TBody$1u = z.infer<typeof body$1u>;
type UpdateInvoiceRemindersValidation = {
    params: TParams$1P;
    body: TBody$1u;
    query: never;
};

type UpdateInvoiceRemindersRouteConfig = UpdateInvoiceRemindersValidation & {
    files: never;
};
type UpdateInvoiceRemindersResponse = void;

declare const updateInvoiceRemindersByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateInvoiceRemindersByAdminRouteTypes = UpdateInvoiceRemindersRouteConfig & {
    response: APIResponse<UpdateInvoiceRemindersResponse>;
};

declare const body$1t: z.ZodEffects<z.ZodObject<{
    services: z.ZodEffects<z.ZodArray<z.ZodObject<{
        id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }>, "many">, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[], {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[]>;
    emailReminder: z.ZodOptional<z.ZodBoolean>;
    email: z.ZodOptional<z.ZodString>;
    smsReminder: z.ZodOptional<z.ZodBoolean>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    discount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}>, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}, {
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
    emailReminder?: boolean | undefined;
    email?: string | undefined;
    smsReminder?: boolean | undefined;
    phoneNumber?: string | undefined;
}>;
type TBody$1t = z.infer<typeof body$1t>;
declare const params$1O: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$1O = z.infer<typeof params$1O>;
type UpdateStudentPaymentConfigurationValidation = {
    body: TBody$1t;
    params: TParams$1O;
    query: never;
};

type UpdateStudentPaymentConfigurationRouteConfig = UpdateStudentPaymentConfigurationValidation & {
    files: never;
};
type UpdateStudentPaymentConfigurationResponse = void;

declare const updateStudentPaymentConfigurationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateStudentPaymentConfigurationByAdminRouteTypes = UpdateStudentPaymentConfigurationRouteConfig & {
    response: APIResponse<UpdateStudentPaymentConfigurationResponse>;
};

declare const query$11: z.ZodObject<{
    studentNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    studentNewId?: string | undefined;
}, {
    studentNewId?: string | undefined;
}>;
type TQuery$11 = z.infer<typeof query$11>;
type GetChildInvoicesValidation = {
    body: never;
    params: never;
    query: TQuery$11;
};

type GetChildInvoicesRouteConfig = GetChildInvoicesValidation & {
    files: never;
};
type GetChildInvoicesResponse = StudentInvoiceDto;

declare const getChildInvoicesByParentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetChildInvoicesByParentRouteTypes = GetChildInvoicesRouteConfig & {
    response: APIResponse<GetChildInvoicesResponse>;
};

declare const body$1s: z.ZodIntersection<z.ZodObject<{
    studentNewId: z.ZodString;
    content: z.ZodString;
    issueReasonId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
    content: string;
    issueReasonId: string & {
        _isID: true;
    };
}, {
    studentNewId: string;
    content: string;
    issueReasonId: string & {
        _isID: true;
    };
}>, z.ZodUnion<[z.ZodObject<{
    targetType: z.ZodLiteral<"teacher">;
    teacherId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    targetType: "teacher";
    teacherId: string & {
        _isID: true;
    };
}, {
    targetType: "teacher";
    teacherId: string & {
        _isID: true;
    };
}>, z.ZodObject<{
    targetType: z.ZodLiteral<"admin">;
    teacherId: z.ZodUndefined;
}, "strip", z.ZodTypeAny, {
    targetType: "admin";
    teacherId?: undefined;
}, {
    targetType: "admin";
    teacherId?: undefined;
}>]>>;
type TBody$1s = z.infer<typeof body$1s>;
type AddIssueValidation = {
    body: TBody$1s;
    params: never;
    query: never;
};

type AddIssueRouteConfig = AddIssueValidation & {
    files: FilesInRequest<"attachments">;
};
type AddIssueResponse = IssueDTO;

declare const addIssueRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddIssueRouteTypes = AddIssueRouteConfig & {
    response: APIResponse<AddIssueResponse>;
};

declare const params$1N: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1N = z.infer<typeof params$1N>;
type GetOneIssueValidation = {
    body: never;
    params: TParams$1N;
    query: never;
};

type GetOneIssueRouteConfig = GetOneIssueValidation & {
    files: never;
};
type GetOneIssueResponse = IssueDTO;

declare const getOneIssueRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneIssueRouteTypes = GetOneIssueRouteConfig & {
    response: APIResponse<GetOneIssueResponse>;
};

declare const params$1M: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$1M = z.infer<typeof params$1M>;
type GetTeachersOfStudentValidation = {
    body: never;
    params: TParams$1M;
    query: never;
};

type GetTeachersOfStudentRouteConfig = GetTeachersOfStudentValidation & {
    files: never;
};
type GetTeachersOfStudentResponse = {
    topicName: string;
    teacher: UserProfileDTO;
}[];

declare const getTeachersOfStudentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTeachersOfStudentRouteTypes = GetTeachersOfStudentRouteConfig & {
    response: APIResponse<GetTeachersOfStudentResponse>;
};

declare const params$1L: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1L = z.infer<typeof params$1L>;
declare const query$10: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$10 = z.infer<typeof query$10>;
type ListInteractionsOfIssueValidation = {
    body: never;
    params: TParams$1L;
    query: TQuery$10;
};

type ListInteractionsOfIssueRouteConfig = ListInteractionsOfIssueValidation & {
    files: never;
};
type ListInteractionsOfIssueResponse = ResponseWithPagination<InteractionDTO>;

declare const listInteractionsOfIssueRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListInteractionsOfIssueRouteTypes = ListInteractionsOfIssueRouteConfig & {
    response: APIResponse<ListInteractionsOfIssueResponse>;
};

declare const query$$: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$$ = z.infer<typeof query$$>;
type ListIssueReasonsValidation = {
    body: never;
    params: never;
    query: TQuery$$;
};

type ListIssueReasonsRouteConfig = ListIssueReasonsValidation & {
    files: never;
};
type ListIssueReasonsResponse = ResponseWithPagination<IssueReason>;

declare const listIssueReasonsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListIssueReasonsRouteTypes = ListIssueReasonsRouteConfig & {
    response: APIResponse<ListIssueReasonsResponse>;
};

declare const query$_: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isSeen: z.ZodOptional<z.ZodBoolean>;
    issueReasonIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    issueStatus: z.ZodOptional<z.ZodNativeEnum<{
        readonly RESOLVED: "resolved";
        readonly UNRESOLVED: "unresolved";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$_ = z.infer<typeof query$_>;
type ListIssuesOfParentValidation = {
    body: never;
    params: never;
    query: TQuery$_;
};

type ListIssuesOfParentRouteConfig = ListIssuesOfParentValidation & {
    files: never;
};
type ListIssuesOfParentResponse = ResponseWithPagination<IssueDTO>;

declare const listIssuesOfParentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListIssuesOfParentRouteTypes = ListIssuesOfParentRouteConfig & {
    response: APIResponse<ListIssuesOfParentResponse>;
};

declare const query$Z: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isSeen: z.ZodOptional<z.ZodBoolean>;
    issueReasonIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    issueStatus: z.ZodOptional<z.ZodNativeEnum<{
        readonly RESOLVED: "resolved";
        readonly UNRESOLVED: "unresolved";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$Z = z.infer<typeof query$Z>;
type ListIssuesOfTeacherValidation = {
    body: never;
    params: never;
    query: TQuery$Z;
};

type ListIssuesOfTeacherRouteConfig = ListIssuesOfTeacherValidation & {
    files: never;
};
type ListIssuesOfTeacherResponse = ResponseWithPagination<IssueDTO>;

declare const listIssuesOfTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListIssuesOfTeacherRouteTypes = ListIssuesOfTeacherRouteConfig & {
    response: APIResponse<ListIssuesOfTeacherResponse>;
};

declare const body$1r: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
}, {
    text?: string | undefined;
}>;
type TBody$1r = z.infer<typeof body$1r>;
declare const params$1K: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1K = z.infer<typeof params$1K>;
type SendReplyValidation = {
    body: TBody$1r;
    params: TParams$1K;
    query: never;
};

type SendReplyRouteConfig = SendReplyValidation & {
    files: FilesInRequest<"attachments">;
};
type SendReplyResponse = InteractionDTO;

declare const sendReplyRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type SendReplyRouteTypes = SendReplyRouteConfig & {
    response: APIResponse<SendReplyResponse>;
};

declare const body$1q: z.ZodObject<{
    teacherId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    teacherId: string & {
        _isID: true;
    };
}, {
    teacherId: string & {
        _isID: true;
    };
}>;
type TBody$1q = z.infer<typeof body$1q>;
declare const params$1J: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1J = z.infer<typeof params$1J>;
type AssignTeacherToIssueValidation = {
    body: TBody$1q;
    params: TParams$1J;
    query: never;
};

type AssignTeacherToIssueRouteConfig = AssignTeacherToIssueValidation & {
    files: never;
};
type AssignTeacherToIssueResponse = void;

declare const assignTeacherToIssueByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AssignTeacherToIssueByAdminRouteTypes = AssignTeacherToIssueRouteConfig & {
    response: APIResponse<AssignTeacherToIssueResponse>;
};

declare const params$1I: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1I = z.infer<typeof params$1I>;
type ForwardIssueValidation = {
    body: never;
    params: TParams$1I;
    query: never;
};

type ForwardIssueRouteConfig = ForwardIssueValidation & {
    files: never;
};
type ForwardIssueResponse = void;

declare const forwardIssueByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ForwardIssueByAdminRouteTypes = ForwardIssueRouteConfig & {
    response: APIResponse<ForwardIssueResponse>;
};

declare const query$Y: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isSeen: z.ZodOptional<z.ZodBoolean>;
    issueReasonIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    issueStatus: z.ZodOptional<z.ZodNativeEnum<{
        readonly RESOLVED: "resolved";
        readonly UNRESOLVED: "unresolved";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isSeen?: boolean | undefined;
    issueReasonIds?: ID$1[] | undefined;
    issueStatus?: "resolved" | "unresolved" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$Y = z.infer<typeof query$Y>;
type ListIssuesValidation = {
    body: never;
    params: never;
    query: TQuery$Y;
};

type ListIssuesRouteConfig = ListIssuesValidation & {
    files: never;
};
type ListIssuesResponse = ResponseWithPagination<IssueDTO>;

declare const listIssuesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListIssuesByAdminRouteTypes = ListIssuesRouteConfig & {
    response: APIResponse<ListIssuesResponse>;
};

declare const params$1H: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1H = z.infer<typeof params$1H>;
type UnassignTeacherFromIssueValidation = {
    body: never;
    params: TParams$1H;
    query: never;
};

type UnassignTeacherFromIssueRouteConfig = UnassignTeacherFromIssueValidation & {
    files: never;
};
type UnassignTeacherFromIssueResponse = void;

declare const unassignTeacherFromIssueByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnassignTeacherFromIssueByAdminRouteTypes = UnassignTeacherFromIssueRouteConfig & {
    response: APIResponse<UnassignTeacherFromIssueResponse>;
};

declare const body$1p: z.ZodObject<{
    status: z.ZodNativeEnum<{
        readonly RESOLVED: "resolved";
        readonly UNRESOLVED: "unresolved";
    }>;
}, "strip", z.ZodTypeAny, {
    status: "resolved" | "unresolved";
}, {
    status: "resolved" | "unresolved";
}>;
type TBody$1p = z.infer<typeof body$1p>;
declare const params$1G: z.ZodObject<{
    issueNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueNewId: string;
}, {
    issueNewId: string;
}>;
type TParams$1G = z.infer<typeof params$1G>;
type UpdateIssueStatusValidation = {
    body: TBody$1p;
    params: TParams$1G;
    query: never;
};

type UpdateIssueStatusRouteConfig = UpdateIssueStatusValidation & {
    files: never;
};
type UpdateIssueStatusResponse = void;

declare const updateIssueStatusByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateIssueStatusByAdminRouteTypes = UpdateIssueStatusRouteConfig & {
    response: APIResponse<UpdateIssueStatusResponse>;
};

declare const body$1o: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodString;
    schoolYear: z.ZodObject<{
        name: z.ZodString;
        startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        terms: z.ZodArray<z.ZodObject<{
            termNewId: z.ZodString;
            startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
            endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        }, "strip", z.ZodTypeAny, {
            startDate: string
            endDate: string
            termNewId: string;
        }, {
            startDate: (string | Date) & (string | string| undefined);
            endDate: (string | Date) & (string | string| undefined);
            termNewId: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        startDate: string
        endDate: string
        terms: {
            startDate: string
            endDate: string
            termNewId: string;
        }[];
    }, {
        name: string;
        startDate: (string | Date) & (string | string| undefined);
        endDate: (string | Date) & (string | string| undefined);
        terms: {
            startDate: (string | Date) & (string | string| undefined);
            endDate: (string | Date) & (string | string| undefined);
            termNewId: string;
        }[];
    }>;
    establishmentTitle: z.ZodOptional<z.ZodNativeEnum<{
        readonly PRIVATE_PRIMARY: "PRIVATE_PRIMARY";
        readonly PRIVATE_SECONDARY: "PRIVATE_SECONDARY";
        readonly PRIVATE_MIDDLE: "PRIVATE_MIDDLE";
    }>>;
    examGradeSystem: z.ZodOptional<z.ZodNativeEnum<{
        readonly PRIMARY: "PRIMARY";
        readonly SECONDARY: "SECONDARY";
        readonly AUTOMATIC_PROMOTION: "AUTOMATIC_PROMOTION";
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    schoolYear: {
        name: string;
        startDate: string
        endDate: string
        terms: {
            startDate: string
            endDate: string
            termNewId: string;
        }[];
    };
    color: string;
    establishmentTitle?: "PRIVATE_PRIMARY" | "PRIVATE_SECONDARY" | "PRIVATE_MIDDLE" | undefined;
    examGradeSystem?: "PRIMARY" | "SECONDARY" | "AUTOMATIC_PROMOTION" | undefined;
}, {
    name: string;
    schoolYear: {
        name: string;
        startDate: (string | Date) & (string | string| undefined);
        endDate: (string | Date) & (string | string| undefined);
        terms: {
            startDate: (string | Date) & (string | string| undefined);
            endDate: (string | Date) & (string | string| undefined);
            termNewId: string;
        }[];
    };
    color: string;
    establishmentTitle?: "PRIVATE_PRIMARY" | "PRIVATE_SECONDARY" | "PRIVATE_MIDDLE" | undefined;
    examGradeSystem?: "PRIMARY" | "SECONDARY" | "AUTOMATIC_PROMOTION" | undefined;
}>;
type TBody$1o = z.infer<typeof body$1o>;
type AddLevelValidation = {
    body: TBody$1o;
    params: never;
    query: never;
};

type AddLevelRouteConfig = AddLevelValidation & {
    files: never;
};
type AddLevelResponse = Level;

declare const addLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddLevelByAdminRouteTypes = AddLevelRouteConfig & {
    response: APIResponse<AddLevelResponse>;
};

declare const body$1n: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    establishmentTitle: z.ZodOptional<z.ZodNativeEnum<{
        readonly PRIVATE_PRIMARY: "PRIVATE_PRIMARY";
        readonly PRIVATE_SECONDARY: "PRIVATE_SECONDARY";
        readonly PRIVATE_MIDDLE: "PRIVATE_MIDDLE";
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    color?: string | undefined;
    establishmentTitle?: "PRIVATE_PRIMARY" | "PRIVATE_SECONDARY" | "PRIVATE_MIDDLE" | undefined;
}, {
    name?: string | undefined;
    color?: string | undefined;
    establishmentTitle?: "PRIVATE_PRIMARY" | "PRIVATE_SECONDARY" | "PRIVATE_MIDDLE" | undefined;
}>;
type TBody$1n = z.infer<typeof body$1n>;
declare const params$1F: z.ZodObject<{
    levelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    levelNewId: string;
}, {
    levelNewId: string;
}>;
type TParams$1F = z.infer<typeof params$1F>;
type UpdateLevelValidation = {
    body: TBody$1n;
    params: TParams$1F;
    query: never;
};

type UpdateLevelRouteConfig = UpdateLevelValidation & {
    files: never;
};
type UpdateLevelResponse = void;

declare const updateLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateLevelByAdminRouteTypes = UpdateLevelRouteConfig & {
    response: APIResponse<UpdateLevelResponse>;
};

declare const params$1E: z.ZodObject<{
    levelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    levelNewId: string;
}, {
    levelNewId: string;
}>;
type TParams$1E = z.infer<typeof params$1E>;
type DeleteLevelValidation = {
    body: never;
    params: TParams$1E;
    query: never;
};

type DeleteLevelRouteConfig = DeleteLevelValidation & {
    files: never;
};
type DeleteLevelResponse = void;

declare const deleteLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteLevelByAdminRouteTypes = DeleteLevelRouteConfig & {
    response: APIResponse<DeleteLevelResponse>;
};

type LevelOverviewDto = EntityDto & {
    color: string;
    subLevelsOverview: {
        subLevel: EntityDto;
        classNumber: number;
        studentNumber: number;
        teacherNumber: number;
    }[];
};

type GetLevelsOverviewValidation = {
    body: never;
    params: never;
    query: never;
};

type GetLevelsOverviewRouteConfig = GetLevelsOverviewValidation & {
    files: never;
};
type GetLevelsOverviewResponse = LevelOverviewDto[];

declare const getLevelsOverviewByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetLevelsOverviewByAdminRouteTypes = GetLevelsOverviewRouteConfig & {
    response: APIResponse<GetLevelsOverviewResponse>;
};

declare const query$X: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$X = z.infer<typeof query$X>;
type ListLevelsValidation$1 = {
    body: never;
    params: never;
    query: TQuery$X;
};

type ListLevelsRouteConfig$1 = ListLevelsValidation$1 & {
    files: never;
};
type ListLevelsResponse$1 = ResponseWithPagination<Level>;

declare const listLevelsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListLevelsByAdminRouteTypes = ListLevelsRouteConfig$1 & {
    response: APIResponse<ListLevelsResponse$1>;
};

declare const body$1m: z.ZodObject<{
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
}, {
    newRank: number;
}>;
type TBody$1m = z.infer<typeof body$1m>;
declare const params$1D: z.ZodObject<{
    levelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    levelNewId: string;
}, {
    levelNewId: string;
}>;
type TParams$1D = z.infer<typeof params$1D>;
type ReorderLevelsValidation = {
    body: TBody$1m;
    params: TParams$1D;
    query: never;
};

type ReorderLevelsRouteConfig = ReorderLevelsValidation & {
    files: never;
};
type ReorderLevelsResponse = void;

declare const reorderLevelsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderLevelsByAdminRouteTypes = ReorderLevelsRouteConfig & {
    response: APIResponse<ReorderLevelsResponse>;
};

declare const query$W: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    schoolSubdomain: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    schoolSubdomain: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    schoolSubdomain: string;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$W = z.infer<typeof query$W>;
type ListLevelsValidation = {
    body: never;
    params: never;
    query: TQuery$W;
};

type ListLevelsRouteConfig = ListLevelsValidation & {
    files: never;
};
type ListLevelsResponse = ResponseWithPagination<{
    _id: ID$1;
    newId: string;
    name: string;
}>;

declare const listLevelsByPublicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListLevelsByPublicRouteTypes = ListLevelsRouteConfig & {
    response: APIResponse<ListLevelsResponse>;
};

declare const body$1l: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    classTypeNewId: z.ZodOptional<z.ZodString>;
    topicNewId: z.ZodString;
    topicType: z.ZodEnum<["subjectType", "subSubjectType", "groupType"]>;
    chapterAttachmentFileNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    topicType: "subjectType" | "subSubjectType" | "groupType";
    chapterAttachmentFileNewIds: string[];
    topicNewId: string;
    description?: string | undefined;
    classTypeNewId?: string | undefined;
}, {
    name: string;
    topicType: "subjectType" | "subSubjectType" | "groupType";
    chapterAttachmentFileNewIds: string[];
    topicNewId: string;
    description?: string | undefined;
    classTypeNewId?: string | undefined;
}>;
type TBody$1l = z.infer<typeof body$1l>;
type AddChapterValidation = {
    body: TBody$1l;
    params: never;
    query: never;
};

type AddChapterRouteConfig = AddChapterValidation & {
    files: never;
};
type AddChapterResponse = void;

declare const addChapterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddChapterRouteTypes = AddChapterRouteConfig & {
    response: APIResponse<AddChapterResponse>;
};

declare const body$1k: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodString;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subSubjectTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    teacherNewId: string;
    description?: string | undefined;
    classTypes?: string[] | undefined;
    subjectTypes?: string[] | undefined;
    subSubjectTypes?: string[] | undefined;
}, {
    name: string;
    teacherNewId: string;
    description?: string | undefined;
    classTypes?: string[] | undefined;
    subjectTypes?: string[] | undefined;
    subSubjectTypes?: string[] | undefined;
}>;
type TBody$1k = z.infer<typeof body$1k>;
type AddChapterAttachmentValidation = {
    body: TBody$1k;
    params: never;
    query: never;
};

type AddChapterAttachmentRouteConfig = AddChapterAttachmentValidation & {
    files: FilesInRequest<"files">;
};
type AddChapterAttachmentResponse = void;

declare const addChapterAttachmentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddChapterAttachmentRouteTypes = AddChapterAttachmentRouteConfig & {
    response: APIResponse<AddChapterAttachmentResponse>;
};

declare const params$1C: z.ZodObject<{
    chapterNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chapterNewId: string;
}, {
    chapterNewId: string;
}>;
type TParams$1C = z.infer<typeof params$1C>;
type DeleteChapterValidation = {
    body: never;
    params: TParams$1C;
    query: never;
};

type DeleteChapterRouteConfig = DeleteChapterValidation & {
    files: never;
};
type DeleteChapterResponse = void;

declare const deleteChapterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteChapterRouteTypes = DeleteChapterRouteConfig & {
    response: APIResponse<DeleteChapterResponse>;
};

declare const params$1B: z.ZodObject<{
    chapterAttachmentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chapterAttachmentNewId: string;
}, {
    chapterAttachmentNewId: string;
}>;
type TParams$1B = z.infer<typeof params$1B>;
type DeleteChapterAttachmentValidation = {
    body: never;
    query: never;
    params: TParams$1B;
};

type DeleteChapterAttachmentRouteConfig = DeleteChapterAttachmentValidation & {
    files: never;
};
type DeleteChapterAttachmentResponse = void;

declare const deleteChapterAttachmentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteChapterAttachmentRouteTypes = DeleteChapterAttachmentRouteConfig & {
    response: APIResponse<DeleteChapterAttachmentResponse>;
};

type ChapterAttachmentDto = {
    _id: ID$1;
    newId: string;
    name: string;
    status: TChapterAttachmentStatusEnum;
    type: TChapterAttachmentFileTypeEnum;
    description: string | null;
    teacher: UserProfileDTO;
    files: ChapterAttachmentFile[];
    createdAt: string
    classTypes: EntityDto[];
    subjectTypes: EntityDto[];
    subSubjectTypes: EntityDto[];
};
type ChapterAttachmentDetailsDto = {
    _id: ID$1;
    newId: string;
    name: string;
    status: TChapterAttachmentStatusEnum;
    description: string | null;
    teacher: UserProfileDTO;
    files: (ChapterAttachmentFile & {
        id: string;
    })[];
    createdAt: string
    type: TChapterAttachmentFileTypeEnum;
};

type topicChapterDto = {
    videoNumber: number;
    filesNumber: number;
    topic: {
        type: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
        _id: ID$1;
        newId: string;
        name: string;
    };
    illustration: string;
};
type ChapterDetailsDto = {
    name: string;
    _id: ID$1;
    newId: string;
    description: string | null;
    attachments: ChapterAttachmentDetailsDto[];
    videoNumber: number;
    filesNumber: number;
    totalDurationInSeconds: number;
};

declare const query$V: z.ZodObject<{
    topicType: z.ZodEnum<["subjectType", "subSubjectType", "groupType"]>;
    topicNewId: z.ZodString;
    classTypeNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    topicType: "subjectType" | "subSubjectType" | "groupType";
    topicNewId: string;
    classTypeNewId?: string | undefined;
}, {
    topicType: "subjectType" | "subSubjectType" | "groupType";
    topicNewId: string;
    classTypeNewId?: string | undefined;
}>;
type TQuery$V = z.infer<typeof query$V>;
type GetChaptersByTopicValidation = {
    body: never;
    params: never;
    query: TQuery$V;
};

type GetChaptersByTopicRouteConfig = GetChaptersByTopicValidation & {
    files: never;
};
type GetChaptersByTopicResponse = ChapterDetailsDto[];

declare const getChaptersByTopicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetChaptersByTopicRouteTypes = GetChaptersByTopicRouteConfig & {
    response: APIResponse<GetChaptersByTopicResponse>;
};

type GetGroupTypesOfChaptersValidation = {
    body: never;
    params: never;
    query: never;
};

type GetGroupTypesOfChaptersRouteConfig = GetGroupTypesOfChaptersValidation & {
    files: never;
};
type GetGroupTypesOfChaptersResponse = topicChapterDto[];

declare const getGroupTypesOfChaptersRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetGroupTypesOfChaptersRouteTypes = GetGroupTypesOfChaptersRouteConfig & {
    response: APIResponse<GetGroupTypesOfChaptersResponse>;
};

declare const query$U: z.ZodObject<{
    studentNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    studentNewId?: string | undefined;
}, {
    studentNewId?: string | undefined;
}>;
type TQuery$U = z.infer<typeof query$U>;
type GetStudentTopicsChaptersValidation = {
    query: TQuery$U;
    body: never;
    params: never;
};

type GetStudentTopicsChaptersRouteConfig = GetStudentTopicsChaptersValidation & {
    files: never;
};
type GetStudentTopicsChaptersResponse = topicChapterDto[];

declare const getStudentTopicsChaptersRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetStudentTopicsChaptersRouteTypes = GetStudentTopicsChaptersRouteConfig & {
    response: APIResponse<GetStudentTopicsChaptersResponse>;
};

declare const params$1A: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$1A = z.infer<typeof params$1A>;
type GetTopicsOfChaptersByClassTypeValidation = {
    params: TParams$1A;
    body: never;
    query: never;
};

type GetTopicsOfChaptersByClassTypeRouteConfig = GetTopicsOfChaptersByClassTypeValidation & {
    files: never;
};
type GetTopicsOfChaptersByClassTypeResponse = topicChapterDto[];

declare const getTopicsOfChaptersByClassTypeRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTopicsOfChaptersByClassTypeRouteTypes = GetTopicsOfChaptersByClassTypeRouteConfig & {
    response: APIResponse<GetTopicsOfChaptersByClassTypeResponse>;
};

declare const query$T: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    classTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subSubjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$T = z.infer<typeof query$T>;
type ListChapterAttachmentsValidation = {
    body: never;
    params: never;
    query: TQuery$T;
};

type ListChapterAttachmentsRouteConfig = ListChapterAttachmentsValidation & {
    files: never;
};
type ListChapterAttachmentsResponse = ResponseWithPagination<ChapterAttachmentDto>;

declare const listChapterAttachmentsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListChapterAttachmentsRouteTypes = ListChapterAttachmentsRouteConfig & {
    response: APIResponse<ListChapterAttachmentsResponse>;
};

declare const query$S: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    classTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subSubjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$S = z.infer<typeof query$S>;
type ListChapterDocumentsValidation = {
    body: never;
    params: never;
    query: TQuery$S;
};

type ListChapterDocumentsRouteConfig = ListChapterDocumentsValidation & {
    files: never;
};
type ListChapterDocumentsResponse = ResponseWithPagination<ChapterAttachmentDto>;

declare const listChapterDocumentsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListChapterDocumentsRouteTypes = ListChapterDocumentsRouteConfig & {
    response: APIResponse<ListChapterDocumentsResponse>;
};

declare const query$R: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    classTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subSubjectTypeIds: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    classTypeIds?: ID$1[] | undefined;
    subjectTypeIds?: ID$1[] | undefined;
    subSubjectTypeIds?: ID$1[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$R = z.infer<typeof query$R>;
type ListChapterVideoValidation = {
    body: never;
    params: never;
    query: TQuery$R;
};

type ListChapterVideoRouteConfig = ListChapterVideoValidation & {
    files: never;
};
type ListChapterVideoResponse = ResponseWithPagination<ChapterAttachmentDto>;

declare const listChapterVideoRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListChapterVideoRouteTypes = ListChapterVideoRouteConfig & {
    response: APIResponse<ListChapterVideoResponse>;
};

declare const body$1j: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    chapterAttachmentNewIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    chapterAttachmentNewIds?: string[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    chapterAttachmentNewIds?: string[] | undefined;
}>;
type TBody$1j = z.infer<typeof body$1j>;
declare const params$1z: z.ZodObject<{
    chapterNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chapterNewId: string;
}, {
    chapterNewId: string;
}>;
type TParams$1z = z.infer<typeof params$1z>;
type UpdateChapterValidation = {
    params: TParams$1z;
    body: TBody$1j;
    query: never;
};

type UpdateChapterRouteConfig = UpdateChapterValidation & {
    files: never;
};
type UpdateChapterResponse = void;

declare const updateChapterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateChapterRouteTypes = UpdateChapterRouteConfig & {
    response: APIResponse<UpdateChapterResponse>;
};

declare const body$1i: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly USED: "used";
        readonly UNUSED: "unused";
    }>>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    subSubjectTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    teacherNewId?: string | undefined;
    status?: "used" | "unused" | undefined;
    classTypes?: string[] | undefined;
    subjectTypes?: string[] | undefined;
    subSubjectTypes?: string[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    teacherNewId?: string | undefined;
    status?: "used" | "unused" | undefined;
    classTypes?: string[] | undefined;
    subjectTypes?: string[] | undefined;
    subSubjectTypes?: string[] | undefined;
}>;
type TBody$1i = z.infer<typeof body$1i>;
declare const params$1y: z.ZodObject<{
    chapterAttachmentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chapterAttachmentNewId: string;
}, {
    chapterAttachmentNewId: string;
}>;
type TParams$1y = z.infer<typeof params$1y>;
type UpdateChapterAttachmentValidation = {
    body: TBody$1i;
    params: TParams$1y;
    query: never;
};

type UpdateChapterAttachmentRouteConfig = UpdateChapterAttachmentValidation & {
    files: FilesInRequest<"files">;
};
type UpdateChapterAttachmentResponse = void;

declare const updateChapterAttachmentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateChapterAttachmentRouteTypes = UpdateChapterAttachmentRouteConfig & {
    response: APIResponse<UpdateChapterAttachmentResponse>;
};

declare const body$1h: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>;
    birthDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    password: z.ZodString;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    roles: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    birthDate: string
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}, {
    birthDate: (string | Date) & (string | string| undefined);
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    roles: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
}>;
type TBody$1h = z.infer<typeof body$1h>;
type AddMasterValidation = {
    body: TBody$1h;
    params: never;
    query: never;
};

type AddMasterRouteConfig = AddMasterValidation & {
    files: never;
};
type AddMasterResponse = void;

declare const addMasterByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddMasterByMasterRouteTypes = AddMasterRouteConfig & {
    response: APIResponse<AddMasterResponse>;
};

declare const params$1x: z.ZodObject<{
    masterNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    masterNewId: string;
}, {
    masterNewId: string;
}>;
type TParams$1x = z.infer<typeof params$1x>;
type DeleteMasterValidation = {
    body: never;
    params: TParams$1x;
    query: never;
};

type DeleteMasterRouteConfig = DeleteMasterValidation & {
    files: never;
};
type DeleteMasterResponse = void;

declare const deleteMasterByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteMasterByMasterRouteTypes = DeleteMasterRouteConfig & {
    response: APIResponse<DeleteMasterResponse>;
};

type GetAppVersionValidation$1 = {
    body: never;
    params: never;
    query: never;
};

type GetAppVersionRouteConfig$1 = GetAppVersionValidation$1 & {
    files: never;
};
type GetAppVersionResponse$1 = {
    android: string;
    ios: string;
};

declare const getAppVersionByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetAppVersionByMasterRouteTypes = GetAppVersionRouteConfig$1 & {
    response: APIResponse<GetAppVersionResponse$1>;
};

type MasterDTO = {
    _id: ID$1;
    newId: string;
    firstName: string;
    lastName: string;
    birthDate: string| null;
    fullName: string;
    avatar: string;
    gender: string;
    email: string | null;
    phoneNumber: string | null;
    roles: {
        _id: ID$1;
        newId: string;
        name: string;
    }[];
};

declare const query$Q: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$Q = z.infer<typeof query$Q>;
type ListMastersValidation = {
    body: never;
    params: never;
    query: TQuery$Q;
};

type ListMastersRouteConfig = ListMastersValidation & {
    files: never;
};
type ListMastersResponse = ResponseWithPagination<MasterDTO>;

declare const listMastersByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListMastersByMasterRouteTypes = ListMastersRouteConfig & {
    response: APIResponse<ListMastersResponse>;
};

declare const body$1g: z.ZodRecord<z.ZodNativeEnum<{
    readonly ANDROID: "android";
    readonly IOS: "ios";
}>, z.ZodString>;
type TBody$1g = z.infer<typeof body$1g>;
type UpdateAppVersionValidation = {
    body: TBody$1g;
    params: never;
    query: never;
};

type UpdateAppVersionRouteConfig = UpdateAppVersionValidation & {
    files: never;
};
type UpdateAppVersionResponse = void;

declare const updateAppVersionByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UpdateAppVersionByMasterRouteTypes = UpdateAppVersionRouteConfig & {
    response: APIResponse<UpdateAppVersionResponse>;
};

declare const body$1f: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    roles: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    birthDate?: string| undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    roles?: ID$1[] | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    birthDate?: string | string| undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    roles?: ID$1[] | undefined;
}>;
type TBody$1f = z.infer<typeof body$1f>;
declare const params$1w: z.ZodObject<{
    masterNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    masterNewId: string;
}, {
    masterNewId: string;
}>;
type TParams$1w = z.infer<typeof params$1w>;
type UpdateMasterValidation = {
    body: TBody$1f;
    params: TParams$1w;
    query: never;
};

type UpdateMasterRouteConfig = UpdateMasterValidation & {
    files: never;
};
type UpdateMasterResponse = void;

declare const updateMasterByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateMasterByMasterRouteTypes = UpdateMasterRouteConfig & {
    response: APIResponse<UpdateMasterResponse>;
};

type GetAppVersionValidation = {
    body: never;
    params: never;
    query: never;
};

type GetAppVersionRouteConfig = GetAppVersionValidation & {
    files: never;
};
type GetAppVersionResponse = {
    android: string;
    ios: string;
};

declare const getAppVersionByPublicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetAppVersionByPublicRouteTypes = GetAppVersionRouteConfig & {
    response: APIResponse<GetAppVersionResponse>;
};

declare const body$1e: z.ZodObject<{
    links: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    replyTo: z.ZodOptional<z.ZodString>;
    conversationNewId: z.ZodOptional<z.ZodString>;
    participants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        _id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        userType: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
    }, "strip", z.ZodTypeAny, {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }, {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }>, "many">, {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[], {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[]>;
}, "strip", z.ZodTypeAny, {
    participants: {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[];
    links: string[];
    content?: string | undefined;
    replyTo?: string | undefined;
    conversationNewId?: string | undefined;
}, {
    participants: {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[];
    links?: string[] | undefined;
    content?: string | undefined;
    replyTo?: string | undefined;
    conversationNewId?: string | undefined;
}>;
type TBody$1e = z.infer<typeof body$1e>;
type AddMessageValidation = {
    body: TBody$1e;
    params: never;
    query: never;
};
declare const AddMessageValidation: {
    body: z.ZodObject<{
        links: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        content: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
        replyTo: z.ZodOptional<z.ZodString>;
        conversationNewId: z.ZodOptional<z.ZodString>;
        participants: z.ZodEffects<z.ZodArray<z.ZodObject<{
            _id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
            userType: z.ZodNativeEnum<{
                readonly ADMIN: "admin";
                readonly TEACHER: "teacher";
                readonly STUDENT: "student";
                readonly PARENT: "parent";
                readonly MASTER: "master";
            }>;
        }, "strip", z.ZodTypeAny, {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }, {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }>, "many">, {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }[], {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }[]>;
    }, "strip", z.ZodTypeAny, {
        participants: {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }[];
        links: string[];
        content?: string | undefined;
        replyTo?: string | undefined;
        conversationNewId?: string | undefined;
    }, {
        participants: {
            _id: string & {
                _isID: true;
            };
            userType: "admin" | "teacher" | "student" | "parent" | "master";
        }[];
        links?: string[] | undefined;
        content?: string | undefined;
        replyTo?: string | undefined;
        conversationNewId?: string | undefined;
    }>;
};

type AddMessageRouteConfig = AddMessageValidation & {
    files: FilesInRequest<"files" | "media">;
};
type AddMessageResponse = {
    isNewConversation: boolean;
    message: MessageDTO;
    conversation: ConversationDTO;
};

declare const AddMessageRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddMessageRouteTypes = AddMessageRouteConfig & {
    response: APIResponse<AddMessageResponse>;
};

declare const body$1d: z.ZodObject<{
    reactionType: z.ZodNullable<z.ZodNativeEnum<{
        readonly LIKE: "like";
        readonly care: "care";
        readonly LOVE: "love";
        readonly LAUGH: "laugh";
        readonly ANGRY: "angry";
        readonly SAD: "sad";
        readonly SURPRISED: "surprised";
    }>>;
}, "strip", z.ZodTypeAny, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}, {
    reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
}>;
type TBody$1d = z.infer<typeof body$1d>;
declare const params$1v: z.ZodObject<{
    messageNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    messageNewId: string;
}, {
    messageNewId: string;
}>;
type TParams$1v = z.infer<typeof params$1v>;
type AddReactToMessageValidation = {
    body: TBody$1d;
    params: TParams$1v;
    query: never;
};
declare const AddReactToMessageValidation: {
    body: z.ZodObject<{
        reactionType: z.ZodNullable<z.ZodNativeEnum<{
            readonly LIKE: "like";
            readonly care: "care";
            readonly LOVE: "love";
            readonly LAUGH: "laugh";
            readonly ANGRY: "angry";
            readonly SAD: "sad";
            readonly SURPRISED: "surprised";
        }>>;
    }, "strip", z.ZodTypeAny, {
        reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
    }, {
        reactionType: "like" | "care" | "love" | "laugh" | "angry" | "sad" | "surprised" | null;
    }>;
    params: z.ZodObject<{
        messageNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        messageNewId: string;
    }, {
        messageNewId: string;
    }>;
};

type AddReactToMessageRouteConfig = AddReactToMessageValidation & {
    files: never;
};
type AddReactToMessageResponse = void;

declare const AddReactToMessageRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddReactToMessageRouteTypes = AddReactToMessageRouteConfig & {
    response: APIResponse<AddReactToMessageResponse>;
};

type GetMessagesReactionsDto = {
    reactionType: TReactionTypeEnum;
    reactedAt: string
    user: UserProfileDTO & {
        type: TEndUserEnum;
    };
};

declare const params$1u: z.ZodObject<{
    messageNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    messageNewId: string;
}, {
    messageNewId: string;
}>;
type TParams$1u = z.infer<typeof params$1u>;
type GetMessageReactionsValidation = {
    body: never;
    params: TParams$1u;
    query: never;
};
declare const GetMessageReactionsValidation: {
    params: z.ZodObject<{
        messageNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        messageNewId: string;
    }, {
        messageNewId: string;
    }>;
};

type GetMessageReactionsRouteConfig = GetMessageReactionsValidation & {
    files: never;
};
type GetMessageReactionsResponse = GetMessagesReactionsDto[];

declare const GetMessageReactionsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetMessageReactionsRouteTypes = GetMessageReactionsRouteConfig & {
    response: APIResponse<GetMessageReactionsResponse>;
};

declare const body$1c: z.ZodObject<{
    participants: z.ZodArray<z.ZodObject<{
        _id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        userType: z.ZodNativeEnum<{
            readonly ADMIN: "admin";
            readonly TEACHER: "teacher";
            readonly STUDENT: "student";
            readonly PARENT: "parent";
            readonly MASTER: "master";
        }>;
    }, "strip", z.ZodTypeAny, {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }, {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    participants: {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[];
}, {
    participants: {
        _id: string & {
            _isID: true;
        };
        userType: "admin" | "teacher" | "student" | "parent" | "master";
    }[];
}>;
type TBody$1c = z.infer<typeof body$1c>;
declare const params$1t: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1t = z.infer<typeof params$1t>;
type AddParticipantToGroupValidation = {
    body: TBody$1c;
    params: TParams$1t;
    query: never;
};

type AddParticipantToGroupRouteConfig = AddParticipantToGroupValidation & {
    files: never;
};
type AddParticipantToGroupResponse = void;

declare const addParticipantToGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddParticipantToGroupRouteTypes = AddParticipantToGroupRouteConfig & {
    response: APIResponse<AddParticipantToGroupResponse>;
};

declare const params$1s: z.ZodObject<{
    messageNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    messageNewId: string;
}, {
    messageNewId: string;
}>;
type TParams$1s = z.infer<typeof params$1s>;
type DeleteMessageValidation = {
    body: never;
    params: TParams$1s;
    query: never;
};

type DeleteMessageRouteConfig = DeleteMessageValidation & {
    files: never;
};
type DeleteMessageResponse = void;

declare const deleteMessageRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteMessageRouteTypes = DeleteMessageRouteConfig & {
    response: APIResponse<DeleteMessageResponse>;
};

declare const body$1b: z.ZodObject<{
    participantIds: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    participantIds: ID$1[];
}, {
    participantIds: ID$1[];
}>;
type TBody$1b = z.infer<typeof body$1b>;
declare const params$1r: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1r = z.infer<typeof params$1r>;
type DeleteParticipantFromGroupValidation = {
    body: TBody$1b;
    params: TParams$1r;
    query: never;
};

type DeleteParticipantFromGroupRouteConfig = DeleteParticipantFromGroupValidation & {
    files: never;
};
type DeleteParticipantFromGroupResponse = void;

declare const deleteParticipantFromGroupRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteParticipantFromGroupRouteTypes = DeleteParticipantFromGroupRouteConfig & {
    response: APIResponse<DeleteParticipantFromGroupResponse>;
};

declare const query$P: z.ZodObject<{
    fullName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
}, {
    fullName?: string | undefined;
}>;
type TQuery$P = z.infer<typeof query$P>;
type GetMessageTargetUsersValidation = {
    body: never;
    params: never;
    query: TQuery$P;
};

type GetMessageTargetUsersRouteConfig = GetMessageTargetUsersValidation & {
    files: never;
};
type GetMessageTargetUsersResponse = Participant[];

declare const getMessageTargetUsersRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetMessageTargetUsersRouteTypes = GetMessageTargetUsersRouteConfig & {
    response: APIResponse<GetMessageTargetUsersResponse>;
};

declare const params$1q: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1q = z.infer<typeof params$1q>;
type GetOneConversationValidation = {
    body: never;
    params: TParams$1q;
    query: never;
};

type GetOneConversationRouteConfig = GetOneConversationValidation & {
    files: never;
};
type GetOneConversationResponse = ConversationDTO;

declare const getOneConversationRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneConversationRouteTypes = GetOneConversationRouteConfig & {
    response: APIResponse<GetOneConversationResponse>;
};

declare const body$1a: z.ZodObject<{
    participants: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    participants: ID$1[];
}, {
    participants: ID$1[];
}>;
type TBody$1a = z.infer<typeof body$1a>;
type GetOneConversationMessagesValidation = {
    body: TBody$1a;
    params: never;
    query: never;
};

type GetOneConversationMessagesRouteConfig = GetOneConversationMessagesValidation & {
    files: never;
};
type GetOneConversationMessagesResponse = {
    conversationNewId: string | null;
};

declare const getOneConversationMessagesRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetOneConversationMessagesRouteTypes = GetOneConversationMessagesRouteConfig & {
    response: APIResponse<GetOneConversationMessagesResponse>;
};

declare const params$1p: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1p = z.infer<typeof params$1p>;
declare const query$O: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$O = z.infer<typeof query$O>;
type ListConversationAttachmentsValidation = {
    body: never;
    params: TParams$1p;
    query: TQuery$O;
};

type ListConversationAttachmentsRouteConfig = ListConversationAttachmentsValidation & {
    files: never;
};
type ListConversationAttachmentsResponse = ResponseWithPagination<MessageAttachmentDTO>;

declare const listConversationAttachmentsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListConversationAttachmentsRouteTypes = ListConversationAttachmentsRouteConfig & {
    response: APIResponse<ListConversationAttachmentsResponse>;
};

declare const params$1o: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1o = z.infer<typeof params$1o>;
declare const query$N: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$N = z.infer<typeof query$N>;
type ListConversationLinksValidation = {
    body: never;
    params: TParams$1o;
    query: TQuery$N;
};

type ListConversationLinksRouteConfig = ListConversationLinksValidation & {
    files: never;
};
type ListConversationLinksResponse = ResponseWithPagination<MessageLinkDTO>;

declare const listConversationLinksRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListConversationLinksRouteTypes = ListConversationLinksRouteConfig & {
    response: APIResponse<ListConversationLinksResponse>;
};

declare const params$1n: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1n = z.infer<typeof params$1n>;
declare const query$M: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$M = z.infer<typeof query$M>;
type ListConversationMessagesValidation = {
    body: never;
    params: TParams$1n;
    query: TQuery$M;
};

type ListConversationMessagesRouteConfig = ListConversationMessagesValidation & {
    files: never;
};
type ListConversationMessagesResponse = ResponseWithPagination<MessageDTO>;

declare const listConversationMessagesRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListConversationMessagesRouteTypes = ListConversationMessagesRouteConfig & {
    response: APIResponse<ListConversationMessagesResponse>;
};

declare const params$1m: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1m = z.infer<typeof params$1m>;
declare const query$L: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$L = z.infer<typeof query$L>;
type ListConversationMultimediaValidation = {
    body: never;
    params: TParams$1m;
    query: TQuery$L;
};

type ListConversationMultimediaRouteConfig = ListConversationMultimediaValidation & {
    files: never;
};
type ListConversationMultimediaResponse = ResponseWithPagination<MessageAttachmentDTO>;

declare const listConversationMultimediaRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListConversationMultimediaRouteTypes = ListConversationMultimediaRouteConfig & {
    response: APIResponse<ListConversationMultimediaResponse>;
};

type ConversationParticipantDTO = UserProfileDTO & {
    userType: TEndUserEnum;
    role: TConversationRoleEnums;
};

declare const params$1l: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1l = z.infer<typeof params$1l>;
declare const query$K: z.ZodObject<{
    sort: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "ADMIN";
        readonly USER: "USER";
    }>>;
}, "strip", z.ZodTypeAny, {
    sort?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    export?: "csv" | "xlsx" | undefined;
    role?: "ADMIN" | "USER" | undefined;
}, {
    sort?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    export?: "csv" | "xlsx" | undefined;
    role?: "ADMIN" | "USER" | undefined;
}>;
type TQuery$K = z.infer<typeof query$K>;
type ListConversationParticipantsValidation = {
    body: never;
    params: TParams$1l;
    query: TQuery$K;
};

type ListConversationParticipantsRouteConfig = ListConversationParticipantsValidation & {
    files: never;
};
type ListConversationParticipantsResponse = ResponseWithPagination<ConversationParticipantDTO>;

declare const listConversationParticipantsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListConversationParticipantsRouteTypes = ListConversationParticipantsRouteConfig & {
    response: APIResponse<ListConversationParticipantsResponse>;
};

declare const query$J: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isGroup: z.ZodOptional<z.ZodBoolean>;
    isSeen: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isGroup?: boolean | undefined;
    isSeen?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isGroup?: boolean | undefined;
    isSeen?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$J = z.infer<typeof query$J>;
type ListConversationsValidation = {
    body: never;
    params: never;
    query: TQuery$J;
};

type ListConversationsRouteConfig = ListConversationsValidation & {
    files: never;
};
type ListConversationsResponse = ResponseWithPagination<ConversationDTO>;

declare const listConversationsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListConversationsRouteTypes = ListConversationsRouteConfig & {
    response: APIResponse<ListConversationsResponse>;
};

declare const params$1k: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1k = z.infer<typeof params$1k>;
declare const query$I: z.ZodObject<{
    fullName: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
}, {
    fullName?: string | undefined;
}>;
type TQuery$I = z.infer<typeof query$I>;
type ListTargetUsersForGroupConversationAssignmentValidation = {
    body: never;
    params: TParams$1k;
    query: TQuery$I;
};

type ListTargetUsersForGroupConversationAssignmentRouteConfig = ListTargetUsersForGroupConversationAssignmentValidation & {
    files: never;
};
type ListTargetUsersForGroupConversationAssignmentResponse = ResponseWithPagination<Participant>;

declare const listTargetUsersForGroupConversationAssignmentRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListTargetUsersForGroupConversationAssignmentRouteTypes = ListTargetUsersForGroupConversationAssignmentRouteConfig & {
    response: APIResponse<ListTargetUsersForGroupConversationAssignmentResponse>;
};

declare const body$19: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type TBody$19 = z.infer<typeof body$19>;
declare const params$1j: z.ZodObject<{
    conversationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationNewId: string;
}, {
    conversationNewId: string;
}>;
type TParams$1j = z.infer<typeof params$1j>;
type UpdateConversationNameValidation = {
    body: TBody$19;
    params: TParams$1j;
    query: never;
};

type UpdateConversationNameRouteConfig = UpdateConversationNameValidation & {
    files: never;
};
type UpdateConversationNameResponse = void;

declare const updateConversationNameRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateConversationNameRouteTypes = UpdateConversationNameRouteConfig & {
    response: APIResponse<UpdateConversationNameResponse>;
};

declare const params$1i: z.ZodObject<{
    conversationId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    conversationId: string & {
        _isID: true;
    };
}, {
    conversationId: string & {
        _isID: true;
    };
}>;
type TParams$1i = z.infer<typeof params$1i>;
type UpdateConversationSeenStatuesValidation = {
    body: never;
    params: TParams$1i;
    query: never;
};

type UpdateConversationSeenStatuesRouteConfig = UpdateConversationSeenStatuesValidation & {
    files: never;
};
type UpdateConversationSeenStatuesResponse = void;

declare const updateConversationSeenStatuesRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateConversationSeenStatuesRouteTypes = UpdateConversationSeenStatuesRouteConfig & {
    response: APIResponse<UpdateConversationSeenStatuesResponse>;
};

declare const query$H: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly SEEN: "seen";
        readonly UNSEEN: "unseen";
    }>>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    status?: "seen" | "unseen" | undefined;
    startDate?: string| undefined;
    endDate?: string| undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    status?: "seen" | "unseen" | undefined;
    startDate?: string | string| undefined;
    endDate?: string | string| undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$H = z.infer<typeof query$H>;
type ListNotificationsValidation = {
    body: never;
    params: never;
    query: TQuery$H;
};

type ListNotificationsRouteConfig = ListNotificationsValidation & {
    files: never;
};
type ListNotificationsResponse = ResponseWithPagination<Notification>;

declare const listNotificationsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListNotificationsRouteTypes = ListNotificationsRouteConfig & {
    response: APIResponse<ListNotificationsResponse>;
};

declare const query$G: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$G = z.infer<typeof query$G>;
type ListObservationReasonsValidation = {
    body: never;
    params: never;
    query: TQuery$G;
};

type ListObservationReasonsRouteConfig = ListObservationReasonsValidation & {
    files: never;
};
type ListObservationReasonsResponse = ResponseWithPagination<ObservationReasonDTO>;

declare const listObservationReasonsRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListObservationReasonsRouteTypes = ListObservationReasonsRouteConfig & {
    response: APIResponse<ListObservationReasonsResponse>;
};

declare const body$18: z.ZodObject<{
    name: z.ZodString;
    urgency: z.ZodNativeEnum<{
        readonly HIGH: "high";
        readonly MEDIUM: "medium";
        readonly LOW: "low";
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    urgency: "high" | "low" | "medium";
}, {
    name: string;
    urgency: "high" | "low" | "medium";
}>;
type TBody$18 = z.infer<typeof body$18>;
type AddObservationReasonValidation = {
    body: TBody$18;
    params: never;
    query: never;
};

type AddObservationReasonRouteConfig = AddObservationReasonValidation & {
    files: never;
};
type AddObservationReasonResponse = void;

declare const addObservationReasonByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddObservationReasonByAdminRouteTypes = AddObservationReasonRouteConfig & {
    response: APIResponse<AddObservationReasonResponse>;
};

declare const params$1h: z.ZodObject<{
    observationReasonNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    observationReasonNewId: string;
}, {
    observationReasonNewId: string;
}>;
type TParams$1h = z.infer<typeof params$1h>;
type DeleteObservationReasonValidation = {
    body: never;
    params: TParams$1h;
    query: never;
};

type DeleteObservationReasonRouteConfig = DeleteObservationReasonValidation & {
    files: never;
};
type DeleteObservationReasonResponse = void;

declare const deleteObservationReasonByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteObservationReasonByAdminRouteTypes = DeleteObservationReasonRouteConfig & {
    response: APIResponse<DeleteObservationReasonResponse>;
};

declare const body$17: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    urgency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    urgency?: "high" | "low" | "medium" | undefined;
}, {
    name?: string | undefined;
    urgency?: "high" | "low" | "medium" | undefined;
}>;
type TBody$17 = z.infer<typeof body$17>;
declare const params$1g: z.ZodObject<{
    observationReasonNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    observationReasonNewId: string;
}, {
    observationReasonNewId: string;
}>;
type TParams$1g = z.infer<typeof params$1g>;
type UpdateObservationReasonValidation = {
    body: TBody$17;
    params: TParams$1g;
    query: never;
};

type UpdateObservationReasonRouteConfig = UpdateObservationReasonValidation & {
    files: never;
};
type UpdateObservationReasonResponse = void;

declare const updateObservationReasonByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateObservationReasonByAdminRouteTypes = UpdateObservationReasonRouteConfig & {
    response: APIResponse<UpdateObservationReasonResponse>;
};

declare const body$16: z.ZodObject<{
    students: z.ZodArray<z.ZodString, "many">;
    note: z.ZodString;
    session: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    observationReason: z.ZodString;
    classNewId: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    observationReason: string;
    students: string[];
    note: string;
    session?: ID$1 | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
}, {
    observationReason: string;
    students: string[];
    note: string;
    session?: ID$1 | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
}>;
type TBody$16 = z.infer<typeof body$16>;
type AddObservationValidation = {
    body: TBody$16;
    params: never;
    query: never;
};

type AddObservationRouteConfig = AddObservationValidation & {
    files: FilesInRequest<"files">;
};
type AddObservationResponse = ObservationDTO;

declare const addObservationRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddObservationRouteTypes = AddObservationRouteConfig & {
    response: APIResponse<AddObservationResponse>;
};

declare const params$1f: z.ZodObject<{
    observationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    observationNewId: string;
}, {
    observationNewId: string;
}>;
type TParams$1f = z.infer<typeof params$1f>;
type GetOneObservationValidation = {
    body: never;
    params: TParams$1f;
    query: never;
};

type GetOneObservationRouteConfig = GetOneObservationValidation & {
    files: never;
};
type GetOneObservationResponse = ObservationDTO;

declare const getOneObservationRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOneObservationRouteTypes = GetOneObservationRouteConfig & {
    response: APIResponse<GetOneObservationResponse>;
};

declare const query$F: z.ZodObject<{
    studentNewId: z.ZodString;
    observationReasonId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    studentNewId: string;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$F = z.infer<typeof query$F>;
type ListObservationsByParentValidation = {
    body: never;
    params: never;
    query: TQuery$F;
};

type ListObservationsByParentRouteConfig = ListObservationsByParentValidation & {
    files: never;
};
type ListObservationsByParentResponse = ResponseWithPagination<ObservationDTO>;

declare const listObservationsByParentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListObservationsByParentRouteTypes = ListObservationsByParentRouteConfig & {
    response: APIResponse<ListObservationsByParentResponse>;
};

declare const query$E: z.ZodObject<{
    studentNewId: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodOptional<z.ZodString>;
    classNewId: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodOptional<z.ZodString>;
    observationReasonId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$E = z.infer<typeof query$E>;
type ListObservationsByStudentValidation = {
    body: never;
    params: never;
    query: TQuery$E;
};

type ListObservationsByStudentRouteConfig = ListObservationsByStudentValidation & {
    files: never;
};
type ListObservationsByStudentResponse = ResponseWithPagination<ObservationDTO>;

declare const listObservationsByStudentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListObservationsByStudentRouteTypes = ListObservationsByStudentRouteConfig & {
    response: APIResponse<ListObservationsByStudentResponse>;
};

declare const query$D: z.ZodObject<{
    classNewId: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodOptional<z.ZodString>;
    observationReasonId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$D = z.infer<typeof query$D>;
type ListObservationsByTeacherValidation = {
    body: never;
    params: never;
    query: TQuery$D;
};

type ListObservationsByTeacherRouteConfig = ListObservationsByTeacherValidation & {
    files: never;
};
type ListObservationsByTeacherResponse = ResponseWithPagination<ObservationDTO>;

declare const listObservationsByTeacherRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListObservationsByTeacherRouteTypes = ListObservationsByTeacherRouteConfig & {
    response: APIResponse<ListObservationsByTeacherResponse>;
};

declare const body$15: z.ZodObject<{
    observationReason: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    deletedFiles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    students: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    observationReason?: string | undefined;
    note?: string | undefined;
    deletedFiles?: string[] | undefined;
    students?: string[] | undefined;
}, {
    observationReason?: string | undefined;
    note?: string | undefined;
    deletedFiles?: string[] | undefined;
    students?: string[] | undefined;
}>;
type TBody$15 = z.infer<typeof body$15>;
declare const params$1e: z.ZodObject<{
    observationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    observationNewId: string;
}, {
    observationNewId: string;
}>;
type TParams$1e = z.infer<typeof params$1e>;
type UpdateObservationValidation = {
    body: TBody$15;
    params: TParams$1e;
    query: never;
};

type UpdateObservationRouteConfig = UpdateObservationValidation & {
    files: FilesInRequest<"files">;
};
type UpdateObservationResponse = void;

declare const updateObservationRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateObservationRouteTypes = UpdateObservationRouteConfig & {
    response: APIResponse<UpdateObservationResponse>;
};

declare const params$1d: z.ZodObject<{
    observationNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    observationNewId: string;
}, {
    observationNewId: string;
}>;
type TParams$1d = z.infer<typeof params$1d>;
type DeleteObservationValidation = {
    body: never;
    params: TParams$1d;
    query: never;
};

type DeleteObservationRouteConfig = DeleteObservationValidation & {
    files: never;
};
type DeleteObservationResponse = void;

declare const deleteObservationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteObservationByAdminRouteTypes = DeleteObservationRouteConfig & {
    response: APIResponse<DeleteObservationResponse>;
};

declare const query$C: z.ZodObject<{
    studentNewId: z.ZodOptional<z.ZodString>;
    teacherNewId: z.ZodOptional<z.ZodString>;
    classNewId: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodOptional<z.ZodString>;
    observationReasonId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    studentNewId?: string | undefined;
    teacherNewId?: string | undefined;
    classNewId?: string | undefined;
    groupNewId?: string | undefined;
    observationReasonId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$C = z.infer<typeof query$C>;
type ListObservationsValidation = {
    body: never;
    params: never;
    query: TQuery$C;
};

type ListObservationsRouteConfig = ListObservationsValidation & {
    files: never;
};
type ListObservationsResponse = ResponseWithPagination<ObservationDTO>;

declare const listObservationsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListObservationsByAdminRouteTypes = ListObservationsRouteConfig & {
    response: APIResponse<ListObservationsResponse>;
};

declare const params$1c: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$1c = z.infer<typeof params$1c>;
declare const query$B: z.ZodObject<{
    from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
}, "strip", z.ZodTypeAny, {
    from: string
    to: string
}, {
    from: (string | Date) & (string | string| undefined);
    to: (string | Date) & (string | string| undefined);
}>;
type TQuery$B = z.infer<typeof query$B>;
type GetChildAttendanceStatsValidation = {
    body: never;
    params: TParams$1c;
    query: TQuery$B;
};
declare const GetChildAttendanceStatsValidation: {
    params: z.ZodObject<{
        studentNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        studentNewId: string;
    }, {
        studentNewId: string;
    }>;
    query: z.ZodObject<{
        from: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        to: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    }, "strip", z.ZodTypeAny, {
        from: string
        to: string
    }, {
        from: (string | Date) & (string | string| undefined);
        to: (string | Date) & (string | string| undefined);
    }>;
};

type GetChildAttendanceStatsRouteConfig = GetChildAttendanceStatsValidation & {
    files: never;
};
type GetChildAttendanceStatsResponse = AttendanceDashboardStats;

declare const GetChildAttendanceStatsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetChildAttendanceStatsRouteTypes = GetChildAttendanceStatsRouteConfig & {
    response: APIResponse<GetChildAttendanceStatsResponse>;
};

declare const body$14: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    students: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    nationalCardId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | undefined;
}>, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | undefined;
}>;
type TBody$14 = z.infer<typeof body$14>;
type AddParentValidation = {
    body: TBody$14;
    params: never;
    query: never;
};

type AddParentRouteConfig = AddParentValidation & {
    files: FilesInRequest<"avatar">;
};
type AddParentResponse = UserProfileDTO;

declare const addParentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddParentByAdminRouteTypes = AddParentRouteConfig & {
    response: APIResponse<AddParentResponse>;
};

type BaseListUserDTO = UserProfileDTO & {
    address1: string | null;
    address2: string | null;
    firstName: string;
    lastName: string;
    birthDate: string| null;
    isActive: boolean;
    isArchived: boolean;
    gender: string;
};

type ParentDTO = BaseListUserDTO & {
    nationalCardId: string | null;
    students: (UserProfileDTO & {
        gender: string;
        birthDate: string
    })[];
};
type ParentDetailsDTO = Omit<ParentDTO, "students"> & {
    students: (UserProfileDTO & {
        gender: string;
        birthDate: string
        schoolYears: EntityDto[];
    })[];
};

declare const params$1b: z.ZodObject<{
    parentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    parentNewId: string;
}, {
    parentNewId: string;
}>;
type TParams$1b = z.infer<typeof params$1b>;
type GetParentByNewIdValidation = {
    body: never;
    params: TParams$1b;
    query: never;
};

type GetParentByNewIdRouteConfig = GetParentByNewIdValidation & {
    files: never;
};
type GetParentByNewIdResponse = ParentDetailsDTO;

declare const getParentByNewIdByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetParentByNewIdByAdminRouteTypes = GetParentByNewIdRouteConfig & {
    response: APIResponse<GetParentByNewIdResponse>;
};

declare const query$A: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$A = z.infer<typeof query$A>;
type ListParentsValidation = {
    body: never;
    params: never;
    query: TQuery$A;
};

type ListParentsRouteConfig = ListParentsValidation & {
    files: never;
};
type ListParentsResponse = ResponseWithPagination<ParentDTO>;

declare const listParentsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListParentsByAdminRouteTypes = ListParentsRouteConfig & {
    response: APIResponse<ListParentsResponse>;
};

declare const body$13: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    address1: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address2: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    students: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    nationalCardId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string| undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | null | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string | string| undefined;
    students?: ID$1[] | undefined;
    nationalCardId?: string | null | undefined;
}>;
type TBody$13 = z.infer<typeof body$13>;
declare const params$1a: z.ZodObject<{
    parentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    parentNewId: string;
}, {
    parentNewId: string;
}>;
type TParams$1a = z.infer<typeof params$1a>;
type UpdateParentValidation = {
    body: TBody$13;
    params: TParams$1a;
    query: never;
};

type UpdateParentRouteConfig = UpdateParentValidation & {
    files: FilesInRequest<"avatar">;
};
type UpdateParentResponse = void;

declare const updateParentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateParentByAdminRouteTypes = UpdateParentRouteConfig & {
    response: APIResponse<UpdateParentResponse>;
};

type GetChildrenOfParentsValidation = {
    body: never;
    params: never;
    query: never;
};

type GetChildrenOfParentsRouteConfig = GetChildrenOfParentsValidation & {
    files: never;
};
type GetChildrenOfParentsResponse = UserProfileDTO[];

declare const getChildrenOfParentsByParentRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetChildrenOfParentsByParentRouteTypes = GetChildrenOfParentsRouteConfig & {
    response: APIResponse<GetChildrenOfParentsResponse>;
};

declare const body$12: z.ZodObject<{
    name: z.ZodString;
    services: z.ZodArray<z.ZodObject<{
        id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }>, "many">;
    discount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
}, {
    name: string;
    services: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[];
    discount: number;
}>;
type TBody$12 = z.infer<typeof body$12>;
type AddPaymentTemplateValidation = {
    body: TBody$12;
    params: never;
    query: never;
};

type AddPaymentTemplateRouteConfig = AddPaymentTemplateValidation & {
    files: never;
};
type AddPaymentTemplateResponse = void;

declare const addPaymentTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddPaymentTemplateByAdminRouteTypes = AddPaymentTemplateRouteConfig & {
    response: APIResponse<AddPaymentTemplateResponse>;
};

declare const body$11: z.ZodObject<{
    paymentTemplateIds: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    paymentTemplateIds: ID$1[];
}, {
    paymentTemplateIds: ID$1[];
}>;
type TBody$11 = z.infer<typeof body$11>;
type DeletePaymentTemplateValidation = {
    body: TBody$11;
    params: never;
    query: never;
};

type DeletePaymentTemplateRouteConfig = DeletePaymentTemplateValidation & {
    files: never;
};
type DeletePaymentTemplateResponse = void;

declare const deletePaymentTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type DeletePaymentTemplateByAdminRouteTypes = DeletePaymentTemplateRouteConfig & {
    response: APIResponse<DeletePaymentTemplateResponse>;
};

declare const params$19: z.ZodObject<{
    paymentTemplateId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    paymentTemplateId: string & {
        _isID: true;
    };
}, {
    paymentTemplateId: string & {
        _isID: true;
    };
}>;
type TParams$19 = z.infer<typeof params$19>;
type GetPaymentTemplateValidation = {
    body: never;
    params: TParams$19;
    query: never;
};

type GetPaymentTemplateRouteConfig = GetPaymentTemplateValidation & {
    files: never;
};
type GetPaymentTemplateResponse = PaymentTemplate;

declare const getPaymentTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetPaymentTemplateByAdminRouteTypes = GetPaymentTemplateRouteConfig & {
    response: APIResponse<GetPaymentTemplateResponse>;
};

declare const body$10: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    services: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }, {
        id: string & {
            _isID: true;
        };
        discount: number;
    }>, "many">>;
    discount: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    services?: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[] | undefined;
    discount?: number | undefined;
}, {
    name?: string | undefined;
    services?: {
        id: string & {
            _isID: true;
        };
        discount: number;
    }[] | undefined;
    discount?: number | undefined;
}>;
type TBody$10 = z.infer<typeof body$10>;
declare const params$18: z.ZodObject<{
    paymentTemplateId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    paymentTemplateId: string & {
        _isID: true;
    };
}, {
    paymentTemplateId: string & {
        _isID: true;
    };
}>;
type TParams$18 = z.infer<typeof params$18>;
type UpdatePaymentTemplateValidation = {
    body: TBody$10;
    params: TParams$18;
    query: never;
};

type UpdatePaymentTemplateRouteConfig = UpdatePaymentTemplateValidation & {
    files: never;
};
type UpdatePaymentTemplateResponse = void;

declare const updatePaymentTemplateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdatePaymentTemplateByAdminRouteTypes = UpdatePaymentTemplateRouteConfig & {
    response: APIResponse<UpdatePaymentTemplateResponse>;
};

declare const params$17: z.ZodObject<{
    preRegistrationId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    preRegistrationId: string & {
        _isID: true;
    };
}, {
    preRegistrationId: string & {
        _isID: true;
    };
}>;
type TParams$17 = z.infer<typeof params$17>;
type DeletePreRegistrationValidation = {
    body: never;
    params: TParams$17;
    query: never;
};

type DeletePreRegistrationRouteConfig = DeletePreRegistrationValidation & {
    files: never;
};
type DeletePreRegistrationResponse = void;

declare const deletePreRegistrationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeletePreRegistrationByAdminRouteTypes = DeletePreRegistrationRouteConfig & {
    response: APIResponse<DeletePreRegistrationResponse>;
};

type PublicPreRegistrationDTO = {
    _id: string;
    newId: string;
    parentFullName: string | null;
    parentFirstName: string | null;
    parentLastName: string | null;
    parentEmail: string | null;
    parentPhoneNumber: string | null;
    preferredLanguage: string | null;
    parentAddress: string | null;
    job: string | null;
    studentFullName: string | null;
    studentFirstName: string | null;
    studentLastName: string | null;
    studentEmail: string | null;
    studentBirthDate: string| null;
    studentAddress: string | null;
    studentGender: string | null;
    studentPhoneNumber: string | null;
    nationality: string | null;
    spokenLanguages: string[] | null;
    level: {
        _id: string;
        name: string;
        newId: string;
    } | null;
    classType: {
        _id: string;
        name: string;
        newId: string;
    } | null;
    previousSchoolInfo: string | null;
    birthCertificate: IFile[];
    previousTranscripts: IFile[];
    communicationType: string | null;
    studentEnrollmentReason: string | null;
    otherComment: string | null;
};

type PreRegistrationDTO = PublicPreRegistrationDTO & {
    createdAt: string
    status: TPreRegistrationStatuesEnum;
    isRegister: boolean;
};

declare const query$z: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly APPROVED: "approved";
        readonly PENDING: "pending";
        readonly REJECTED: "rejected";
    }>>;
    level: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    isRegistered: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: "rejected" | "approved" | "pending" | undefined;
    level?: ID$1 | undefined;
    isRegistered?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    status?: "rejected" | "approved" | "pending" | undefined;
    level?: ID$1 | undefined;
    isRegistered?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$z = z.infer<typeof query$z>;
type ListPreRegistrationValidation = {
    body: never;
    params: never;
    query: TQuery$z;
};

type ListPreRegistrationRouteConfig = ListPreRegistrationValidation & {
    files: never;
};
type ListPreRegistrationResponse = ResponseWithPagination<PreRegistrationDTO>;

declare const listPreRegistrationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListPreRegistrationByAdminRouteTypes = ListPreRegistrationRouteConfig & {
    response: APIResponse<ListPreRegistrationResponse>;
};

declare const params$16: z.ZodObject<{
    preRegistrationId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    preRegistrationId: string & {
        _isID: true;
    };
}, {
    preRegistrationId: string & {
        _isID: true;
    };
}>;
type TParams$16 = z.infer<typeof params$16>;
type RegisterStudentValidation = {
    body: never;
    params: TParams$16;
    query: never;
};

type RegisterStudentRouteConfig = RegisterStudentValidation & {
    files: never;
};
type RegisterStudentResponse = void;

declare const registerStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type RegisterStudentByAdminRouteTypes = RegisterStudentRouteConfig & {
    response: APIResponse<RegisterStudentResponse>;
};

declare const body$$: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly APPROVED: "approved";
        readonly PENDING: "pending";
        readonly REJECTED: "rejected";
    }>>;
    job: z.ZodOptional<z.ZodString>;
    classTypeNewId: z.ZodOptional<z.ZodString>;
    parentFirstName: z.ZodOptional<z.ZodString>;
    parentLastName: z.ZodOptional<z.ZodString>;
    parentEmail: z.ZodOptional<z.ZodString>;
    parentPhoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    preferredLanguage: z.ZodOptional<z.ZodString>;
    parentAddress: z.ZodOptional<z.ZodString>;
    studentFirstName: z.ZodOptional<z.ZodString>;
    studentLastName: z.ZodOptional<z.ZodString>;
    studentEmail: z.ZodOptional<z.ZodString>;
    studentBirthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    studentAddress: z.ZodOptional<z.ZodString>;
    studentGender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    studentPhoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    nationality: z.ZodOptional<z.ZodString>;
    spokenLanguages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    previousSchoolInfo: z.ZodOptional<z.ZodString>;
    communicationType: z.ZodOptional<z.ZodString>;
    studentEnrollmentReason: z.ZodOptional<z.ZodString>;
    otherComment: z.ZodOptional<z.ZodString>;
    levelNewId: z.ZodOptional<z.ZodString>;
    deletedBirthCertificate: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
    deletedPreviousTranscripts: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
}, "strip", z.ZodTypeAny, {
    deletedBirthCertificate: string[];
    deletedPreviousTranscripts: string[];
    status?: "rejected" | "approved" | "pending" | undefined;
    job?: string | undefined;
    classTypeNewId?: string | undefined;
    parentFirstName?: string | undefined;
    parentLastName?: string | undefined;
    parentEmail?: string | undefined;
    parentPhoneNumber?: string | undefined;
    preferredLanguage?: string | undefined;
    parentAddress?: string | undefined;
    studentFirstName?: string | undefined;
    studentLastName?: string | undefined;
    studentEmail?: string | undefined;
    studentBirthDate?: string| undefined;
    studentAddress?: string | undefined;
    studentGender?: "male" | "female" | undefined;
    studentPhoneNumber?: string | undefined;
    nationality?: string | undefined;
    spokenLanguages?: string[] | undefined;
    previousSchoolInfo?: string | undefined;
    communicationType?: string | undefined;
    studentEnrollmentReason?: string | undefined;
    otherComment?: string | undefined;
    levelNewId?: string | undefined;
}, {
    status?: "rejected" | "approved" | "pending" | undefined;
    job?: string | undefined;
    classTypeNewId?: string | undefined;
    parentFirstName?: string | undefined;
    parentLastName?: string | undefined;
    parentEmail?: string | undefined;
    parentPhoneNumber?: string | undefined;
    preferredLanguage?: string | undefined;
    parentAddress?: string | undefined;
    studentFirstName?: string | undefined;
    studentLastName?: string | undefined;
    studentEmail?: string | undefined;
    studentBirthDate?: string | string| undefined;
    studentAddress?: string | undefined;
    studentGender?: "male" | "female" | undefined;
    studentPhoneNumber?: string | undefined;
    nationality?: string | undefined;
    spokenLanguages?: string[] | undefined;
    previousSchoolInfo?: string | undefined;
    communicationType?: string | undefined;
    studentEnrollmentReason?: string | undefined;
    otherComment?: string | undefined;
    levelNewId?: string | undefined;
    deletedBirthCertificate?: string[] | undefined;
    deletedPreviousTranscripts?: string[] | undefined;
}>;
type TBody$$ = z.infer<typeof body$$>;
declare const params$15: z.ZodObject<{
    preRegistrationId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    preRegistrationId: string & {
        _isID: true;
    };
}, {
    preRegistrationId: string & {
        _isID: true;
    };
}>;
type TParams$15 = z.infer<typeof params$15>;
type UpdatePreRegistrationValidation$1 = {
    body: TBody$$;
    params: TParams$15;
    query: never;
};

type UpdatePreRegistrationRouteConfig$1 = UpdatePreRegistrationValidation$1 & {
    files: FilesInRequest<"birthCertificate" | "previousTranscripts">;
};
type UpdatePreRegistrationResponse$1 = void;

declare const updatePreRegistrationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdatePreRegistrationByAdminRouteTypes = UpdatePreRegistrationRouteConfig$1 & {
    response: APIResponse<UpdatePreRegistrationResponse$1>;
};

declare const params$14: z.ZodObject<{
    preRegistrationId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    preRegistrationId: string & {
        _isID: true;
    };
}, {
    preRegistrationId: string & {
        _isID: true;
    };
}>;
type TParams$14 = z.infer<typeof params$14>;
declare const query$y: z.ZodObject<{
    schoolSubdomain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolSubdomain: string;
}, {
    schoolSubdomain: string;
}>;
type TQuery$y = z.infer<typeof query$y>;
type GetOnePreRegistrationValidation = {
    body: never;
    params: TParams$14;
    query: TQuery$y;
};

type GetOnePreRegistrationRouteConfig = GetOnePreRegistrationValidation & {
    files: never;
};
type GetOnePreRegistrationResponse = PublicPreRegistrationDTO;

declare const getOnePreRegistrationByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetOnePreRegistrationByPublicRouteTypes = GetOnePreRegistrationRouteConfig & {
    response: APIResponse<GetOnePreRegistrationResponse>;
};

declare const query$x: z.ZodObject<{
    subdomain: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    subdomain: string;
}, {
    subdomain: string;
}>;
type TQuery$x = z.infer<typeof query$x>;
type GetSchoolPreRegistrationValidation = {
    body: never;
    params: never;
    query: TQuery$x;
};

type GetSchoolPreRegistrationRouteConfig = GetSchoolPreRegistrationValidation & {
    files: never;
};
type GetSchoolPreRegistrationResponse = {
    schoolName: string;
    schoolPhoneNumber: string | null;
};

declare const getSchoolPreRegistrationByPublicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetSchoolPreRegistrationByPublicRouteTypes = GetSchoolPreRegistrationRouteConfig & {
    response: APIResponse<GetSchoolPreRegistrationResponse>;
};

declare const body$_: z.ZodIntersection<z.ZodIntersection<z.ZodIntersection<z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    parentFirstName: z.ZodOptional<z.ZodString>;
    parentLastName: z.ZodOptional<z.ZodString>;
    parentEmail: z.ZodOptional<z.ZodString>;
    parentPhoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    preferredLanguage: z.ZodOptional<z.ZodString>;
    parentAddress: z.ZodOptional<z.ZodString>;
    job: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    parentFirstName?: string | undefined;
    parentLastName?: string | undefined;
    parentEmail?: string | undefined;
    parentPhoneNumber?: string | undefined;
    preferredLanguage?: string | undefined;
    parentAddress?: string | undefined;
    job?: string | undefined;
}, {
    parentFirstName?: string | undefined;
    parentLastName?: string | undefined;
    parentEmail?: string | undefined;
    parentPhoneNumber?: string | undefined;
    preferredLanguage?: string | undefined;
    parentAddress?: string | undefined;
    job?: string | undefined;
}>, z.ZodObject<{
    studentFirstName: z.ZodOptional<z.ZodString>;
    studentLastName: z.ZodOptional<z.ZodString>;
    studentEmail: z.ZodOptional<z.ZodString>;
    studentPhoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    nationality: z.ZodOptional<z.ZodString>;
    studentGender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    studentAddress: z.ZodOptional<z.ZodString>;
    studentBirthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    spokenLanguages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    studentFirstName?: string | undefined;
    studentLastName?: string | undefined;
    studentEmail?: string | undefined;
    studentPhoneNumber?: string | undefined;
    nationality?: string | undefined;
    studentGender?: "male" | "female" | undefined;
    studentAddress?: string | undefined;
    studentBirthDate?: string| undefined;
    spokenLanguages?: string[] | undefined;
}, {
    studentFirstName?: string | undefined;
    studentLastName?: string | undefined;
    studentEmail?: string | undefined;
    studentPhoneNumber?: string | undefined;
    nationality?: string | undefined;
    studentGender?: "male" | "female" | undefined;
    studentAddress?: string | undefined;
    studentBirthDate?: string | string| undefined;
    spokenLanguages?: string[] | undefined;
}>>, z.ZodObject<{
    levelNewId: z.ZodOptional<z.ZodString>;
    classTypeNewId: z.ZodOptional<z.ZodString>;
    previousSchoolInfo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    levelNewId?: string | undefined;
    classTypeNewId?: string | undefined;
    previousSchoolInfo?: string | undefined;
}, {
    levelNewId?: string | undefined;
    classTypeNewId?: string | undefined;
    previousSchoolInfo?: string | undefined;
}>>, z.ZodObject<{
    deletedBirthCertificate: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
    deletedPreviousTranscripts: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
}, "strip", z.ZodTypeAny, {
    deletedBirthCertificate: string[];
    deletedPreviousTranscripts: string[];
}, {
    deletedBirthCertificate?: string[] | undefined;
    deletedPreviousTranscripts?: string[] | undefined;
}>>, z.ZodObject<{
    communicationType: z.ZodOptional<z.ZodString>;
    studentEnrollmentReason: z.ZodOptional<z.ZodString>;
    otherComment: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    communicationType?: string | undefined;
    studentEnrollmentReason?: string | undefined;
    otherComment?: string | undefined;
}, {
    communicationType?: string | undefined;
    studentEnrollmentReason?: string | undefined;
    otherComment?: string | undefined;
}>>, z.ZodObject<{
    subdomain: z.ZodEffects<z.ZodString, string, string>;
    id: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    subdomain: string;
    id?: ID$1 | undefined;
}, {
    subdomain: string;
    id?: ID$1 | undefined;
}>>;
type TBody$_ = z.infer<typeof body$_>;
type UpdatePreRegistrationValidation = {
    body: TBody$_;
    params: never;
    query: never;
};

type UpdatePreRegistrationRouteConfig = UpdatePreRegistrationValidation & {
    files: FilesInRequest<"birthCertificate" | "previousTranscripts">;
};
type UpdatePreRegistrationResponse = ID$1;

declare const updatePreRegistrationByPublicRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UpdatePreRegistrationByPublicRouteTypes = UpdatePreRegistrationRouteConfig & {
    response: APIResponse<UpdatePreRegistrationResponse>;
};

declare const query$w: z.ZodObject<{
    entity: z.ZodNativeEnum<{
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly CLASSROOM: "classroom";
        readonly GROUP: "group";
        readonly CLASS: "class";
        readonly CLASS_GROUP: "classGroup";
    }>;
    newId: z.ZodString;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
}, "strip", z.ZodTypeAny, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
    startDate: string
    endDate: string
}, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
    startDate: (string | Date) & (string | string| undefined);
    endDate: (string | Date) & (string | string| undefined);
}>;
type TQuery$w = z.infer<typeof query$w>;
type GetScheduleValidation = {
    body: never;
    params: never;
    query: TQuery$w;
};

type GetScheduleRouteConfig = GetScheduleValidation & {
    files: never;
};
type GetScheduleResponse = {
    schedule: SessionDTO[];
    holidays: HolidayInScheduleDto[];
};

declare const getScheduleRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetScheduleRouteTypes = GetScheduleRouteConfig & {
    response: APIResponse<GetScheduleResponse>;
};

type WeeklySessionDTO = {
    newId: string;
    _id: ID$1;
    week: string | null;
    startDate: {
        day: number;
        hours: number;
        minutes: number;
    };
    endDate: {
        day: number;
        hours: number;
        minutes: number;
    };
    topic: EntityDto;
    classroom: EntityDto;
    group: EntityDto | null;
    sessionType: EntityDto;
    class: EntityDto | null;
    teacher: UserProfileDTO | null;
};

declare const query$v: z.ZodObject<{
    entity: z.ZodNativeEnum<{
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly CLASSROOM: "classroom";
        readonly GROUP: "group";
        readonly CLASS: "class";
        readonly CLASS_GROUP: "classGroup";
    }>;
    newId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
}, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
}>;
type TQuery$v = z.infer<typeof query$v>;
type GetWeeklyScheduleValidation = {
    body: never;
    params: never;
    query: TQuery$v;
};

type GetWeeklyScheduleRouteConfig = GetWeeklyScheduleValidation & {
    files: never;
};
type GetWeeklyScheduleResponse = {
    schedule: WeeklySessionDTO[];
};

declare const getWeeklyScheduleRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetWeeklyScheduleRouteTypes = GetWeeklyScheduleRouteConfig & {
    response: APIResponse<GetWeeklyScheduleResponse>;
};

declare const body$Z: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TBody$Z = z.infer<typeof body$Z>;
type ApplyWeeklyScheduleForClassValidation = {
    body: TBody$Z;
    params: never;
    query: never;
};

type ApplyWeeklyScheduleForClassRouteConfig = ApplyWeeklyScheduleForClassValidation & {
    files: never;
};
type ApplyWeeklyScheduleForClassResponse = void;

declare const applyWeeklyScheduleForClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ApplyWeeklyScheduleForClassByAdminRouteTypes = ApplyWeeklyScheduleForClassRouteConfig & {
    response: APIResponse<ApplyWeeklyScheduleForClassResponse>;
};

declare const body$Y: z.ZodObject<{
    groupNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupNewId: string;
}, {
    groupNewId: string;
}>;
type TBody$Y = z.infer<typeof body$Y>;
type ApplyWeeklyScheduleForGroupValidation = {
    body: TBody$Y;
    params: never;
    query: never;
};

type ApplyWeeklyScheduleForGroupRouteConfig = ApplyWeeklyScheduleForGroupValidation & {
    files: never;
};
type ApplyWeeklyScheduleForGroupResponse = void;

declare const applyWeeklyScheduleForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ApplyWeeklyScheduleForGroupByAdminRouteTypes = ApplyWeeklyScheduleForGroupRouteConfig & {
    response: APIResponse<ApplyWeeklyScheduleForGroupResponse>;
};

declare const params$13: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$13 = z.infer<typeof params$13>;
type DeleteSessionValidation = {
    body: never;
    params: TParams$13;
    query: never;
};

type DeleteSessionRouteConfig = DeleteSessionValidation & {
    files: never;
};
type DeleteSessionResponse = void;

declare const deleteSessionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSessionByAdminRouteTypes = DeleteSessionRouteConfig & {
    response: APIResponse<DeleteSessionResponse>;
};

declare const query$u: z.ZodObject<{
    entity: z.ZodNativeEnum<{
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly CLASSROOM: "classroom";
        readonly GROUP: "group";
        readonly CLASS: "class";
        readonly CLASS_GROUP: "classGroup";
    }>;
    newId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
}, {
    newId: string;
    entity: "teacher" | "student" | "classroom" | "group" | "class" | "classGroup";
}>;
type TQuery$u = z.infer<typeof query$u>;
type GetDraftWeeklyScheduleValidation = {
    body: never;
    params: never;
    query: TQuery$u;
};

type GetDraftWeeklyScheduleRouteConfig = GetDraftWeeklyScheduleValidation & {
    files: never;
};
type GetDraftWeeklyScheduleResponse = WeeklySessionDTO[];

declare const getDraftWeeklyScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetDraftWeeklyScheduleByAdminRouteTypes = GetDraftWeeklyScheduleRouteConfig & {
    response: APIResponse<GetDraftWeeklyScheduleResponse>;
};

type EntityScheduleDto = {
    type: TScheduleEntityEnum;
    name: string;
    newId: string;
    avatar: string | null;
    _id: ID$1;
};

declare const query$t: z.ZodObject<{
    search: z.ZodString;
}, "strip", z.ZodTypeAny, {
    search: string;
}, {
    search: string;
}>;
type TQuery$t = z.infer<typeof query$t>;
type GetEntityScheduleValidation = {
    body: never;
    params: never;
    query: TQuery$t;
};

type GetEntityScheduleRouteConfig = GetEntityScheduleValidation & {
    files: never;
};
type GetEntityScheduleResponse = EntityScheduleDto[];

declare const getEntityScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetEntityScheduleByAdminRouteTypes = GetEntityScheduleRouteConfig & {
    response: APIResponse<GetEntityScheduleResponse>;
};

declare const query$s: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$s = z.infer<typeof query$s>;
type ListSchoolYearValidation = {
    body: never;
    params: never;
    query: TQuery$s;
};

type ListSchoolYearRouteConfig = ListSchoolYearValidation & {
    files: never;
};
type ListSchoolYearResponse = ResponseWithPagination<SchoolYear>;

declare const listSchoolYearByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSchoolYearByAdminRouteTypes = ListSchoolYearRouteConfig & {
    response: APIResponse<ListSchoolYearResponse>;
};

declare const body$X: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    terms: z.ZodArray<z.ZodObject<{
        termNewId: z.ZodString;
        startDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
        endDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    }, "strip", z.ZodTypeAny, {
        startDate: string
        endDate: string
        termNewId: string;
    }, {
        startDate: (string | Date) & (string | string| undefined);
        endDate: (string | Date) & (string | string| undefined);
        termNewId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    terms: {
        startDate: string
        endDate: string
        termNewId: string;
    }[];
    name?: string | undefined;
}, {
    terms: {
        startDate: (string | Date) & (string | string| undefined);
        endDate: (string | Date) & (string | string| undefined);
        termNewId: string;
    }[];
    name?: string | undefined;
}>;
type TBody$X = z.infer<typeof body$X>;
declare const params$12: z.ZodObject<{
    schoolYearNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolYearNewId: string;
}, {
    schoolYearNewId: string;
}>;
type TParams$12 = z.infer<typeof params$12>;
type UpdateSchoolYearValidation = {
    body: TBody$X;
    params: TParams$12;
    query: never;
};

type UpdateSchoolYearRouteConfig = UpdateSchoolYearValidation & {
    files: never;
};
type UpdateSchoolYearResponse = void;

declare const updateSchoolYearByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSchoolYearByAdminRouteTypes = UpdateSchoolYearRouteConfig & {
    response: APIResponse<UpdateSchoolYearResponse>;
};

type GetSchoolDetailsValidation = {
    body: never;
    params: never;
    query: never;
};

type GetSchoolDetailsRouteConfig = GetSchoolDetailsValidation & {
    files: never;
};
type GetSchoolDetailsResponse = SchoolDTO;

declare const getSchoolDetailsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetSchoolDetailsByAdminRouteTypes = GetSchoolDetailsRouteConfig & {
    response: APIResponse<GetSchoolDetailsResponse>;
};

declare const body$W: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodNumber>;
    educationDepartment: z.ZodOptional<z.ZodNativeEnum<{
        readonly ARIANA: "أريانة";
        readonly BEJA: "باجة";
        readonly BEN_AROUS: "بن عروس";
        readonly BIZERTE: "بنزرت";
        readonly GABES: "قابس";
        readonly GAFSA: "قفصة";
        readonly JENDOUBA: "جندوبة";
        readonly KAIROUAN: "القيروان";
        readonly KASSERINE: "القصرين";
        readonly KEBILI: "قبلي";
        readonly KEF: "الكاف";
        readonly MAHDIA: "المهدية";
        readonly MANOUBA: "منوبة";
        readonly MEDENINE: "مدنين";
        readonly MONASTIR: "المنستير";
        readonly NABEUL: "نابل";
        readonly SFAX: "صفاقس";
        readonly SIDI_BOUZID: "سيدي بوزيد";
        readonly SILIANA: "سليانة";
        readonly SOUSSE: "سوسة";
        readonly TATAOUINE: "تطاوين";
        readonly TOZEUR: "توزر";
        readonly TUNIS: "تونس";
        readonly ZAGHOUAN: "زغوان";
    }>>;
    gradeBookTheme: z.ZodOptional<z.ZodNativeEnum<{
        readonly YELLOW: "yellow";
        readonly BLUE: "blue";
    }>>;
    days: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    startHour: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>, number, string | Date>>;
    endHour: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>, number, string | Date>>;
    step: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    directorName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    dueDate?: number | undefined;
    educationDepartment?: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان" | undefined;
    gradeBookTheme?: "yellow" | "blue" | undefined;
    days?: number[] | undefined;
    startHour?: number | undefined;
    endHour?: number | undefined;
    step?: string | undefined;
    directorName?: string | undefined;
}, {
    name?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    dueDate?: number | undefined;
    educationDepartment?: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان" | undefined;
    gradeBookTheme?: "yellow" | "blue" | undefined;
    days?: number[] | undefined;
    startHour?: string | string| undefined;
    endHour?: string | string| undefined;
    step?: string | undefined;
    directorName?: string | undefined;
}>;
type TBody$W = z.infer<typeof body$W>;
type UpdateSchoolValidation$1 = {
    body: TBody$W;
    params: never;
    query: never;
};

type UpdateSchoolRouteConfig$1 = UpdateSchoolValidation$1 & {
    files: FilesInRequest<"logo" | "cover" | "financeSignature" | "academicSignature">;
};
type UpdateSchoolResponse$1 = void;

declare const updateSchoolByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UpdateSchoolByAdminRouteTypes = UpdateSchoolRouteConfig$1 & {
    response: APIResponse<UpdateSchoolResponse$1>;
};

declare const body$V: z.ZodObject<{
    name: z.ZodString;
    subdomain: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
    address: z.ZodOptional<z.ZodString>;
    directorName: z.ZodOptional<z.ZodString>;
    configName: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodNumber;
    taxRate: z.ZodNumber;
    maxStudentSeats: z.ZodNumber;
    gradeBookTheme: z.ZodNativeEnum<{
        readonly YELLOW: "yellow";
        readonly BLUE: "blue";
    }>;
    enableSms: z.ZodBoolean;
    enableEmail: z.ZodBoolean;
    educationDepartment: z.ZodNativeEnum<{
        readonly ARIANA: "أريانة";
        readonly BEJA: "باجة";
        readonly BEN_AROUS: "بن عروس";
        readonly BIZERTE: "بنزرت";
        readonly GABES: "قابس";
        readonly GAFSA: "قفصة";
        readonly JENDOUBA: "جندوبة";
        readonly KAIROUAN: "القيروان";
        readonly KASSERINE: "القصرين";
        readonly KEBILI: "قبلي";
        readonly KEF: "الكاف";
        readonly MAHDIA: "المهدية";
        readonly MANOUBA: "منوبة";
        readonly MEDENINE: "مدنين";
        readonly MONASTIR: "المنستير";
        readonly NABEUL: "نابل";
        readonly SFAX: "صفاقس";
        readonly SIDI_BOUZID: "سيدي بوزيد";
        readonly SILIANA: "سليانة";
        readonly SOUSSE: "سوسة";
        readonly TATAOUINE: "تطاوين";
        readonly TOZEUR: "توزر";
        readonly TUNIS: "تونس";
        readonly ZAGHOUAN: "زغوان";
    }>;
    instanceType: z.ZodNativeEnum<{
        readonly TUNISIAN: "TUNISIAN";
        readonly CAMBRIDGE: "CAMBRIDGE";
        readonly IB: "IB";
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phoneNumber: string;
    subdomain: string;
    dueDate: number;
    taxRate: number;
    maxStudentSeats: number;
    educationDepartment: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان";
    enableSms: boolean;
    enableEmail: boolean;
    instanceType: "TUNISIAN" | "CAMBRIDGE" | "IB";
    gradeBookTheme: "yellow" | "blue";
    email?: string | undefined;
    address?: string | undefined;
    directorName?: string | undefined;
    configName?: string | undefined;
}, {
    name: string;
    phoneNumber: string;
    subdomain: string;
    dueDate: number;
    taxRate: number;
    maxStudentSeats: number;
    educationDepartment: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان";
    enableSms: boolean;
    enableEmail: boolean;
    instanceType: "TUNISIAN" | "CAMBRIDGE" | "IB";
    gradeBookTheme: "yellow" | "blue";
    email?: string | undefined;
    address?: string | undefined;
    directorName?: string | undefined;
    configName?: string | undefined;
}>;
type TBody$V = z.infer<typeof body$V>;
type AddSchoolValidation = {
    body: TBody$V;
    params: never;
    query: never;
};

type AddSchoolRouteConfig = AddSchoolValidation & {
    files: never;
};
type AddSchoolResponse = void;

declare const addSchoolByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSchoolByMasterRouteTypes = AddSchoolRouteConfig & {
    response: APIResponse<AddSchoolResponse>;
};

declare const query$r: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$r = z.infer<typeof query$r>;
type ListSchoolsValidation = {
    body: never;
    params: never;
    query: TQuery$r;
};

type ListSchoolsRouteConfig = ListSchoolsValidation & {
    files: never;
};
type ListSchoolsResponse = ResponseWithPagination<SchoolDTO>;

declare const listSchoolsByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSchoolsByMasterRouteTypes = ListSchoolsRouteConfig & {
    response: APIResponse<ListSchoolsResponse>;
};

declare const query$q: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$q = z.infer<typeof query$q>;
declare const params$11: z.ZodObject<{
    tenantId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    tenantId: string & {
        _isID: true;
    };
}, {
    tenantId: string & {
        _isID: true;
    };
}>;
type TParams$11 = z.infer<typeof params$11>;
type ListSmsSoldHistoriesValidation = {
    body: never;
    params: TParams$11;
    query: TQuery$q;
};

type ListSmsSoldHistoriesRouteConfig = ListSmsSoldHistoriesValidation & {
    files: never;
};
type ListSmsSoldHistoriesResponse = ResponseWithPagination<SmsSoldHistoryResponseDto>;

declare const listSmsSoldHistoriesByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListSmsSoldHistoriesByMasterRouteTypes = ListSmsSoldHistoriesRouteConfig & {
    response: APIResponse<ListSmsSoldHistoriesResponse>;
};

declare const params$10: z.ZodObject<{
    schoolNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolNewId: string;
}, {
    schoolNewId: string;
}>;
type TParams$10 = z.infer<typeof params$10>;
type SwitchShoolValidation = {
    body: never;
    params: TParams$10;
    query: never;
};

type SwitchShoolRouteConfig = SwitchShoolValidation & {
    files: never;
};
type SwitchShoolResponse = {
    token: string;
};

declare const switchShoolByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type SwitchShoolByMasterRouteTypes = SwitchShoolRouteConfig & {
    response: APIResponse<SwitchShoolResponse>;
};

declare const body$U: z.ZodObject<{
    flags: z.ZodRecord<z.ZodNativeEnum<{
        readonly MESSAGES: "messages";
        readonly ANNOUNCEMENTS: "announcements";
        readonly SMART_CALENDAR: "smartCalendar";
        readonly TUTORIALS: "tutorials";
        readonly DARK_MODE: "darkMode";
        readonly LMS: "lms";
    }>, z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    flags: Partial<Record<"messages" | "smartCalendar" | "announcements" | "tutorials" | "darkMode" | "lms", boolean>>;
}, {
    flags: Partial<Record<"messages" | "smartCalendar" | "announcements" | "tutorials" | "darkMode" | "lms", boolean>>;
}>;
type TBody$U = z.infer<typeof body$U>;
declare const params$$: z.ZodObject<{
    schoolNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolNewId: string;
}, {
    schoolNewId: string;
}>;
type TParams$$ = z.infer<typeof params$$>;
type UpdateFlagsValidation = {
    body: TBody$U;
    params: TParams$$;
    query: never;
};

type UpdateFlagsRouteConfig = UpdateFlagsValidation & {
    files: never;
};
type UpdateFlagsResponse = void;

declare const updateFlagsByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateFlagsByMasterRouteTypes = UpdateFlagsRouteConfig & {
    response: APIResponse<UpdateFlagsResponse>;
};

declare const body$T: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    address: z.ZodOptional<z.ZodString>;
    directorName: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodNumber>;
    taxRate: z.ZodOptional<z.ZodNumber>;
    maxStudentSeats: z.ZodOptional<z.ZodNumber>;
    gradeBookTheme: z.ZodOptional<z.ZodNativeEnum<{
        readonly YELLOW: "yellow";
        readonly BLUE: "blue";
    }>>;
    enableSms: z.ZodOptional<z.ZodBoolean>;
    enableEmail: z.ZodOptional<z.ZodBoolean>;
    educationDepartment: z.ZodOptional<z.ZodNativeEnum<{
        readonly ARIANA: "أريانة";
        readonly BEJA: "باجة";
        readonly BEN_AROUS: "بن عروس";
        readonly BIZERTE: "بنزرت";
        readonly GABES: "قابس";
        readonly GAFSA: "قفصة";
        readonly JENDOUBA: "جندوبة";
        readonly KAIROUAN: "القيروان";
        readonly KASSERINE: "القصرين";
        readonly KEBILI: "قبلي";
        readonly KEF: "الكاف";
        readonly MAHDIA: "المهدية";
        readonly MANOUBA: "منوبة";
        readonly MEDENINE: "مدنين";
        readonly MONASTIR: "المنستير";
        readonly NABEUL: "نابل";
        readonly SFAX: "صفاقس";
        readonly SIDI_BOUZID: "سيدي بوزيد";
        readonly SILIANA: "سليانة";
        readonly SOUSSE: "سوسة";
        readonly TATAOUINE: "تطاوين";
        readonly TOZEUR: "توزر";
        readonly TUNIS: "تونس";
        readonly ZAGHOUAN: "زغوان";
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    directorName?: string | undefined;
    dueDate?: number | undefined;
    taxRate?: number | undefined;
    maxStudentSeats?: number | undefined;
    gradeBookTheme?: "yellow" | "blue" | undefined;
    enableSms?: boolean | undefined;
    enableEmail?: boolean | undefined;
    educationDepartment?: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان" | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    directorName?: string | undefined;
    dueDate?: number | undefined;
    taxRate?: number | undefined;
    maxStudentSeats?: number | undefined;
    gradeBookTheme?: "yellow" | "blue" | undefined;
    enableSms?: boolean | undefined;
    enableEmail?: boolean | undefined;
    educationDepartment?: "أريانة" | "باجة" | "بن عروس" | "بنزرت" | "قابس" | "قفصة" | "جندوبة" | "القيروان" | "القصرين" | "قبلي" | "الكاف" | "المهدية" | "منوبة" | "مدنين" | "المنستير" | "نابل" | "صفاقس" | "سيدي بوزيد" | "سليانة" | "سوسة" | "تطاوين" | "توزر" | "تونس" | "زغوان" | undefined;
}>;
type TBody$T = z.infer<typeof body$T>;
declare const params$_: z.ZodObject<{
    schoolNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolNewId: string;
}, {
    schoolNewId: string;
}>;
type TParams$_ = z.infer<typeof params$_>;
type UpdateSchoolValidation = {
    body: TBody$T;
    params: TParams$_;
    query: never;
};

type UpdateSchoolRouteConfig = UpdateSchoolValidation & {
    files: never;
};
type UpdateSchoolResponse = void;

declare const updateSchoolByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSchoolByMasterRouteTypes = UpdateSchoolRouteConfig & {
    response: APIResponse<UpdateSchoolResponse>;
};

declare const body$S: z.ZodObject<{
    smsSold: z.ZodNumber;
    operation: z.ZodEnum<["plus", "minus"]>;
}, "strip", z.ZodTypeAny, {
    operation: "plus" | "minus";
    smsSold: number;
}, {
    operation: "plus" | "minus";
    smsSold: number;
}>;
type TBody$S = z.infer<typeof body$S>;
declare const params$Z: z.ZodObject<{
    schoolId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolId: string & {
        _isID: true;
    };
}, {
    schoolId: string & {
        _isID: true;
    };
}>;
type TParams$Z = z.infer<typeof params$Z>;
type UpdateSmsSoldValidation = {
    body: TBody$S;
    params: TParams$Z;
    query: never;
};

type UpdateSmsSoldRouteConfig = UpdateSmsSoldValidation & {
    files: never;
};
type UpdateSmsSoldResponse = void;

declare const updateSmsSoldByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSmsSoldByMasterRouteTypes = UpdateSmsSoldRouteConfig & {
    response: APIResponse<UpdateSmsSoldResponse>;
};

declare const params$Y: z.ZodObject<{
    subdomain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subdomain: string;
}, {
    subdomain: string;
}>;
type TParams$Y = z.infer<typeof params$Y>;
type GetSchoolConfigValidation = {
    body: never;
    params: TParams$Y;
    query: never;
};

type GetSchoolConfigRouteConfig = GetSchoolConfigValidation & {
    files: never;
};
type GetSchoolConfigResponse = {
    instanceType: TInstanceTypeEnum | null;
    flags: Record<TFeatureFlagsEnum, boolean>;
};

declare const getSchoolConfigByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSchoolConfigByPublicRouteTypes = GetSchoolConfigRouteConfig & {
    response: APIResponse<GetSchoolConfigResponse>;
};

declare const params$X: z.ZodObject<{
    schoolId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolId: string & {
        _isID: true;
    };
}, {
    schoolId: string & {
        _isID: true;
    };
}>;
type TParams$X = z.infer<typeof params$X>;
type GetSchoolLogoValidation = {
    body: never;
    params: TParams$X;
    query: never;
};

type GetSchoolLogoRouteConfig = GetSchoolLogoValidation & {
    files: never;
};
type GetSchoolLogoResponse = void;

declare const getSchoolLogoByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSchoolLogoByPublicRouteTypes = GetSchoolLogoRouteConfig & {
    response: APIResponse<GetSchoolLogoResponse>;
};

declare const params$W: z.ZodObject<{
    schoolId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    schoolId: string & {
        _isID: true;
    };
}, {
    schoolId: string & {
        _isID: true;
    };
}>;
type TParams$W = z.infer<typeof params$W>;
declare const query$p: z.ZodObject<{
    classTypeId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    classTypeId?: ID$1 | undefined;
}, {
    classTypeId?: ID$1 | undefined;
}>;
type TQuery$p = z.infer<typeof query$p>;
type GetSchoolSignatureValidation = {
    body: never;
    params: TParams$W;
    query: TQuery$p;
};

type GetSchoolSignatureRouteConfig = GetSchoolSignatureValidation & {
    files: never;
};
type GetSchoolSignatureResponse = void;

declare const getSchoolSignatureByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSchoolSignatureByPublicRouteTypes = GetSchoolSignatureRouteConfig & {
    response: APIResponse<GetSchoolSignatureResponse>;
};

declare const body$R: z.ZodObject<{
    name: z.ZodString;
    subLevelNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    subLevelNewIds: string[];
}, {
    name: string;
    subLevelNewIds: string[];
}>;
type TBody$R = z.infer<typeof body$R>;
type AddSectionValidation = {
    body: TBody$R;
    params: never;
    query: never;
};

type AddSectionRouteConfig = AddSectionValidation & {
    files: never;
};
type AddSectionResponse = Section;

declare const addSectionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSectionByAdminRouteTypes = AddSectionRouteConfig & {
    response: APIResponse<AddSectionResponse>;
};

declare const params$V: z.ZodObject<{
    sectionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sectionNewId: string;
}, {
    sectionNewId: string;
}>;
type TParams$V = z.infer<typeof params$V>;
type DeleteSectionValidation = {
    body: never;
    params: TParams$V;
    query: never;
};

type DeleteSectionRouteConfig = DeleteSectionValidation & {
    files: never;
};
type DeleteSectionResponse = void;

declare const deleteSectionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSectionByAdminRouteTypes = DeleteSectionRouteConfig & {
    response: APIResponse<DeleteSectionResponse>;
};

type SectionDto = {
    newId: string;
    _id: ID$1;
    name: string;
    subLevels: {
        name: string;
        newId: string;
        _id: ID$1;
    }[];
};

declare const query$o: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$o = z.infer<typeof query$o>;
type ListSectionsValidation = {
    body: never;
    params: never;
    query: TQuery$o;
};

type ListSectionsRouteConfig = ListSectionsValidation & {
    files: never;
};
type ListSectionsResponse = ResponseWithPagination<SectionDto>;

declare const listSectionsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSectionsByAdminRouteTypes = ListSectionsRouteConfig & {
    response: APIResponse<ListSectionsResponse>;
};

declare const body$Q: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    subLevelNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    subLevelNewIds?: string[] | undefined;
}, {
    name?: string | undefined;
    subLevelNewIds?: string[] | undefined;
}>;
type TBody$Q = z.infer<typeof body$Q>;
declare const params$U: z.ZodObject<{
    sectionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sectionNewId: string;
}, {
    sectionNewId: string;
}>;
type TParams$U = z.infer<typeof params$U>;
type UpdateSectionValidation = {
    body: TBody$Q;
    params: TParams$U;
    query: never;
};

type UpdateSectionRouteConfig = UpdateSectionValidation & {
    files: never;
};
type UpdateSectionResponse = void;

declare const updateSectionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSectionByAdminRouteTypes = UpdateSectionRouteConfig & {
    response: APIResponse<UpdateSectionResponse>;
};

declare const query$n: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    showByDefault: z.ZodOptional<z.ZodBoolean>;
    invoiceType: z.ZodOptional<z.ZodNativeEnum<{
        readonly MONTHLY: "monthly";
        readonly ONE_TIME: "oneTime";
        readonly EXTRA: "extra";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    showByDefault?: boolean | undefined;
    invoiceType?: "monthly" | "oneTime" | "extra" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    showByDefault?: boolean | undefined;
    invoiceType?: "monthly" | "oneTime" | "extra" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$n = z.infer<typeof query$n>;
type ListServicesValidation = {
    body: never;
    params: never;
    query: TQuery$n;
};

type ListServicesRouteConfig = ListServicesValidation & {
    files: never;
};
type ListServicesResponse = ResponseWithPagination<Service>;

declare const listServicesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListServicesByAdminRouteTypes = ListServicesRouteConfig & {
    response: APIResponse<ListServicesResponse>;
};

declare const params$T: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$T = z.infer<typeof params$T>;
type CloseSessionValidation = {
    body: never;
    params: TParams$T;
    query: never;
};

type CloseSessionRouteConfig = CloseSessionValidation & {
    files: never;
};
type CloseSessionResponse = void;

declare const closeSessionRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CloseSessionRouteTypes = CloseSessionRouteConfig & {
    response: APIResponse<CloseSessionResponse>;
};

declare const body$P: z.ZodObject<{
    studentId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    newStatus: z.ZodNativeEnum<{
        readonly EXPELLED: "expelled";
        readonly PRESENT: "present";
        readonly LATE: "late";
        readonly ABSENT: "absent";
    }>;
}, "strip", z.ZodTypeAny, {
    studentId: string & {
        _isID: true;
    };
    newStatus: "expelled" | "present" | "late" | "absent";
}, {
    studentId: string & {
        _isID: true;
    };
    newStatus: "expelled" | "present" | "late" | "absent";
}>;
type TBody$P = z.infer<typeof body$P>;
declare const params$S: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$S = z.infer<typeof params$S>;
type ConfirmAttendanceValidation = {
    body: TBody$P;
    params: TParams$S;
    query: never;
};

type ConfirmAttendanceRouteConfig = ConfirmAttendanceValidation & {
    files: never;
};
type ConfirmAttendanceResponse = void;

declare const confirmAttendanceRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ConfirmAttendanceRouteTypes = ConfirmAttendanceRouteConfig & {
    response: APIResponse<ConfirmAttendanceResponse>;
};

type SessionAttendanceDTO = {
    student: UserProfileDTO;
    attendance: TAttendanceEnum | null;
    previousAttendance: TAttendanceEnum | null;
}[];

type SessionDetailsDTO = {
    _id: ID$1;
    newId: string;
    status: TSessionStatusEnum;
    reasonForCanceling: string | null;
    isAttendanceConfirmationAllowed: boolean;
    startTime: string
    endTime: string
    sessionType: EntityDto;
    week: TSessionWeekEnum | null;
    classGroup: EntityDto | null;
    classroom: EntityDto;
    class: EntityDto | null;
    group: EntityDto | null;
    subjectType: EntityDto | null;
    subSubjectType: EntityDto | null;
    teacher: UserProfileDTO | null;
    sessionSummary: string | null;
    homeworkToDo: HomeworkDTO[];
    homeworkGiven: HomeworkDTO[];
    observations: ObservationDTO[];
    files: IFile[];
    notes: {
        title: string;
        text: string;
        index: number;
    }[];
    sessionAttendance: SessionAttendanceDTO;
    attendanceStats: {
        present: {
            percentage: string;
            count: number;
        };
        absent: {
            percentage: string;
            count: number;
        };
        late: {
            percentage: string;
            count: number;
        };
        expelled: {
            percentage: string;
            count: number;
        };
    } | null;
    launchedAt: string| null;
};

declare const params$R: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$R = z.infer<typeof params$R>;
type GetSessionDetailsValidation = {
    body: never;
    params: TParams$R;
    query: never;
};

type GetSessionDetailsRouteConfig = GetSessionDetailsValidation & {
    files: never;
};
type GetSessionDetailsResponse = SessionDetailsDTO;

declare const getSessionDetailsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSessionDetailsRouteTypes = GetSessionDetailsRouteConfig & {
    response: APIResponse<GetSessionDetailsResponse>;
};

declare const params$Q: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$Q = z.infer<typeof params$Q>;
type StartSessionValidation = {
    body: never;
    params: TParams$Q;
    query: never;
};

type StartSessionRouteConfig = StartSessionValidation & {
    files: never;
};
type StartSessionResponse = void;

declare const startSessionRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type StartSessionRouteTypes = StartSessionRouteConfig & {
    response: APIResponse<StartSessionResponse>;
};

declare const body$O: z.ZodObject<{
    notes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        text: z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        title: string;
    }, {
        text: string;
        title: string;
    }>, "many">>;
    sessionSummary: z.ZodOptional<z.ZodEffects<z.ZodType<string, z.ZodTypeDef, string>, string, string>>;
    deletedAttachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    notes?: {
        text: string;
        title: string;
    }[] | undefined;
    sessionSummary?: string | undefined;
    deletedAttachments?: string[] | undefined;
}, {
    notes?: {
        text: string;
        title: string;
    }[] | undefined;
    sessionSummary?: string | undefined;
    deletedAttachments?: string[] | undefined;
}>;
type TBody$O = z.infer<typeof body$O>;
declare const params$P: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$P = z.infer<typeof params$P>;
type UpdateSessionDetailsValidation = {
    body: TBody$O;
    params: TParams$P;
    query: never;
};

type UpdateSessionDetailsRouteConfig = UpdateSessionDetailsValidation & {
    files: FilesInRequest<"attachments">;
};
type UpdateSessionDetailsResponse = SessionDetailsDTO;

declare const updateSessionDetailsRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSessionDetailsRouteTypes = UpdateSessionDetailsRouteConfig & {
    response: APIResponse<UpdateSessionDetailsResponse>;
};

declare const body$N: z.ZodObject<{
    topicType: z.ZodEnum<["subjectType", "subSubjectType"]>;
    topicNewId: z.ZodString;
    sessionTypeNewId: z.ZodString;
    startTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    groupNewId: z.ZodOptional<z.ZodString>;
    classNewId: z.ZodString;
    classroomNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    startTime: string
    endTime: string
    topicType: "subjectType" | "subSubjectType";
    topicNewId: string;
    classNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    groupNewId?: string | undefined;
}, {
    startTime: (string | Date) & (string | string| undefined);
    endTime: (string | Date) & (string | string| undefined);
    topicType: "subjectType" | "subSubjectType";
    topicNewId: string;
    classNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    groupNewId?: string | undefined;
}>;
type TBody$N = z.infer<typeof body$N>;
type AddSessionForClassValidation = {
    body: TBody$N;
    params: never;
    query: never;
};

type AddSessionForClassRouteConfig = AddSessionForClassValidation & {
    files: never;
};
type AddSessionForClassResponse = {
    isValid: boolean;
    sessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const addSessionForClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSessionForClassByAdminRouteTypes = AddSessionForClassRouteConfig & {
    response: APIResponse<AddSessionForClassResponse>;
};

declare const body$M: z.ZodObject<{
    sessionTypeNewId: z.ZodString;
    startTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    endTime: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>;
    groupNewId: z.ZodString;
    classroomNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    startTime: string
    endTime: string
    groupNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
}, {
    startTime: (string | Date) & (string | string| undefined);
    endTime: (string | Date) & (string | string| undefined);
    groupNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
}>;
type TBody$M = z.infer<typeof body$M>;
type AddSessionForGroupValidation = {
    body: TBody$M;
    params: never;
    query: never;
};

type AddSessionForGroupRouteConfig = AddSessionForGroupValidation & {
    files: never;
};
type AddSessionForGroupResponse = {
    isValid: boolean;
    sessionId: string | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const addSessionForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSessionForGroupByAdminRouteTypes = AddSessionForGroupRouteConfig & {
    response: APIResponse<AddSessionForGroupResponse>;
};

declare const body$L: z.ZodObject<{
    reasonForCanceling: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reasonForCanceling: string;
}, {
    reasonForCanceling: string;
}>;
type TBody$L = z.infer<typeof body$L>;
declare const params$O: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$O = z.infer<typeof params$O>;
type CancelSessionValidation = {
    body: TBody$L;
    params: TParams$O;
    query: never;
};

type CancelSessionRouteConfig = CancelSessionValidation & {
    files: never;
};
type CancelSessionResponse = void;

declare const cancelSessionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CancelSessionByAdminRouteTypes = CancelSessionRouteConfig & {
    response: APIResponse<CancelSessionResponse>;
};

declare const body$K: z.ZodObject<{
    startTime: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    endTime: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    classroomNewId: z.ZodOptional<z.ZodString>;
    groupNewId: z.ZodOptional<z.ZodString>;
    sessionTypeNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startTime?: string| undefined;
    endTime?: string| undefined;
    classroomNewId?: string | undefined;
    groupNewId?: string | undefined;
    sessionTypeNewId?: string | undefined;
}, {
    startTime?: string | string| undefined;
    endTime?: string | string| undefined;
    classroomNewId?: string | undefined;
    groupNewId?: string | undefined;
    sessionTypeNewId?: string | undefined;
}>;
type TBody$K = z.infer<typeof body$K>;
declare const params$N: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$N = z.infer<typeof params$N>;
type UpdateSessionForClassValidation = {
    body: TBody$K;
    params: TParams$N;
    query: never;
};

type UpdateSessionForClassRouteConfig = UpdateSessionForClassValidation & {
    files: never;
};
type UpdateSessionForClassResponse = {
    isValid: boolean;
    sessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const updateSessionForClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSessionForClassByAdminRouteTypes = UpdateSessionForClassRouteConfig & {
    response: APIResponse<UpdateSessionForClassResponse>;
};

declare const body$J: z.ZodObject<{
    startTime: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    endTime: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    classroomNewId: z.ZodOptional<z.ZodString>;
    sessionTypeNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startTime?: string| undefined;
    endTime?: string| undefined;
    classroomNewId?: string | undefined;
    sessionTypeNewId?: string | undefined;
}, {
    startTime?: string | string| undefined;
    endTime?: string | string| undefined;
    classroomNewId?: string | undefined;
    sessionTypeNewId?: string | undefined;
}>;
type TBody$J = z.infer<typeof body$J>;
declare const params$M: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$M = z.infer<typeof params$M>;
type UpdateSessionForGroupValidation = {
    body: TBody$J;
    params: TParams$M;
    query: never;
};

type UpdateSessionForGroupRouteConfig = UpdateSessionForGroupValidation & {
    files: never;
};
type UpdateSessionForGroupResponse = {
    isValid: boolean;
    sessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const updateSessionForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSessionForGroupByAdminRouteTypes = UpdateSessionForGroupRouteConfig & {
    response: APIResponse<UpdateSessionForGroupResponse>;
};

type UpdateSessionStatusUseCaseResponse = {
    status: TSessionStatusEnum;
};

declare const body$I: z.ZodObject<{
    newStatus: z.ZodNativeEnum<{
        readonly WAITING: "waiting";
        readonly IN_PROGRESS: "inProgress";
        readonly COMPLETED: "completed";
        readonly CANCELED: "canceled";
    }>;
}, "strip", z.ZodTypeAny, {
    newStatus: "waiting" | "inProgress" | "completed" | "canceled";
}, {
    newStatus: "waiting" | "inProgress" | "completed" | "canceled";
}>;
type TBody$I = z.infer<typeof body$I>;
declare const params$L: z.ZodObject<{
    sessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionNewId: string;
}, {
    sessionNewId: string;
}>;
type TParams$L = z.infer<typeof params$L>;
type UpdateSessionStatusValidation = {
    body: TBody$I;
    params: TParams$L;
    query: never;
};

type UpdateSessionStatusRouteConfig = UpdateSessionStatusValidation & {
    files: never;
};
type UpdateSessionStatusResponse = UpdateSessionStatusUseCaseResponse;

declare const updateSessionStatusByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSessionStatusByAdminRouteTypes = UpdateSessionStatusRouteConfig & {
    response: APIResponse<UpdateSessionStatusResponse>;
};

declare const params$K: z.ZodObject<{
    sessionTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionTypeNewId: string;
}, {
    sessionTypeNewId: string;
}>;
type TParams$K = z.infer<typeof params$K>;
type DeleteSessionTypeValidation = {
    body: never;
    params: TParams$K;
    query: never;
};
declare const DeleteSessionTypeValidation: {
    params: z.ZodObject<{
        sessionTypeNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionTypeNewId: string;
    }, {
        sessionTypeNewId: string;
    }>;
};

type DeleteSessionTypeRouteConfig = DeleteSessionTypeValidation & {
    files: never;
};
type DeleteSessionTypeResponse = void;

declare const DeleteSessionTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSessionTypeByAdminRouteTypes = DeleteSessionTypeRouteConfig & {
    response: APIResponse<DeleteSessionTypeResponse>;
};

declare const body$H: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type TBody$H = z.infer<typeof body$H>;
type AddSessionTypeValidation = {
    body: TBody$H;
    params: never;
    query: never;
};

type AddSessionTypeRouteConfig = AddSessionTypeValidation & {
    files: never;
};
type AddSessionTypeResponse = void;

declare const addSessionTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSessionTypeByAdminRouteTypes = AddSessionTypeRouteConfig & {
    response: APIResponse<AddSessionTypeResponse>;
};

declare const query$m: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$m = z.infer<typeof query$m>;
type ListSessionTypeValidation = {
    body: never;
    params: never;
    query: TQuery$m;
};

type ListSessionTypeRouteConfig = ListSessionTypeValidation & {
    files: never;
};
type ListSessionTypeResponse = ResponseWithPagination<SessionType>;

declare const listSessionTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSessionTypeByAdminRouteTypes = ListSessionTypeRouteConfig & {
    response: APIResponse<ListSessionTypeResponse>;
};

declare const body$G: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
type TBody$G = z.infer<typeof body$G>;
declare const params$J: z.ZodObject<{
    sessionTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionTypeNewId: string;
}, {
    sessionTypeNewId: string;
}>;
type TParams$J = z.infer<typeof params$J>;
type UpdateSessionTypeValidation = {
    body: TBody$G;
    params: TParams$J;
    query: never;
};

type UpdateSessionTypeRouteConfig = UpdateSessionTypeValidation & {
    files: never;
};
type UpdateSessionTypeResponse = void;

declare const updateSessionTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSessionTypeByAdminRouteTypes = UpdateSessionTypeRouteConfig & {
    response: APIResponse<UpdateSessionTypeResponse>;
};

declare const body$F: z.ZodObject<{
    name: z.ZodString;
    personName: z.ZodOptional<z.ZodString>;
    classTypes: z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    classTypes: ID$1[];
    personName?: string | undefined;
}, {
    name: string;
    classTypes: ID$1[];
    personName?: string | undefined;
}>;
type TBody$F = z.infer<typeof body$F>;
type AddSignatureValidation = {
    body: TBody$F;
    params: never;
    query: never;
};

type AddSignatureRouteConfig = AddSignatureValidation & {
    files: FilesInRequest<"image">;
};
type AddSignatureResponse = void;

declare const addSignatureByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSignatureByAdminRouteTypes = AddSignatureRouteConfig & {
    response: APIResponse<AddSignatureResponse>;
};

declare const params$I: z.ZodObject<{
    signatureNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    signatureNewId: string;
}, {
    signatureNewId: string;
}>;
type TParams$I = z.infer<typeof params$I>;
type DeleteSignatureValidation = {
    params: TParams$I;
    body: never;
    query: never;
};

type DeleteSignatureRouteConfig = DeleteSignatureValidation & {
    files: never;
};
type DeleteSignatureResponse = void;

declare const deleteSignatureByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSignatureByAdminRouteTypes = DeleteSignatureRouteConfig & {
    response: APIResponse<DeleteSignatureResponse>;
};

type SignatureDto = {
    _id: ID$1;
    newId: string;
    name: string;
    personName: string | null;
    image: IFile;
    classTypes: {
        _id: ID$1;
        newId: string;
        name: string;
    }[];
};

declare const query$l: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$l = z.infer<typeof query$l>;
type ListSignaturesValidation = {
    body: never;
    params: never;
    query: TQuery$l;
};

type ListSignaturesRouteConfig = ListSignaturesValidation & {
    files: never;
};
type ListSignaturesResponse = ResponseWithPagination<SignatureDto>;

declare const listSignaturesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSignaturesByAdminRouteTypes = ListSignaturesRouteConfig & {
    response: APIResponse<ListSignaturesResponse>;
};

declare const body$E: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    personName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    personName?: string | undefined;
    classTypes?: ID$1[] | undefined;
}, {
    name?: string | undefined;
    personName?: string | undefined;
    classTypes?: ID$1[] | undefined;
}>;
type TBody$E = z.infer<typeof body$E>;
declare const params$H: z.ZodObject<{
    signatureNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    signatureNewId: string;
}, {
    signatureNewId: string;
}>;
type TParams$H = z.infer<typeof params$H>;
type UpdateSignatureValidation = {
    body: TBody$E;
    params: TParams$H;
    query: never;
};

type UpdateSignatureRouteConfig = UpdateSignatureValidation & {
    files: FilesInRequest<"image">;
};
type UpdateSignatureResponse = void;

declare const updateSignatureByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSignatureByAdminRouteTypes = UpdateSignatureRouteConfig & {
    response: APIResponse<UpdateSignatureResponse>;
};

declare const body$D: z.ZodObject<{
    activities: z.ZodArray<z.ZodObject<{
        class: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        sessionType: z.ZodString;
        subjectType: z.ZodNullable<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
        subSubjectType: z.ZodNullable<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
        teacher: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        week: z.ZodNullable<z.ZodEnum<["A", "B"]>>;
        classGroup: z.ZodNullable<z.ZodEnum<["1", "2"]>>;
        startTime: z.ZodObject<{
            day: z.ZodNumber;
            timeStamps: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            day: number;
            timeStamps: number;
        }, {
            day: number;
            timeStamps: number;
        }>;
        endTime: z.ZodObject<{
            day: z.ZodNumber;
            timeStamps: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            day: number;
            timeStamps: number;
        }, {
            day: number;
            timeStamps: number;
        }>;
        classroom: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    }, "strip", z.ZodTypeAny, {
        teacher: string & {
            _isID: true;
        };
        classroom: string & {
            _isID: true;
        };
        class: string & {
            _isID: true;
        };
        classGroup: "1" | "2" | null;
        sessionType: string;
        subjectType: (string & {
            _isID: true;
        }) | null;
        subSubjectType: (string & {
            _isID: true;
        }) | null;
        startTime: {
            day: number;
            timeStamps: number;
        };
        endTime: {
            day: number;
            timeStamps: number;
        };
        week: "A" | "B" | null;
    }, {
        teacher: string & {
            _isID: true;
        };
        classroom: string & {
            _isID: true;
        };
        class: string & {
            _isID: true;
        };
        classGroup: "1" | "2" | null;
        sessionType: string;
        subjectType: (string & {
            _isID: true;
        }) | null;
        subSubjectType: (string & {
            _isID: true;
        }) | null;
        startTime: {
            day: number;
            timeStamps: number;
        };
        endTime: {
            day: number;
            timeStamps: number;
        };
        week: "A" | "B" | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    activities: {
        teacher: string & {
            _isID: true;
        };
        classroom: string & {
            _isID: true;
        };
        class: string & {
            _isID: true;
        };
        classGroup: "1" | "2" | null;
        sessionType: string;
        subjectType: (string & {
            _isID: true;
        }) | null;
        subSubjectType: (string & {
            _isID: true;
        }) | null;
        startTime: {
            day: number;
            timeStamps: number;
        };
        endTime: {
            day: number;
            timeStamps: number;
        };
        week: "A" | "B" | null;
    }[];
}, {
    activities: {
        teacher: string & {
            _isID: true;
        };
        classroom: string & {
            _isID: true;
        };
        class: string & {
            _isID: true;
        };
        classGroup: "1" | "2" | null;
        sessionType: string;
        subjectType: (string & {
            _isID: true;
        }) | null;
        subSubjectType: (string & {
            _isID: true;
        }) | null;
        startTime: {
            day: number;
            timeStamps: number;
        };
        endTime: {
            day: number;
            timeStamps: number;
        };
        week: "A" | "B" | null;
    }[];
}>;
type TBody$D = z.infer<typeof body$D>;
declare const params$G: z.ZodObject<{
    scheduleId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    scheduleId: string & {
        _isID: true;
    };
}, {
    scheduleId: string & {
        _isID: true;
    };
}>;
type TParams$G = z.infer<typeof params$G>;
declare const query$k: z.ZodObject<{
    schoolSubdomain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolSubdomain: string;
}, {
    schoolSubdomain: string;
}>;
type TQuery$k = z.infer<typeof query$k>;
type CompleteScheduleGenerationValidation = {
    body: TBody$D;
    params: TParams$G;
    query: TQuery$k;
};
declare const CompleteScheduleGenerationValidation: {
    body: z.ZodObject<{
        activities: z.ZodArray<z.ZodObject<{
            class: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
            sessionType: z.ZodString;
            subjectType: z.ZodNullable<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
            subSubjectType: z.ZodNullable<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
            teacher: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
            week: z.ZodNullable<z.ZodEnum<["A", "B"]>>;
            classGroup: z.ZodNullable<z.ZodEnum<["1", "2"]>>;
            startTime: z.ZodObject<{
                day: z.ZodNumber;
                timeStamps: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                day: number;
                timeStamps: number;
            }, {
                day: number;
                timeStamps: number;
            }>;
            endTime: z.ZodObject<{
                day: z.ZodNumber;
                timeStamps: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                day: number;
                timeStamps: number;
            }, {
                day: number;
                timeStamps: number;
            }>;
            classroom: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
        }, "strip", z.ZodTypeAny, {
            teacher: string & {
                _isID: true;
            };
            classroom: string & {
                _isID: true;
            };
            class: string & {
                _isID: true;
            };
            classGroup: "1" | "2" | null;
            sessionType: string;
            subjectType: (string & {
                _isID: true;
            }) | null;
            subSubjectType: (string & {
                _isID: true;
            }) | null;
            startTime: {
                day: number;
                timeStamps: number;
            };
            endTime: {
                day: number;
                timeStamps: number;
            };
            week: "A" | "B" | null;
        }, {
            teacher: string & {
                _isID: true;
            };
            classroom: string & {
                _isID: true;
            };
            class: string & {
                _isID: true;
            };
            classGroup: "1" | "2" | null;
            sessionType: string;
            subjectType: (string & {
                _isID: true;
            }) | null;
            subSubjectType: (string & {
                _isID: true;
            }) | null;
            startTime: {
                day: number;
                timeStamps: number;
            };
            endTime: {
                day: number;
                timeStamps: number;
            };
            week: "A" | "B" | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        activities: {
            teacher: string & {
                _isID: true;
            };
            classroom: string & {
                _isID: true;
            };
            class: string & {
                _isID: true;
            };
            classGroup: "1" | "2" | null;
            sessionType: string;
            subjectType: (string & {
                _isID: true;
            }) | null;
            subSubjectType: (string & {
                _isID: true;
            }) | null;
            startTime: {
                day: number;
                timeStamps: number;
            };
            endTime: {
                day: number;
                timeStamps: number;
            };
            week: "A" | "B" | null;
        }[];
    }, {
        activities: {
            teacher: string & {
                _isID: true;
            };
            classroom: string & {
                _isID: true;
            };
            class: string & {
                _isID: true;
            };
            classGroup: "1" | "2" | null;
            sessionType: string;
            subjectType: (string & {
                _isID: true;
            }) | null;
            subSubjectType: (string & {
                _isID: true;
            }) | null;
            startTime: {
                day: number;
                timeStamps: number;
            };
            endTime: {
                day: number;
                timeStamps: number;
            };
            week: "A" | "B" | null;
        }[];
    }>;
    params: z.ZodObject<{
        scheduleId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    }, "strip", z.ZodTypeAny, {
        scheduleId: string & {
            _isID: true;
        };
    }, {
        scheduleId: string & {
            _isID: true;
        };
    }>;
    query: z.ZodObject<{
        schoolSubdomain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        schoolSubdomain: string;
    }, {
        schoolSubdomain: string;
    }>;
};

type CompleteScheduleGenerationRouteConfig = CompleteScheduleGenerationValidation & {
    files: never;
};
type CompleteScheduleGenerationResponse = void;

declare const CompleteScheduleGenerationByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CompleteScheduleGenerationByPublicRouteTypes = CompleteScheduleGenerationRouteConfig & {
    response: APIResponse<CompleteScheduleGenerationResponse>;
};

declare const params$F: z.ZodObject<{
    scheduleId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    scheduleId: string & {
        _isID: true;
    };
}, {
    scheduleId: string & {
        _isID: true;
    };
}>;
type TParams$F = z.infer<typeof params$F>;
declare const query$j: z.ZodObject<{
    schoolSubdomain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schoolSubdomain: string;
}, {
    schoolSubdomain: string;
}>;
type TQuery$j = z.infer<typeof query$j>;
type MarkScheduleAsErroredValidation = {
    body: never;
    params: TParams$F;
    query: TQuery$j;
};
declare const MarkScheduleAsErroredValidation: {
    params: z.ZodObject<{
        scheduleId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    }, "strip", z.ZodTypeAny, {
        scheduleId: string & {
            _isID: true;
        };
    }, {
        scheduleId: string & {
            _isID: true;
        };
    }>;
    query: z.ZodObject<{
        schoolSubdomain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        schoolSubdomain: string;
    }, {
        schoolSubdomain: string;
    }>;
};

type MarkScheduleAsErroredRouteConfig = MarkScheduleAsErroredValidation & {
    files: never;
};
type MarkScheduleAsErroredResponse = void;

declare const MarkScheduleAsErroredByPublicRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type MarkScheduleAsErroredByPublicRouteTypes = MarkScheduleAsErroredRouteConfig & {
    response: APIResponse<MarkScheduleAsErroredResponse>;
};

declare const body$C: z.ZodObject<{
    sessionType: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    subjectType: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    subSubjectType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    perGroup: z.ZodOptional<z.ZodBoolean>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
    durationInMinutes: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    sessionType: string & {
        _isID: true;
    };
    subjectType: string & {
        _isID: true;
    };
    durationInMinutes: number;
    subSubjectType?: ID$1 | undefined;
    perGroup?: boolean | undefined;
    week?: "A" | "B" | undefined;
}, {
    sessionType: string & {
        _isID: true;
    };
    subjectType: string & {
        _isID: true;
    };
    durationInMinutes: number;
    subSubjectType?: ID$1 | undefined;
    perGroup?: boolean | undefined;
    week?: "A" | "B" | undefined;
}>;
type TBody$C = z.infer<typeof body$C>;
declare const params$E: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$E = z.infer<typeof params$E>;
type AddClassTypeActivityValidation = {
    body: TBody$C;
    params: TParams$E;
    query: never;
};

type AddClassTypeActivityRouteConfig = AddClassTypeActivityValidation & {
    files: never;
};
type AddClassTypeActivityResponse = void;

declare const addClassTypeActivityByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddClassTypeActivityByAdminRouteTypes = AddClassTypeActivityRouteConfig & {
    response: APIResponse<AddClassTypeActivityResponse>;
};

declare const params$D: z.ZodObject<{
    smartCalendarScheduleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    smartCalendarScheduleNewId: string;
}, {
    smartCalendarScheduleNewId: string;
}>;
type TParams$D = z.infer<typeof params$D>;
type ApplySmartCalendarScheduleValidation = {
    body: never;
    params: TParams$D;
    query: never;
};

type ApplySmartCalendarScheduleRouteConfig = ApplySmartCalendarScheduleValidation & {
    files: never;
};
type ApplySmartCalendarScheduleResponse = void;

declare const applySmartCalendarScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ApplySmartCalendarScheduleByAdminRouteTypes = ApplySmartCalendarScheduleRouteConfig & {
    response: APIResponse<ApplySmartCalendarScheduleResponse>;
};

declare const params$C: z.ZodObject<{
    smartCalendarScheduleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    smartCalendarScheduleNewId: string;
}, {
    smartCalendarScheduleNewId: string;
}>;
type TParams$C = z.infer<typeof params$C>;
type CancelSmartCalendarScheduleValidation = {
    body: never;
    params: TParams$C;
    query: never;
};

type CancelSmartCalendarScheduleRouteConfig = CancelSmartCalendarScheduleValidation & {
    files: never;
};
type CancelSmartCalendarScheduleResponse = void;

declare const cancelSmartCalendarScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type CancelSmartCalendarScheduleByAdminRouteTypes = CancelSmartCalendarScheduleRouteConfig & {
    response: APIResponse<CancelSmartCalendarScheduleResponse>;
};

declare const params$B: z.ZodObject<{
    classTypeNewId: z.ZodString;
    activityIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    activityIndex: string;
}, {
    classTypeNewId: string;
    activityIndex: string;
}>;
type TParams$B = z.infer<typeof params$B>;
type DeleteClassTypeActivityValidation = {
    body: never;
    params: TParams$B;
    query: never;
};

type DeleteClassTypeActivityRouteConfig = DeleteClassTypeActivityValidation & {
    files: never;
};
type DeleteClassTypeActivityResponse = void;

declare const deleteClassTypeActivityByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteClassTypeActivityByAdminRouteTypes = DeleteClassTypeActivityRouteConfig & {
    response: APIResponse<DeleteClassTypeActivityResponse>;
};

declare const params$A: z.ZodObject<{
    smartCalendarScheduleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    smartCalendarScheduleNewId: string;
}, {
    smartCalendarScheduleNewId: string;
}>;
type TParams$A = z.infer<typeof params$A>;
type DeleteSmartCalendarScheduleValidation = {
    body: never;
    params: TParams$A;
    query: never;
};

type DeleteSmartCalendarScheduleRouteConfig = DeleteSmartCalendarScheduleValidation & {
    files: never;
};
type DeleteSmartCalendarScheduleResponse = void;

declare const deleteSmartCalendarScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSmartCalendarScheduleByAdminRouteTypes = DeleteSmartCalendarScheduleRouteConfig & {
    response: APIResponse<DeleteSmartCalendarScheduleResponse>;
};

declare const body$B: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type TBody$B = z.infer<typeof body$B>;
type GenerateScheduleValidation = {
    body: TBody$B;
    params: never;
    query: never;
};

type GenerateScheduleRouteConfig = GenerateScheduleValidation & {
    files: never;
};
type GenerateScheduleResponse = void;

declare const generateScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GenerateScheduleByAdminRouteTypes = GenerateScheduleRouteConfig & {
    response: APIResponse<GenerateScheduleResponse>;
};

type ActivityDTO = {
    index: number;
    durationInMinutes: number;
    sessionType: {
        _id: ID$1;
        newId: string;
        name: string;
    };
    week: string | null;
    perGroup: boolean;
    subjectType: {
        _id: ID$1;
        newId: string;
        name: string;
    };
    subSubjectType: {
        _id: ID$1;
        newId: string;
        name: string;
    } | null;
};

declare const params$z: z.ZodObject<{
    classTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
}, {
    classTypeNewId: string;
}>;
type TParams$z = z.infer<typeof params$z>;
type GetActivitiesOfClassTypeValidation = {
    body: never;
    params: TParams$z;
    query: never;
};

type GetActivitiesOfClassTypeRouteConfig = GetActivitiesOfClassTypeValidation & {
    files: never;
};
type GetActivitiesOfClassTypeResponse = ActivityDTO[];

declare const getActivitiesOfClassTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetActivitiesOfClassTypeByAdminRouteTypes = GetActivitiesOfClassTypeRouteConfig & {
    response: APIResponse<GetActivitiesOfClassTypeResponse>;
};

type GetSchoolAvailableTimeConstraintsValidation = {
    body: never;
    params: never;
    query: never;
};

type GetSchoolAvailableTimeConstraintsRouteConfig = GetSchoolAvailableTimeConstraintsValidation & {
    files: never;
};
type GetSchoolAvailableTimeConstraintsResponse = {
    day: number;
    hours: number[];
}[];

declare const getSchoolAvailableTimeConstraintsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetSchoolAvailableTimeConstraintsByAdminRouteTypes = GetSchoolAvailableTimeConstraintsRouteConfig & {
    response: APIResponse<GetSchoolAvailableTimeConstraintsResponse>;
};

type SmartCalendarPdfDTO = {
    teachers: {
        _id: string;
        name: string;
        sessions: WeeklySessionDTO[];
    }[];
    classes: {
        _id: string;
        name: string;
        sessions: WeeklySessionDTO[];
    }[];
    classrooms: {
        _id: string;
        name: string;
        sessions: WeeklySessionDTO[];
    }[];
};

declare const params$y: z.ZodObject<{
    scheduleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    scheduleNewId: string;
}, {
    scheduleNewId: string;
}>;
type TParams$y = z.infer<typeof params$y>;
type GetSmartSchedulePDFValidation = {
    body: never;
    params: TParams$y;
    query: never;
};
declare const GetSmartSchedulePDFValidation: {
    params: z.ZodObject<{
        scheduleNewId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        scheduleNewId: string;
    }, {
        scheduleNewId: string;
    }>;
};

type GetSmartSchedulePDFRouteConfig = GetSmartSchedulePDFValidation & {
    files: never;
};
type GetSmartSchedulePDFResponse = SmartCalendarPdfDTO;

declare const getSmartSchedulePDFByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetSmartSchedulePDFByAdminRouteTypes = GetSmartSchedulePDFRouteConfig & {
    response: APIResponse<GetSmartSchedulePDFResponse>;
};

type SmartCalendarScheduleDTO = {
    _id: string;
    newId: string;
    name: string;
    status: TSmartCalendarScheduleStatusEnum;
    generatedAt: string
    generatedByAdmin: UserProfileDTO;
};

declare const query$i: z.ZodObject<{
    sort: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sort?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    export?: "csv" | "xlsx" | undefined;
    search?: string | undefined;
}, {
    sort?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    export?: "csv" | "xlsx" | undefined;
    search?: string | undefined;
}>;
type TQuery$i = z.infer<typeof query$i>;
type ListSmartCalendarScheduleValidation = {
    body: never;
    params: never;
    query: TQuery$i;
};

type ListSmartCalendarScheduleRouteConfig = ListSmartCalendarScheduleValidation & {
    files: never;
};
type ListSmartCalendarScheduleResponse = ResponseWithPagination<SmartCalendarScheduleDTO>;

declare const listSmartCalendarScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSmartCalendarScheduleByAdminRouteTypes = ListSmartCalendarScheduleRouteConfig & {
    response: APIResponse<ListSmartCalendarScheduleResponse>;
};

declare const body$A: z.ZodObject<{
    preferredClassroom: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    maxHoursPerDay: z.ZodOptional<z.ZodNumber>;
    maxContinuousHours: z.ZodOptional<z.ZodNumber>;
    maxGapsPerDay: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    preferredClassroom?: ID$1 | undefined;
    maxHoursPerDay?: number | undefined;
    maxContinuousHours?: number | undefined;
    maxGapsPerDay?: number | undefined;
}, {
    preferredClassroom?: ID$1 | undefined;
    maxHoursPerDay?: number | undefined;
    maxContinuousHours?: number | undefined;
    maxGapsPerDay?: number | undefined;
}>;
type TBody$A = z.infer<typeof body$A>;
declare const params$x: z.ZodObject<{
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classNewId: string;
}, {
    classNewId: string;
}>;
type TParams$x = z.infer<typeof params$x>;
type UpdateClassConstraintsValidation = {
    body: TBody$A;
    params: TParams$x;
    query: never;
};

type UpdateClassConstraintsRouteConfig = UpdateClassConstraintsValidation & {
    files: never;
};
type UpdateClassConstraintsResponse = void;

declare const updateClassConstraintsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateClassConstraintsByAdminRouteTypes = UpdateClassConstraintsRouteConfig & {
    response: APIResponse<UpdateClassConstraintsResponse>;
};

declare const body$z: z.ZodObject<{
    durationInMinutes: z.ZodOptional<z.ZodNumber>;
    sessionType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    perGroup: z.ZodOptional<z.ZodBoolean>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
}, "strip", z.ZodTypeAny, {
    durationInMinutes?: number | undefined;
    sessionType?: ID$1 | undefined;
    perGroup?: boolean | undefined;
    week?: "A" | "B" | undefined;
}, {
    durationInMinutes?: number | undefined;
    sessionType?: ID$1 | undefined;
    perGroup?: boolean | undefined;
    week?: "A" | "B" | undefined;
}>;
type TBody$z = z.infer<typeof body$z>;
declare const params$w: z.ZodObject<{
    classTypeNewId: z.ZodString;
    activityIndex: z.ZodString;
}, "strip", z.ZodTypeAny, {
    classTypeNewId: string;
    activityIndex: string;
}, {
    classTypeNewId: string;
    activityIndex: string;
}>;
type TParams$w = z.infer<typeof params$w>;
type UpdateClassTypeActivityValidation = {
    body: TBody$z;
    params: TParams$w;
    query: never;
};

type UpdateClassTypeActivityRouteConfig = UpdateClassTypeActivityValidation & {
    files: never;
};
type UpdateClassTypeActivityResponse = void;

declare const updateClassTypeActivityByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateClassTypeActivityByAdminRouteTypes = UpdateClassTypeActivityRouteConfig & {
    response: APIResponse<UpdateClassTypeActivityResponse>;
};

declare const body$y: z.ZodObject<{
    newId: z.ZodOptional<z.ZodString>;
    entity: z.ZodEnum<["teacher", "school", "class"]>;
    notAvailableTimes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodArray<z.ZodNumber, "many">;
        isAvailable: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }, {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    entity: "teacher" | "class" | "school";
    newId?: string | undefined;
    notAvailableTimes?: {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }[] | undefined;
}, {
    entity: "teacher" | "class" | "school";
    newId?: string | undefined;
    notAvailableTimes?: {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }[] | undefined;
}>;
type TBody$y = z.infer<typeof body$y>;
type UpdateNotAvailableTimesValidation = {
    body: TBody$y;
    params: never;
    query: never;
};

type UpdateNotAvailableTimesRouteConfig = UpdateNotAvailableTimesValidation & {
    files: never;
};
type UpdateNotAvailableTimesResponse = void;

declare const updateNotAvailableTimesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UpdateNotAvailableTimesByAdminRouteTypes = UpdateNotAvailableTimesRouteConfig & {
    response: APIResponse<UpdateNotAvailableTimesResponse>;
};

declare const body$x: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
type TBody$x = z.infer<typeof body$x>;
declare const params$v: z.ZodObject<{
    smartCalendarScheduleNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    smartCalendarScheduleNewId: string;
}, {
    smartCalendarScheduleNewId: string;
}>;
type TParams$v = z.infer<typeof params$v>;
type UpdateSmartCalendarScheduleValidation = {
    body: TBody$x;
    params: TParams$v;
    query: never;
};

type UpdateSmartCalendarScheduleRouteConfig = UpdateSmartCalendarScheduleValidation & {
    files: never;
};
type UpdateSmartCalendarScheduleResponse = void;

declare const updateSmartCalendarScheduleByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSmartCalendarScheduleByAdminRouteTypes = UpdateSmartCalendarScheduleRouteConfig & {
    response: APIResponse<UpdateSmartCalendarScheduleResponse>;
};

declare const body$w: z.ZodObject<{
    preferredClassroom: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    maxDaysPerWeek: z.ZodOptional<z.ZodNumber>;
    maxGapsPerDay: z.ZodOptional<z.ZodNumber>;
    maxHoursPerDay: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    preferredClassroom?: ID$1 | undefined;
    maxDaysPerWeek?: number | undefined;
    maxGapsPerDay?: number | undefined;
    maxHoursPerDay?: number | undefined;
}, {
    preferredClassroom?: ID$1 | undefined;
    maxDaysPerWeek?: number | undefined;
    maxGapsPerDay?: number | undefined;
    maxHoursPerDay?: number | undefined;
}>;
type TBody$w = z.infer<typeof body$w>;
declare const params$u: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$u = z.infer<typeof params$u>;
type UpdateTeacherConstraintsValidation = {
    body: TBody$w;
    params: TParams$u;
    query: never;
};

type UpdateTeacherConstraintsRouteConfig = UpdateTeacherConstraintsValidation & {
    files: never;
};
type UpdateTeacherConstraintsResponse = void;

declare const updateTeacherConstraintsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTeacherConstraintsByAdminRouteTypes = UpdateTeacherConstraintsRouteConfig & {
    response: APIResponse<UpdateTeacherConstraintsResponse>;
};

declare const query$h: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$h = z.infer<typeof query$h>;
type ListBankChecksValidation = {
    body: never;
    params: never;
    query: TQuery$h;
};

type ListBankChecksRouteConfig = ListBankChecksValidation & {
    files: never;
};
type ListBankChecksResponse = ResponseWithPagination<BankCheck>;

declare const listBankChecksByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListBankChecksByAdminRouteTypes = ListBankChecksRouteConfig & {
    response: APIResponse<ListBankChecksResponse>;
};

declare const query$g: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$g = z.infer<typeof query$g>;
type ListBankTransfersValidation = {
    body: never;
    params: never;
    query: TQuery$g;
};

type ListBankTransfersRouteConfig = ListBankTransfersValidation & {
    files: never;
};
type ListBankTransfersResponse = ResponseWithPagination<Omit<BankTransfer, "invoice"> & {
    phoneNumber: string | null;
}>;

declare const listBankTransfersByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListBankTransfersByAdminRouteTypes = ListBankTransfersRouteConfig & {
    response: APIResponse<ListBankTransfersResponse>;
};

declare const query$f: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$f = z.infer<typeof query$f>;
type ListPaymentTemplatesValidation = {
    body: never;
    params: never;
    query: TQuery$f;
};

type ListPaymentTemplatesRouteConfig = ListPaymentTemplatesValidation & {
    files: never;
};
type ListPaymentTemplatesResponse = ResponseWithPagination<PaymentTemplate>;

declare const listPaymentTemplatesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListPaymentTemplatesByAdminRouteTypes = ListPaymentTemplatesRouteConfig & {
    response: APIResponse<ListPaymentTemplatesResponse>;
};

declare const body$v: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    checkNumber: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    withdrawDate: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>>;
    bankName: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly NOT_USED: "not used";
        readonly USED: "used";
        readonly REJECTED: "rejected";
        readonly RETURNED: "returned";
    }>>;
}, "strip", z.ZodTypeAny, {
    fullName?: string | undefined;
    checkNumber?: string | undefined;
    phoneNumber?: string | null | undefined;
    withdrawDate?: string| null | undefined;
    bankName?: string | undefined;
    status?: "not used" | "used" | "rejected" | "returned" | undefined;
}, {
    fullName?: string | undefined;
    checkNumber?: string | undefined;
    phoneNumber?: string | null | undefined;
    withdrawDate?: string | string| null | undefined;
    bankName?: string | undefined;
    status?: "not used" | "used" | "rejected" | "returned" | undefined;
}>;
type TBody$v = z.infer<typeof body$v>;
declare const params$t: z.ZodObject<{
    bankCheckNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bankCheckNewId: string;
}, {
    bankCheckNewId: string;
}>;
type TParams$t = z.infer<typeof params$t>;
type UpdateBankCheckValidation = {
    body: TBody$v;
    params: TParams$t;
    query: never;
};

type UpdateBankCheckRouteConfig = UpdateBankCheckValidation & {
    files: never;
};
type UpdateBankCheckResponse = void;

declare const updateBankCheckByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateBankCheckByAdminRouteTypes = UpdateBankCheckRouteConfig & {
    response: APIResponse<UpdateBankCheckResponse>;
};

type StudentProfileDTO = {
    _id: string;
    newId: string;
    uniqueId: string | null;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phoneNumber: string | null;
    avatar: string;
    gender: string;
    birthDate: string| null;
    address1: string | null;
    address2: string | null;
    parents: UserProfileDTO[];
    classType: {
        _id: string;
        newId: string;
        name: string;
    };
    class: {
        _id: string;
        newId: string;
        name: string;
    } | null;
    level: {
        _id: string;
        newId: string;
        name: string;
    } | null;
    isEnrolled: boolean;
    groups: (EntityDto & {
        groupTypeName: string;
    })[];
    terms: {
        newId: string;
        _id: string;
        name: string;
        isLocked: boolean;
    }[];
    currentTermNewId: string | null;
    examGradeSystem: string | null;
    gradeReportTemplates: GradeReportTemplateDTO[];
    schoolYears: SchoolYearDto[];
    selectedSchoolYear: SchoolYearDto;
};

type GetStudentProfileValidation$1 = {
    body: never;
    params: never;
    query: never;
};

type GetStudentProfileRouteConfig$1 = GetStudentProfileValidation$1 & {
    files: never;
};
type GetStudentProfileResponse$1 = StudentProfileDTO;

declare const getStudentProfileRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetStudentProfileRouteTypes = GetStudentProfileRouteConfig$1 & {
    response: APIResponse<GetStudentProfileResponse$1>;
};

declare const body$u: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    parents: z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>;
    level: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    classType: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
    nextClassType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    uniqueId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    classType: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    parents: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    nextClassType?: ID$1 | undefined;
    uniqueId?: string | undefined;
}, {
    classType: string & {
        _isID: true;
    };
    level: string & {
        _isID: true;
    };
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    parents: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    nextClassType?: ID$1 | undefined;
    uniqueId?: string | undefined;
}>;
type TBody$u = z.infer<typeof body$u>;
type TAddStudentValidation = {
    params: never;
    query: never;
    body: TBody$u;
};

type AddStudentRouteConfig = TAddStudentValidation & {
    files: FilesInRequest<"avatar">;
};
type AddStudentResponse = void;

declare const addStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddStudentByAdminRouteTypes = AddStudentRouteConfig & {
    response: APIResponse<AddStudentResponse>;
};

type AttendanceCertificateDTO = {
    educationDepartment: string;
    establishmentTitle: TEstablishmentTitleEnum;
    schoolId: string;
    schoolName: string;
    schoolSubdomain: string;
    schoolYearName: string;
    student: {
        fullName: string;
        birthDate: string
        className: string;
    };
    directorName: string | null;
};

declare const params$s: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$s = z.infer<typeof params$s>;
type GetStudentAttendanceCertificateValidation = {
    body: never;
    params: TParams$s;
    query: never;
};

type GetStudentAttendanceCertificateRouteConfig = GetStudentAttendanceCertificateValidation & {
    files: never;
};
type GetStudentAttendanceCertificateResponse = AttendanceCertificateDTO;

declare const getStudentAttendanceCertificateByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentAttendanceCertificateByAdminRouteTypes = GetStudentAttendanceCertificateRouteConfig & {
    response: APIResponse<GetStudentAttendanceCertificateResponse>;
};

declare const params$r: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$r = z.infer<typeof params$r>;
declare const query$e: z.ZodObject<{
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    schoolYearId?: ID$1 | undefined;
}, {
    schoolYearId?: ID$1 | undefined;
}>;
type TQuery$e = z.infer<typeof query$e>;
type GetStudentProfileValidation = {
    body: never;
    params: TParams$r;
    query: TQuery$e;
};

type GetStudentProfileRouteConfig = GetStudentProfileValidation & {
    files: never;
};
type GetStudentProfileResponse = StudentProfileDTO;

declare const getStudentProfileByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetStudentProfileByAdminRouteTypes = GetStudentProfileRouteConfig & {
    response: APIResponse<GetStudentProfileResponse>;
};

declare const body$t: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        studentFirstName: z.ZodString;
        studentLastName: z.ZodString;
        studentGender: z.ZodNativeEnum<{
            readonly MALE: "male";
            readonly FEMALE: "female";
        }>;
        studentEmail: z.ZodOptional<z.ZodString>;
        studentPhoneNumber: z.ZodEffects<z.ZodEffects<z.ZodString, string | undefined, string>, string | undefined, string>;
        studentAddress: z.ZodOptional<z.ZodString>;
        studentLevel: z.ZodString;
        studentClassType: z.ZodString;
        parentFirstName: z.ZodString;
        parentLastName: z.ZodString;
        parentGender: z.ZodNativeEnum<{
            readonly MALE: "male";
            readonly FEMALE: "female";
        }>;
        parentEmail: z.ZodOptional<z.ZodString>;
        parentPhoneNumber: z.ZodEffects<z.ZodEffects<z.ZodString, string | undefined, string>, string | undefined, string>;
        parentAddress: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        parentFirstName: string;
        parentLastName: string;
        studentFirstName: string;
        studentLastName: string;
        studentGender: "male" | "female";
        studentLevel: string;
        studentClassType: string;
        parentGender: "male" | "female";
        studentEmail?: string | undefined;
        studentPhoneNumber?: string | undefined;
        studentAddress?: string | undefined;
        parentEmail?: string | undefined;
        parentPhoneNumber?: string | undefined;
        parentAddress?: string | undefined;
    }, {
        parentFirstName: string;
        parentLastName: string;
        parentPhoneNumber: string;
        studentFirstName: string;
        studentLastName: string;
        studentGender: "male" | "female";
        studentPhoneNumber: string;
        studentLevel: string;
        studentClassType: string;
        parentGender: "male" | "female";
        studentEmail?: string | undefined;
        studentAddress?: string | undefined;
        parentEmail?: string | undefined;
        parentAddress?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        parentFirstName: string;
        parentLastName: string;
        studentFirstName: string;
        studentLastName: string;
        studentGender: "male" | "female";
        studentLevel: string;
        studentClassType: string;
        parentGender: "male" | "female";
        studentEmail?: string | undefined;
        studentPhoneNumber?: string | undefined;
        studentAddress?: string | undefined;
        parentEmail?: string | undefined;
        parentPhoneNumber?: string | undefined;
        parentAddress?: string | undefined;
    }[];
}, {
    data: {
        parentFirstName: string;
        parentLastName: string;
        parentPhoneNumber: string;
        studentFirstName: string;
        studentLastName: string;
        studentGender: "male" | "female";
        studentPhoneNumber: string;
        studentLevel: string;
        studentClassType: string;
        parentGender: "male" | "female";
        studentEmail?: string | undefined;
        studentAddress?: string | undefined;
        parentEmail?: string | undefined;
        parentAddress?: string | undefined;
    }[];
}>;
type TBody$t = z.infer<typeof body$t>;
type ImportStudentsValidation = {
    body: TBody$t;
    params: never;
    query: never;
};

type ImportStudentsRouteConfig = ImportStudentsValidation & {
    files: never;
};
type ImportStudentsResponse = void;

declare const importStudentsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ImportStudentsByAdminRouteTypes = ImportStudentsRouteConfig & {
    response: APIResponse<ImportStudentsResponse>;
};

type StudentDto = BaseListUserDTO & {
    level: EntityDto;
    parents: UserProfileDTO[];
    classType: EntityDto;
    uniqueId: string | null;
};

declare const query$d: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female"]>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    classTypeNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    level?: ID$1 | undefined;
    gender?: "male" | "female" | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    classTypeNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    level?: ID$1 | undefined;
    gender?: "male" | "female" | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    classTypeNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$d = z.infer<typeof query$d>;
type ListStudentsValidation = {
    query: TQuery$d;
    params: never;
    body: never;
};

type ListStudentsRouteConfig = ListStudentsValidation & {
    files: never;
};
type ListStudentsResponse = ResponseWithPagination<StudentDto>;

declare const listStudentsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListStudentsByAdminRouteTypes = ListStudentsRouteConfig & {
    response: APIResponse<ListStudentsResponse>;
};

declare const query$c: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    classTypeNewId: z.ZodOptional<z.ZodString>;
    classNewId: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    classTypeNewId?: string | undefined;
    classNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    classTypeNewId?: string | undefined;
    classNewId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$c = z.infer<typeof query$c>;
type ListUnenrolledStudentsValidation = {
    body: never;
    params: never;
    query: TQuery$c;
};

type ListUnenrolledStudentsRouteConfig = ListUnenrolledStudentsValidation & {
    files: never;
};
type ListUnenrolledStudentsResponse = ResponseWithPagination<{
    _id: ID$1;
    newId: string;
    fullName: string;
    avatar: string;
    gender: string;
    phoneNumber: string | null;
    email: string | null;
}>;

declare const listUnenrolledStudentsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListUnenrolledStudentsByAdminRouteTypes = ListUnenrolledStudentsRouteConfig & {
    response: APIResponse<ListUnenrolledStudentsResponse>;
};

declare const body$s: z.ZodObject<{
    classNewId: z.ZodString;
    studentNewIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    studentNewIds: string[];
    classNewId: string;
}, {
    studentNewIds: string[];
    classNewId: string;
}>;
type TBody$s = z.infer<typeof body$s>;
type SwitchStudentsClassValidation = {
    body: TBody$s;
    params: never;
    query: never;
};

type SwitchStudentsClassRouteConfig = SwitchStudentsClassValidation & {
    files: never;
};
type SwitchStudentsClassResponse = void;

declare const switchStudentsClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type SwitchStudentsClassByAdminRouteTypes = SwitchStudentsClassRouteConfig & {
    response: APIResponse<SwitchStudentsClassResponse>;
};

declare const body$r: z.ZodObject<{
    userType: z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly TEACHER: "teacher";
        readonly STUDENT: "student";
        readonly PARENT: "parent";
        readonly MASTER: "master";
    }>;
    userNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userType: "admin" | "teacher" | "student" | "parent" | "master";
    userNewId: string;
}, {
    userType: "admin" | "teacher" | "student" | "parent" | "master";
    userNewId: string;
}>;
type TBody$r = z.infer<typeof body$r>;
type ToggleUserActivationValidation = {
    body: TBody$r;
    params: never;
    query: never;
};

type ToggleUserActivationRouteConfig = ToggleUserActivationValidation & {
    files: never;
};
type ToggleUserActivationResponse = void;

declare const toggleUserActivationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ToggleUserActivationByAdminRouteTypes = ToggleUserActivationRouteConfig & {
    response: APIResponse<ToggleUserActivationResponse>;
};

declare const body$q: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    address1: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address2: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    note: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    level: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    classType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    parents: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>>;
    uniqueId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    note?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string| undefined;
    email?: string | null | undefined;
    level?: ID$1 | undefined;
    classType?: ID$1 | undefined;
    parents?: ID$1[] | undefined;
    uniqueId?: string | null | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    note?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string | string| undefined;
    email?: string | null | undefined;
    level?: ID$1 | undefined;
    classType?: ID$1 | undefined;
    parents?: ID$1[] | undefined;
    uniqueId?: string | null | undefined;
}>;
type TBody$q = z.infer<typeof body$q>;
declare const params$q: z.ZodObject<{
    studentNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    studentNewId: string;
}, {
    studentNewId: string;
}>;
type TParams$q = z.infer<typeof params$q>;
type UpdateStudentValidation = {
    body: TBody$q;
    params: TParams$q;
    query: never;
};

type UpdateStudentRouteConfig = UpdateStudentValidation & {
    files: FilesInRequest<"avatar">;
};
type UpdateStudentResponse = void;

declare const updateStudentByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateStudentByAdminRouteTypes = UpdateStudentRouteConfig & {
    response: APIResponse<UpdateStudentResponse>;
};

declare const body$p: z.ZodObject<{
    name: z.ZodString;
    hasSections: z.ZodBoolean;
    levelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    hasSections: boolean;
    levelNewId: string;
}, {
    name: string;
    hasSections: boolean;
    levelNewId: string;
}>;
type TBody$p = z.infer<typeof body$p>;
type AddSubLevelValidation = {
    body: TBody$p;
    params: never;
    query: never;
};

type AddSubLevelRouteConfig = AddSubLevelValidation & {
    files: never;
};
type AddSubLevelResponse = void;

declare const addSubLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSubLevelByAdminRouteTypes = AddSubLevelRouteConfig & {
    response: APIResponse<AddSubLevelResponse>;
};

declare const params$p: z.ZodObject<{
    subLevelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subLevelNewId: string;
}, {
    subLevelNewId: string;
}>;
type TParams$p = z.infer<typeof params$p>;
type DeleteSubLevelValidation = {
    body: never;
    params: TParams$p;
    query: never;
};

type DeleteSubLevelRouteConfig = DeleteSubLevelValidation & {
    files: never;
};
type DeleteSubLevelResponse = void;

declare const deleteSubLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSubLevelByAdminRouteTypes = DeleteSubLevelRouteConfig & {
    response: APIResponse<DeleteSubLevelResponse>;
};

declare const query$b: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    hasSections: z.ZodOptional<z.ZodBoolean>;
    levelNewIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    hasSections?: boolean | undefined;
    levelNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    hasSections?: boolean | undefined;
    levelNewIds?: string[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$b = z.infer<typeof query$b>;
type ListSubLevelsValidation = {
    body: never;
    params: never;
    query: TQuery$b;
};

type ListSubLevelsRouteConfig = ListSubLevelsValidation & {
    files: never;
};
type ListSubLevelsResponse = ResponseWithPagination<SubLevel>;

declare const listSubLevelsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSubLevelsByAdminRouteTypes = ListSubLevelsRouteConfig & {
    response: APIResponse<ListSubLevelsResponse>;
};

declare const body$o: z.ZodObject<{
    newRank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newRank: number;
}, {
    newRank: number;
}>;
type TBody$o = z.infer<typeof body$o>;
declare const params$o: z.ZodObject<{
    subLevelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subLevelNewId: string;
}, {
    subLevelNewId: string;
}>;
type TParams$o = z.infer<typeof params$o>;
type ReorderSubLevelsValidation = {
    body: TBody$o;
    params: TParams$o;
    query: never;
};

type ReorderSubLevelsRouteConfig = ReorderSubLevelsValidation & {
    files: never;
};
type ReorderSubLevelsResponse = void;

declare const reorderSubLevelsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ReorderSubLevelsByAdminRouteTypes = ReorderSubLevelsRouteConfig & {
    response: APIResponse<ReorderSubLevelsResponse>;
};

declare const body$n: z.ZodObject<{
    name: z.ZodString;
    hasSections: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    hasSections: boolean;
}, {
    name: string;
    hasSections: boolean;
}>;
type TBody$n = z.infer<typeof body$n>;
declare const params$n: z.ZodObject<{
    subLevelNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subLevelNewId: string;
}, {
    subLevelNewId: string;
}>;
type TParams$n = z.infer<typeof params$n>;
type UpdateSubLevelValidation = {
    body: TBody$n;
    params: TParams$n;
    query: never;
};

type UpdateSubLevelRouteConfig = UpdateSubLevelValidation & {
    files: never;
};
type UpdateSubLevelResponse = void;

declare const updateSubLevelByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSubLevelByAdminRouteTypes = UpdateSubLevelRouteConfig & {
    response: APIResponse<UpdateSubLevelResponse>;
};

declare const body$m: z.ZodObject<{
    name: z.ZodString;
    preferredStartingHours: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    illustration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    illustration: string;
    preferredStartingHours?: number[] | undefined;
}, {
    name: string;
    illustration: string;
    preferredStartingHours?: number[] | undefined;
}>;
type TBody$m = z.infer<typeof body$m>;
type AddSubSubjectTypeValidation = {
    body: TBody$m;
    params: never;
    query: never;
};

type AddSubSubjectTypeRouteConfig = AddSubSubjectTypeValidation & {
    files: never;
};
type AddSubSubjectTypeResponse = void;

declare const addSubSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSubSubjectTypeByAdminRouteTypes = AddSubSubjectTypeRouteConfig & {
    response: APIResponse<AddSubSubjectTypeResponse>;
};

declare const params$m: z.ZodObject<{
    subSubjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subSubjectTypeNewId: string;
}, {
    subSubjectTypeNewId: string;
}>;
type TParams$m = z.infer<typeof params$m>;
type DeleteSubSubjectTypeValidation = {
    body: never;
    params: TParams$m;
    query: never;
};

type DeleteSubSubjectTypeRouteConfig = DeleteSubSubjectTypeValidation & {
    files: never;
};
type DeleteSubSubjectTypeResponse = void;

declare const deleteSubSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSubSubjectTypeByAdminRouteTypes = DeleteSubSubjectTypeRouteConfig & {
    response: APIResponse<DeleteSubSubjectTypeResponse>;
};

type SubSubjectTypeDto = {
    name: string;
    newId: string;
    _id: ID$1;
    preferredStartingHours: number[];
    illustration: string;
};

declare const query$a: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$a = z.infer<typeof query$a>;
type ListSubSubjectTypesValidation = {
    body: never;
    params: never;
    query: TQuery$a;
};

type ListSubSubjectTypesRouteConfig = ListSubSubjectTypesValidation & {
    files: never;
};
type ListSubSubjectTypesResponse = ResponseWithPagination<SubSubjectTypeDto>;

declare const listSubSubjectTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSubSubjectTypesByAdminRouteTypes = ListSubSubjectTypesRouteConfig & {
    response: APIResponse<ListSubSubjectTypesResponse>;
};

declare const body$l: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    preferredStartingHours: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    illustration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    preferredStartingHours?: number[] | undefined;
    illustration?: string | undefined;
}, {
    name?: string | undefined;
    preferredStartingHours?: number[] | undefined;
    illustration?: string | undefined;
}>;
type TBody$l = z.infer<typeof body$l>;
declare const params$l: z.ZodObject<{
    subSubjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subSubjectTypeNewId: string;
}, {
    subSubjectTypeNewId: string;
}>;
type TParams$l = z.infer<typeof params$l>;
type UpdateSubSubjectTypeValidation = {
    body: TBody$l;
    params: TParams$l;
    query: never;
};

type UpdateSubSubjectTypeRouteConfig = UpdateSubSubjectTypeValidation & {
    files: never;
};
type UpdateSubSubjectTypeResponse = void;

declare const updateSubSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSubSubjectTypeByAdminRouteTypes = UpdateSubSubjectTypeRouteConfig & {
    response: APIResponse<UpdateSubSubjectTypeResponse>;
};

declare const body$k: z.ZodObject<{
    name: z.ZodString;
    preferredStartingHours: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    illustration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    illustration: string;
    preferredStartingHours?: number[] | undefined;
}, {
    name: string;
    illustration: string;
    preferredStartingHours?: number[] | undefined;
}>;
type TBody$k = z.infer<typeof body$k>;
type AddSubjectTypeValidation = {
    body: TBody$k;
    params: never;
    query: never;
};

type AddSubjectTypeRouteConfig = AddSubjectTypeValidation & {
    files: never;
};
type AddSubjectTypeResponse = void;

declare const addSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSubjectTypeByAdminRouteTypes = AddSubjectTypeRouteConfig & {
    response: APIResponse<AddSubjectTypeResponse>;
};

declare const params$k: z.ZodObject<{
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subjectTypeNewId: string;
}, {
    subjectTypeNewId: string;
}>;
type TParams$k = z.infer<typeof params$k>;
type DeleteSubjectTypeValidation = {
    body: never;
    params: TParams$k;
    query: never;
};

type DeleteSubjectTypeRouteConfig = DeleteSubjectTypeValidation & {
    files: never;
};
type DeleteSubjectTypeResponse = void;

declare const deleteSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteSubjectTypeByAdminRouteTypes = DeleteSubjectTypeRouteConfig & {
    response: APIResponse<DeleteSubjectTypeResponse>;
};

declare const query$9: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$9 = z.infer<typeof query$9>;
type ListSubjectTypesValidation = {
    body: never;
    params: never;
    query: TQuery$9;
};

type ListSubjectTypesRouteConfig = ListSubjectTypesValidation & {
    files: never;
};
type ListSubjectTypesResponse = ResponseWithPagination<SubjectType>;

declare const listSubjectTypesByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSubjectTypesByAdminRouteTypes = ListSubjectTypesRouteConfig & {
    response: APIResponse<ListSubjectTypesResponse>;
};

declare const body$j: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    preferredStartingHours: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    illustration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    preferredStartingHours?: number[] | undefined;
    illustration?: string | undefined;
}, {
    name?: string | undefined;
    preferredStartingHours?: number[] | undefined;
    illustration?: string | undefined;
}>;
type TBody$j = z.infer<typeof body$j>;
declare const params$j: z.ZodObject<{
    subjectTypeNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    subjectTypeNewId: string;
}, {
    subjectTypeNewId: string;
}>;
type TParams$j = z.infer<typeof params$j>;
type UpdateSubjectTypeValidation = {
    body: TBody$j;
    params: TParams$j;
    query: never;
};

type UpdateSubjectTypeRouteConfig = UpdateSubjectTypeValidation & {
    files: never;
};
type UpdateSubjectTypeResponse = void;

declare const updateSubjectTypeByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSubjectTypeByAdminRouteTypes = UpdateSubjectTypeRouteConfig & {
    response: APIResponse<UpdateSubjectTypeResponse>;
};

declare const body$i: z.ZodObject<{
    expenses: z.ZodArray<z.ZodString, "many">;
    name: z.ZodString;
    fiscalCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    expenses: string[];
    fiscalCode?: string | undefined;
}, {
    name: string;
    expenses: string[];
    fiscalCode?: string | undefined;
}>;
type TBody$i = z.infer<typeof body$i>;
type AddSupplierValidation = {
    body: TBody$i;
    query: never;
    params: never;
};

type AddSupplierRouteConfig = AddSupplierValidation & {
    files: never;
};
type AddSupplierResponse = void;

declare const addSupplierByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddSupplierByAdminRouteTypes = AddSupplierRouteConfig & {
    response: APIResponse<AddSupplierResponse>;
};

declare const body$h: z.ZodObject<{
    newIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    newIds: string[];
}, {
    newIds: string[];
}>;
type TBody$h = z.infer<typeof body$h>;
type DeleteSuppliersValidation = {
    body: TBody$h;
    params: never;
    query: never;
};

type DeleteSuppliersRouteConfig = DeleteSuppliersValidation & {
    files: never;
};
type DeleteSuppliersResponse = void;

declare const deleteSuppliersByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type DeleteSuppliersByAdminRouteTypes = DeleteSuppliersRouteConfig & {
    response: APIResponse<DeleteSuppliersResponse>;
};

declare const query$8: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    expenseId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    expenseId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    expenseId?: ID$1 | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$8 = z.infer<typeof query$8>;
type ListSuppliersValidation = {
    body: never;
    params: never;
    query: TQuery$8;
};

type ListSuppliersRouteConfig = ListSuppliersValidation & {
    files: never;
};
type ListSuppliersResponse = ResponseWithPagination<Omit<Supplier, "expenses"> & {
    expenses: Expense[];
}>;

declare const listSuppliersByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListSuppliersByAdminRouteTypes = ListSuppliersRouteConfig & {
    response: APIResponse<ListSuppliersResponse>;
};

declare const body$g: z.ZodObject<{
    expenses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    name: z.ZodOptional<z.ZodString>;
    fiscalCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    expenses?: string[] | undefined;
    name?: string | undefined;
    fiscalCode?: string | undefined;
}, {
    expenses?: string[] | undefined;
    name?: string | undefined;
    fiscalCode?: string | undefined;
}>;
type TBody$g = z.infer<typeof body$g>;
declare const params$i: z.ZodObject<{
    supplierNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    supplierNewId: string;
}, {
    supplierNewId: string;
}>;
type TParams$i = z.infer<typeof params$i>;
type UpdateSupplierValidation = {
    body: TBody$g;
    params: TParams$i;
    query: never;
};

type UpdateSupplierRouteConfig = UpdateSupplierValidation & {
    files: never;
};
type UpdateSupplierResponse = void;

declare const updateSupplierByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateSupplierByAdminRouteTypes = UpdateSupplierRouteConfig & {
    response: APIResponse<UpdateSupplierResponse>;
};

declare const body$f: z.ZodObject<{
    paymentType: z.ZodNativeEnum<{
        readonly HOURLY: "hourly";
        readonly SALARY: "salary";
    }>;
    contractType: z.ZodString;
    amount: z.ZodNumber;
    bankAccountId: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string | null | undefined, string | null | undefined>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    paymentType: "salary" | "hourly";
    contractType: string;
    bankAccountId?: string | null | undefined;
}, {
    amount: number;
    paymentType: "salary" | "hourly";
    contractType: string;
    bankAccountId?: string | null | undefined;
}>;
type TBody$f = z.infer<typeof body$f>;
declare const params$h: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$h = z.infer<typeof params$h>;
type AddTeacherPaymentConfigurationValidation = {
    body: TBody$f;
    params: TParams$h;
    query: never;
};

type AddTeacherPaymentConfigurationRouteConfig = AddTeacherPaymentConfigurationValidation & {
    files: FilesInRequest<"attachment">;
};
type AddTeacherPaymentConfigurationResponse = void;

declare const addTeacherPaymentConfigurationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddTeacherPaymentConfigurationByAdminRouteTypes = AddTeacherPaymentConfigurationRouteConfig & {
    response: APIResponse<AddTeacherPaymentConfigurationResponse>;
};

declare const body$e: z.ZodObject<{
    month: z.ZodDefault<z.ZodNumber>;
    year: z.ZodDefault<z.ZodNumber>;
    name: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodNativeEnum<{
        readonly PENALTY: "penalty";
        readonly BONUS: "bonus";
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "penalty" | "bonus";
    month: number;
    amount: number;
    year: number;
}, {
    name: string;
    type: "penalty" | "bonus";
    amount: number;
    month?: number | undefined;
    year?: number | undefined;
}>;
type TBody$e = z.infer<typeof body$e>;
declare const params$g: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$g = z.infer<typeof params$g>;
type AddTeacherPaymentTransactionValidation = {
    body: TBody$e;
    params: TParams$g;
    query: never;
};

type AddTeacherPaymentTransactionRouteConfig = AddTeacherPaymentTransactionValidation & {
    files: never;
};
type AddTeacherPaymentTransactionResponse = void;

declare const addTeacherPaymentTransactionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type AddTeacherPaymentTransactionByAdminRouteTypes = AddTeacherPaymentTransactionRouteConfig & {
    response: APIResponse<AddTeacherPaymentTransactionResponse>;
};

declare const body$d: z.ZodObject<{
    transactionId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    transactionId: string & {
        _isID: true;
    };
}, {
    transactionId: string & {
        _isID: true;
    };
}>;
type TBody$d = z.infer<typeof body$d>;
declare const params$f: z.ZodObject<{
    teacherPaymentId: z.ZodType<ID$1, z.ZodTypeDef, ID$1>;
}, "strip", z.ZodTypeAny, {
    teacherPaymentId: string & {
        _isID: true;
    };
}, {
    teacherPaymentId: string & {
        _isID: true;
    };
}>;
type TParams$f = z.infer<typeof params$f>;
type DeleteTeacherPaymentTransactionValidation = {
    body: TBody$d;
    params: TParams$f;
    query: never;
};

type DeleteTeacherPaymentTransactionRouteConfig = DeleteTeacherPaymentTransactionValidation & {
    files: never;
};
type DeleteTeacherPaymentTransactionResponse = void;

declare const deleteTeacherPaymentTransactionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteTeacherPaymentTransactionByAdminRouteTypes = DeleteTeacherPaymentTransactionRouteConfig & {
    response: APIResponse<DeleteTeacherPaymentTransactionResponse>;
};

declare const params$e: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$e = z.infer<typeof params$e>;
type GetTeacherPaymentConfigurationValidation = {
    body: never;
    params: TParams$e;
    query: never;
};

type GetTeacherPaymentConfigurationRouteConfig = GetTeacherPaymentConfigurationValidation & {
    files: never;
};
type GetTeacherPaymentConfigurationResponse = {
    contractType: string;
    amount: number;
    attachment: {
        public_id: string;
        url: string;
        name: string;
    }[];
    paymentType: TPaymentTypeEnum;
    bankAccountId: string | null;
};

declare const getTeacherPaymentConfigurationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTeacherPaymentConfigurationByAdminRouteTypes = GetTeacherPaymentConfigurationRouteConfig & {
    response: APIResponse<GetTeacherPaymentConfigurationResponse>;
};

type transactionAdjustmentResponse = {
    _id?: ID$1;
    name: string;
    amount: number;
    type: TTransactionAdjustmentTypeEnum;
    insertedAt: string
    teacherPaymentId: ID$1;
    paidBy: UserProfileDTO;
};
type ConfiguredTeacherPaymentDashboardResponse = {
    paymentInformation: {
        finalAmount: number;
        hasPaid: boolean;
    };
    isPaymentConfigured: true;
    teacherInformation: {
        paymentType: TPaymentTypeEnum;
        amount: number;
        bankAccountId: string | null;
        subject: string;
    } & UserProfileDTO;
    transactions: transactionAdjustmentResponse[];
    hourDistribution: {
        tag: TSessionStatusEnum;
        percentage: number;
    }[];
};
type NotConfiguredTeacherPaymentResponse = {
    isPaymentConfigured: false;
    teacherInformation: {
        subject: string | null;
    } & UserProfileDTO;
};
type getTeacherPaymentDashboardResponse = ConfiguredTeacherPaymentDashboardResponse | NotConfiguredTeacherPaymentResponse;

declare const params$d: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$d = z.infer<typeof params$d>;
declare const query$7: z.ZodObject<{
    month: z.ZodDefault<z.ZodNumber>;
    year: z.ZodDefault<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    month: z.ZodDefault<z.ZodNumber>;
    year: z.ZodDefault<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    month: z.ZodDefault<z.ZodNumber>;
    year: z.ZodDefault<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
type TQuery$7 = z.infer<typeof query$7>;
type GetTeacherPaymentDashboardValidation = {
    body: never;
    params: TParams$d;
    query: TQuery$7;
};

type GetTeacherPaymentDashboardRouteConfig = GetTeacherPaymentDashboardValidation & {
    files: never;
};
type GetTeacherPaymentDashboardResponse = getTeacherPaymentDashboardResponse;

declare const getTeacherPaymentDashboardByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTeacherPaymentDashboardByAdminRouteTypes = GetTeacherPaymentDashboardRouteConfig & {
    response: APIResponse<GetTeacherPaymentDashboardResponse>;
};

declare const params$c: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$c = z.infer<typeof params$c>;
declare const query$6: z.ZodObject<{
    month: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    year: z.ZodDefault<z.ZodNumber>;
    attendanceStatus: z.ZodOptional<z.ZodNativeEnum<{
        readonly PRESENT: "present";
        readonly ABSENT: "absent";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    year: number;
    month?: number | undefined;
    attendanceStatus?: "present" | "absent" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    month?: number | undefined;
    year?: number | undefined;
    attendanceStatus?: "present" | "absent" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$6 = z.infer<typeof query$6>;
type ListTeacherSessionsValidation = {
    body: never;
    params: TParams$c;
    query: TQuery$6;
};

type ListTeacherSessionsRouteConfig = ListTeacherSessionsValidation & {
    files: never;
};
type ListTeacherSessionsResponse = ResponseWithPagination<{
    _id: string;
    newId: string;
    sessionType: string;
    sessionDate: string;
    className: string;
    status: string;
}>;

declare const listTeacherSessionsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type ListTeacherSessionsByAdminRouteTypes = ListTeacherSessionsRouteConfig & {
    response: APIResponse<ListTeacherSessionsResponse>;
};

declare const body$c: z.ZodEffects<z.ZodObject<{
    month: z.ZodNumber;
    year: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    month: number;
    year: number;
}, {
    month: number;
    year: number;
}>, {
    month: number;
    year: number;
}, {
    month: number;
    year: number;
}>;
type TBody$c = z.infer<typeof body$c>;
declare const params$b: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$b = z.infer<typeof params$b>;
type PayTeacherValidation = {
    body: TBody$c;
    params: TParams$b;
    query: never;
};

type PayTeacherRouteConfig = PayTeacherValidation & {
    files: never;
};
type PayTeacherResponse = void;

declare const payTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type PayTeacherByAdminRouteTypes = PayTeacherRouteConfig & {
    response: APIResponse<PayTeacherResponse>;
};

declare const body$b: z.ZodObject<{
    month: z.ZodNumber;
    year: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    month: number;
    year: number;
}, {
    month: number;
    year: number;
}>;
type TBody$b = z.infer<typeof body$b>;
declare const params$a: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$a = z.infer<typeof params$a>;
type UnPayTeacherValidation = {
    body: TBody$b;
    params: TParams$a;
    query: never;
};

type UnPayTeacherRouteConfig = UnPayTeacherValidation & {
    files: never;
};
type UnPayTeacherResponse = void;

declare const unPayTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UnPayTeacherByAdminRouteTypes = UnPayTeacherRouteConfig & {
    response: APIResponse<UnPayTeacherResponse>;
};

declare const body$a: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    paymentType: z.ZodOptional<z.ZodNativeEnum<{
        readonly HOURLY: "hourly";
        readonly SALARY: "salary";
    }>>;
    contractType: z.ZodOptional<z.ZodString>;
    bankAccountId: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string | null | undefined, string | null | undefined>>;
    deletedAttachment: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
    paymentType?: "salary" | "hourly" | undefined;
    contractType?: string | undefined;
    bankAccountId?: string | null | undefined;
    deletedAttachment?: string[] | undefined;
}, {
    amount?: number | undefined;
    paymentType?: "salary" | "hourly" | undefined;
    contractType?: string | undefined;
    bankAccountId?: string | null | undefined;
    deletedAttachment?: string[] | undefined;
}>;
type TBody$a = z.infer<typeof body$a>;
declare const params$9: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$9 = z.infer<typeof params$9>;
type UpdateTeacherPaymentConfigurationValidation = {
    body: TBody$a;
    params: TParams$9;
    query: never;
};

type UpdateTeacherPaymentConfigurationRouteConfig = UpdateTeacherPaymentConfigurationValidation & {
    files: FilesInRequest<"attachment">;
};
type UpdateTeacherPaymentConfigurationResponse = void;

declare const updateTeacherPaymentConfigurationByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTeacherPaymentConfigurationByAdminRouteTypes = UpdateTeacherPaymentConfigurationRouteConfig & {
    response: APIResponse<UpdateTeacherPaymentConfigurationResponse>;
};

type TeacherProfileDTO = {
    _id: string;
    newId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber: string | null;
    email: string | null;
    gender: string;
    birthDate: string| null;
    avatar: string;
    address1: string | null;
    address2: string | null;
    subjectTypes: EntityDto[];
    groupTypes: EntityDto[];
    classes: ClassDTO[];
    isPaymentConfigured: boolean;
    topics: EntityDto[];
    roles: EntityDto[];
    notAvailableTimes: {
        day: number;
        hours: number[];
    }[];
    levels: EntityDto[];
    maxDaysPerWeek: number | null;
    maxHoursPerDay: number | null;
    maxGapsPerDay: number | null;
    preferredClassroom: {
        _id: ID$1;
        newId: string;
        name: string;
    } | null;
    schoolYears: SchoolYearDto[];
    selectedSchoolYear: SchoolYearDto;
};

type GetTeacherProfileValidation$1 = {
    body: never;
    params: never;
    query: never;
};

type GetTeacherProfileRouteConfig$1 = GetTeacherProfileValidation$1 & {
    files: never;
};
type GetTeacherProfileResponse$1 = TeacherProfileDTO;

declare const getTeacherProfileRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetTeacherProfileRouteTypes = GetTeacherProfileRouteConfig$1 & {
    response: APIResponse<GetTeacherProfileResponse$1>;
};

declare const body$9: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    address1: z.ZodOptional<z.ZodString>;
    address2: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    levels: z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>;
    subjectTypes: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>>;
    groupTypes: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>>;
    roles: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    levels: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    roles?: ID$1[] | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    levels: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    roles?: ID$1[] | undefined;
}>, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    levels: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    roles?: ID$1[] | undefined;
}, {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    password: string;
    levels: ID$1[];
    email?: string | undefined;
    phoneNumber?: string | undefined;
    birthDate?: string | string| undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    roles?: ID$1[] | undefined;
}>;
type TBody$9 = z.infer<typeof body$9>;
type AddTeacherValidation = {
    body: TBody$9;
    params: never;
    query: never;
};

type AddTeacherRouteConfig = AddTeacherValidation & {
    files: FilesInRequest<"avatar">;
};
type AddTeacherResponse = void;

declare const addTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddTeacherByAdminRouteTypes = AddTeacherRouteConfig & {
    response: APIResponse<AddTeacherResponse>;
};

declare const params$8: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$8 = z.infer<typeof params$8>;
declare const query$5: z.ZodObject<{
    schoolYearId: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
}, "strip", z.ZodTypeAny, {
    schoolYearId?: ID$1 | undefined;
}, {
    schoolYearId?: ID$1 | undefined;
}>;
type TQuery$5 = z.infer<typeof query$5>;
type GetTeacherProfileValidation = {
    body: never;
    params: TParams$8;
    query: TQuery$5;
};

type GetTeacherProfileRouteConfig = GetTeacherProfileValidation & {
    files: never;
};
type GetTeacherProfileResponse = TeacherProfileDTO;

declare const getTeacherProfileByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type GetTeacherProfileByAdminRouteTypes = GetTeacherProfileRouteConfig & {
    response: APIResponse<GetTeacherProfileResponse>;
};

type TeacherDTO = BaseListUserDTO & {
    levels: EntityDto[];
    groupTypes: EntityDto[];
    subjectTypes: EntityDto[];
    roles: EntityDto[];
    topics: EntityDto[];
};

declare const query$4: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    subjectType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    groupType: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    level: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    subjectType?: ID$1 | undefined;
    groupType?: ID$1 | undefined;
    level?: ID$1 | undefined;
    gender?: "male" | "female" | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    subjectType?: ID$1 | undefined;
    groupType?: ID$1 | undefined;
    level?: ID$1 | undefined;
    gender?: "male" | "female" | undefined;
    isArchived?: boolean | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$4 = z.infer<typeof query$4>;
type ListTeachersValidation = {
    body: never;
    params: never;
    query: TQuery$4;
};

type ListTeachersRouteConfig = ListTeachersValidation & {
    files: never;
};
type ListTeachersResponse = ResponseWithPagination<TeacherDTO>;

declare const listTeachersByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListTeachersByAdminRouteTypes = ListTeachersRouteConfig & {
    response: APIResponse<ListTeachersResponse>;
};

declare const body$8: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodNativeEnum<{
        readonly MALE: "male";
        readonly FEMALE: "female";
    }>>;
    address1: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address2: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phoneNumber: z.ZodNullable<z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodDate, z.ZodString]>, string | Date, string | Date>, Date, string | Date>>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    classTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    subjectTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    groupTypes: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    levels: z.ZodOptional<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">>;
    notAvailableTimes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodArray<z.ZodNumber, "many">;
        isAvailable: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }, {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }>, "many">>;
    roles: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<ID$1, z.ZodTypeDef, ID$1>, "many">, ID$1[], ID$1[]>>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string| undefined;
    email?: string | null | undefined;
    classTypes?: ID$1[] | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    levels?: ID$1[] | undefined;
    notAvailableTimes?: {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }[] | undefined;
    roles?: ID$1[] | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    gender?: "male" | "female" | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    birthDate?: string | string| undefined;
    email?: string | null | undefined;
    classTypes?: ID$1[] | undefined;
    subjectTypes?: ID$1[] | undefined;
    groupTypes?: ID$1[] | undefined;
    levels?: ID$1[] | undefined;
    notAvailableTimes?: {
        day: number;
        hours: number[];
        isAvailable: boolean;
    }[] | undefined;
    roles?: ID$1[] | undefined;
}>;
type TBody$8 = z.infer<typeof body$8>;
declare const params$7: z.ZodObject<{
    teacherNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    teacherNewId: string;
}, {
    teacherNewId: string;
}>;
type TParams$7 = z.infer<typeof params$7>;
type UpdateTeacherValidation = {
    body: TBody$8;
    params: TParams$7;
    query: never;
};

type UpdateTeacherRouteConfig = UpdateTeacherValidation & {
    files: FilesInRequest<"avatar">;
};
type UpdateTeacherResponse = void;

declare const updateTeacherByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTeacherByAdminRouteTypes = UpdateTeacherRouteConfig & {
    response: APIResponse<UpdateTeacherResponse>;
};

declare const body$7: z.ZodObject<{
    name: z.ZodString;
    coefficient: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    coefficient: number;
}, {
    name: string;
    coefficient: number;
}>;
type TBody$7 = z.infer<typeof body$7>;
type AddTermValidation = {
    body: TBody$7;
    params: never;
    query: never;
};

type AddTermRouteConfig = AddTermValidation & {
    files: never;
};
type AddTermResponse = void;

declare const addTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddTermByAdminRouteTypes = AddTermRouteConfig & {
    response: APIResponse<AddTermResponse>;
};

declare const params$6: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TParams$6 = z.infer<typeof params$6>;
type DeleteTermValidation = {
    body: never;
    params: TParams$6;
    query: never;
};

type DeleteTermRouteConfig = DeleteTermValidation & {
    files: never;
};
type DeleteTermResponse = void;

declare const deleteTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteTermByAdminRouteTypes = DeleteTermRouteConfig & {
    response: APIResponse<DeleteTermResponse>;
};

declare const query$3: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$3 = z.infer<typeof query$3>;
type ListTermValidation = {
    body: never;
    params: never;
    query: TQuery$3;
};

type ListTermRouteConfig = ListTermValidation & {
    files: never;
};
type ListTermResponse = ResponseWithPagination<Term>;

declare const listTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListTermByAdminRouteTypes = ListTermRouteConfig & {
    response: APIResponse<ListTermResponse>;
};

declare const body$6: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    coefficient: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    coefficient?: number | undefined;
}, {
    name?: string | undefined;
    coefficient?: number | undefined;
}>;
type TBody$6 = z.infer<typeof body$6>;
declare const params$5: z.ZodObject<{
    termNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    termNewId: string;
}, {
    termNewId: string;
}>;
type TParams$5 = z.infer<typeof params$5>;
type UpdateTermValidation = {
    body: TBody$6;
    params: TParams$5;
    query: never;
};

type UpdateTermRouteConfig = UpdateTermValidation & {
    files: never;
};
type UpdateTermResponse = void;

declare const updateTermByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTermByAdminRouteTypes = UpdateTermRouteConfig & {
    response: APIResponse<UpdateTermResponse>;
};

declare const query$2: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodType<ID$1, z.ZodTypeDef, ID$1>>;
    description: z.ZodOptional<z.ZodString>;
    transactionType: z.ZodOptional<z.ZodNativeEnum<{
        readonly EXPENSE: "expense";
        readonly SERVICE: "service";
    }>>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    level?: ID$1 | undefined;
    description?: string | undefined;
    transactionType?: "service" | "expense" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    level?: ID$1 | undefined;
    description?: string | undefined;
    transactionType?: "service" | "expense" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery$2 = z.infer<typeof query$2>;
type ListTransactionsValidation = {
    body: never;
    params: never;
    query: TQuery$2;
};

type ListTransactionsRouteConfig = ListTransactionsValidation & {
    files: never;
};
type ListTransactionsResponse = ResponseWithPagination<{
    _id: ID$1;
    name: string;
    amount: number;
    transactionType: TTransactionTypeEnum;
    level: {
        _id: ID$1;
        name: string;
    };
    paidAt: string
    supplier: {
        _id: ID$1;
        newId: string;
        name: string;
    } | null;
    createdAt: string
    createdBy: {
        _id: ID$1;
        newId: string;
        fullName: string;
        avatar: string;
        role: string;
    };
}>;

declare const listTransactionsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListTransactionsByAdminRouteTypes = ListTransactionsRouteConfig & {
    response: APIResponse<ListTransactionsResponse>;
};

type TutorialDto = {
    title: string;
    newId: string;
    _id: ID$1;
    link: string;
    interfaceKeys: string[];
};

declare const query$1: z.ZodObject<{
    interfaceKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    interfaceKey: string;
}, {
    interfaceKey: string;
}>;
type TQuery$1 = z.infer<typeof query$1>;
type GetTutorialValidation = {
    body: never;
    params: never;
    query: TQuery$1;
};

type GetTutorialsRouteConfig = GetTutorialValidation & {
    files: never;
};
type GetTutorialsResponse = TutorialDto[];

declare const getTutorialsByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type GetTutorialsByAdminRouteTypes = GetTutorialsRouteConfig & {
    response: APIResponse<GetTutorialsResponse>;
};

declare const body$5: z.ZodObject<{
    title: z.ZodString;
    link: z.ZodString;
    interfaceKeys: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    link: string;
    title: string;
    interfaceKeys: string[];
}, {
    link: string;
    title: string;
    interfaceKeys: string[];
}>;
type TBody$5 = z.infer<typeof body$5>;
type AddTutorialValidation = {
    body: TBody$5;
    params: never;
    query: never;
};

type AddTutorialRouteConfig = AddTutorialValidation & {
    files: never;
};
type AddTutorialResponse = void;

declare const addTutorialByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddTutorialByMasterRouteTypes = AddTutorialRouteConfig & {
    response: APIResponse<AddTutorialResponse>;
};

declare const params$4: z.ZodObject<{
    tutorialNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tutorialNewId: string;
}, {
    tutorialNewId: string;
}>;
type TParams$4 = z.infer<typeof params$4>;
type DeleteTutorialValidation = {
    body: never;
    params: TParams$4;
    query: never;
};

type DeleteTutorialRouteConfig = DeleteTutorialValidation & {
    files: never;
};
type DeleteTutorialResponse = void;

declare const deleteTutorialByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteTutorialByMasterRouteTypes = DeleteTutorialRouteConfig & {
    response: APIResponse<DeleteTutorialResponse>;
};

declare const query: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    export: z.ZodOptional<z.ZodNativeEnum<{
        readonly CSV: "csv";
        readonly XLSX: "xlsx";
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    export?: "csv" | "xlsx" | undefined;
}>;
type TQuery = z.infer<typeof query>;
type ListTutorialsValidation = {
    body: never;
    params: never;
    query: TQuery;
};

type ListTutorialsRouteConfig = ListTutorialsValidation & {
    files: never;
};
type ListTutorialsResponse = ResponseWithPagination<TutorialDto>;

declare const listTutorialsByMasterRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type ListTutorialsByMasterRouteTypes = ListTutorialsRouteConfig & {
    response: APIResponse<ListTutorialsResponse>;
};

declare const body$4: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodString>;
    interfaceKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    link?: string | undefined;
    interfaceKeys?: string[] | undefined;
}, {
    title?: string | undefined;
    link?: string | undefined;
    interfaceKeys?: string[] | undefined;
}>;
type TBody$4 = z.infer<typeof body$4>;
declare const params$3: z.ZodObject<{
    tutorialNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tutorialNewId: string;
}, {
    tutorialNewId: string;
}>;
type TParams$3 = z.infer<typeof params$3>;
type UpdateTutorialValidation = {
    body: TBody$4;
    params: TParams$3;
    query: never;
};

type UpdateTutorialRouteConfig = UpdateTutorialValidation & {
    files: never;
};
type UpdateTutorialResponse = void;

declare const updateTutorialByMasterRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateTutorialByMasterRouteTypes = UpdateTutorialRouteConfig & {
    response: APIResponse<UpdateTutorialResponse>;
};

type UploadAvatarValidation = {
    body: never;
    params: never;
    query: never;
};

type UploadAvatarRouteConfig = UploadAvatarValidation & {
    files: FilesInRequest<"avatar">;
};
type UploadAvatarResponse = void;

declare const uploadAvatarRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type UploadAvatarRouteTypes = UploadAvatarRouteConfig & {
    response: APIResponse<UploadAvatarResponse>;
};

declare const body$3: z.ZodObject<{
    topicType: z.ZodEnum<["subjectType", "subSubjectType"]>;
    topicTypeNewId: z.ZodString;
    sessionTypeNewId: z.ZodString;
    startTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    endTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    classroomNewId: z.ZodString;
    groupNewId: z.ZodOptional<z.ZodString>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
    classNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    topicType: "subjectType" | "subSubjectType";
    classNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    topicTypeNewId: string;
    groupNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    topicType: "subjectType" | "subSubjectType";
    classNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    topicTypeNewId: string;
    groupNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}>;
type TBody$3 = z.infer<typeof body$3>;
type AddWeeklySessionForClassValidation = {
    body: TBody$3;
    params: never;
    query: never;
};

type AddWeeklySessionForClassRouteConfig = AddWeeklySessionForClassValidation & {
    files: never;
};
type AddWeeklySessionForClassResponse = {
    isValid: boolean;
    weeklySessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        classGroup: string | null;
        group: string | null;
    };
};

declare const addWeeklySessionForClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddWeeklySessionForClassByAdminRouteTypes = AddWeeklySessionForClassRouteConfig & {
    response: APIResponse<AddWeeklySessionForClassResponse>;
};

declare const body$2: z.ZodObject<{
    startTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    endTime: z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>;
    sessionTypeNewId: z.ZodString;
    classroomNewId: z.ZodString;
    groupNewId: z.ZodString;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
}, "strip", z.ZodTypeAny, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    groupNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    week?: "A" | "B" | undefined;
}, {
    startTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    endTime: {
        day: number;
        hours: number;
        minutes: number;
    };
    groupNewId: string;
    sessionTypeNewId: string;
    classroomNewId: string;
    week?: "A" | "B" | undefined;
}>;
type TBody$2 = z.infer<typeof body$2>;
type AddWeeklySessionForGroupValidation = {
    body: TBody$2;
    params: never;
    query: never;
};

type AddWeeklySessionForGroupRouteConfig = AddWeeklySessionForGroupValidation & {
    files: never;
};
type AddWeeklySessionForGroupResponse = {
    isValid: boolean;
    weeklySessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const addWeeklySessionForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: never[];
};
type AddWeeklySessionForGroupByAdminRouteTypes = AddWeeklySessionForGroupRouteConfig & {
    response: APIResponse<AddWeeklySessionForGroupResponse>;
};

declare const params$2: z.ZodObject<{
    weeklySessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    weeklySessionNewId: string;
}, {
    weeklySessionNewId: string;
}>;
type TParams$2 = z.infer<typeof params$2>;
type DeleteWeeklySessionValidation = {
    body: never;
    params: TParams$2;
    query: never;
};

type DeleteWeeklySessionRouteConfig = DeleteWeeklySessionValidation & {
    files: never;
};
type DeleteWeeklySessionResponse = void;

declare const deleteWeeklySessionByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type DeleteWeeklySessionByAdminRouteTypes = DeleteWeeklySessionRouteConfig & {
    response: APIResponse<DeleteWeeklySessionResponse>;
};

declare const body$1: z.ZodObject<{
    sessionTypeNewId: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>>;
    endTime: z.ZodOptional<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>>;
    classroomNewId: z.ZodOptional<z.ZodString>;
    classGroupNewId: z.ZodOptional<z.ZodString>;
    week: z.ZodOptional<z.ZodEnum<["A", "B"]>>;
}, "strip", z.ZodTypeAny, {
    sessionTypeNewId?: string | undefined;
    startTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    endTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    classroomNewId?: string | undefined;
    classGroupNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}, {
    sessionTypeNewId?: string | undefined;
    startTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    endTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    classroomNewId?: string | undefined;
    classGroupNewId?: string | undefined;
    week?: "A" | "B" | undefined;
}>;
type TBody$1 = z.infer<typeof body$1>;
declare const params$1: z.ZodObject<{
    weeklySessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    weeklySessionNewId: string;
}, {
    weeklySessionNewId: string;
}>;
type TParams$1 = z.infer<typeof params$1>;
type UpdateWeeklySessionForClassValidation = {
    body: TBody$1;
    params: TParams$1;
    query: never;
};

type UpdateWeeklySessionForClassRouteConfig = UpdateWeeklySessionForClassValidation & {
    files: never;
};
type UpdateWeeklySessionForClassResponse = {
    isValid: boolean;
    weeklySessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        classGroup: string | null;
        group: string | null;
    };
};

declare const updateWeeklySessionForClassByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateWeeklySessionForClassByAdminRouteTypes = UpdateWeeklySessionForClassRouteConfig & {
    response: APIResponse<UpdateWeeklySessionForClassResponse>;
};

declare const body: z.ZodObject<{
    startTime: z.ZodOptional<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>>;
    endTime: z.ZodOptional<z.ZodObject<{
        day: z.ZodNumber;
        hours: z.ZodNumber;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        day: number;
        hours: number;
        minutes: number;
    }, {
        day: number;
        hours: number;
        minutes: number;
    }>>;
    classroomNewId: z.ZodOptional<z.ZodString>;
    week: z.ZodOptional<z.ZodNullable<z.ZodEnum<["A", "B"]>>>;
    sessionTypeNewId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    endTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    classroomNewId?: string | undefined;
    week?: "A" | "B" | null | undefined;
    sessionTypeNewId?: string | undefined;
}, {
    startTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    endTime?: {
        day: number;
        hours: number;
        minutes: number;
    } | undefined;
    classroomNewId?: string | undefined;
    week?: "A" | "B" | null | undefined;
    sessionTypeNewId?: string | undefined;
}>;
type TBody = z.infer<typeof body>;
declare const params: z.ZodObject<{
    weeklySessionNewId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    weeklySessionNewId: string;
}, {
    weeklySessionNewId: string;
}>;
type TParams = z.infer<typeof params>;
type UpdateWeeklySessionForGroupValidation = {
    body: TBody;
    params: TParams;
    query: never;
};

type UpdateWeeklySessionForGroupRouteConfig = UpdateWeeklySessionForGroupValidation & {
    files: never;
};
type UpdateWeeklySessionForGroupResponse = {
    isValid: boolean;
    weeklySessionId: ID$1 | null;
    errors: {
        teacher: string | null;
        classroom: string | null;
        class: string | null;
        group: string | null;
    };
};

declare const updateWeeklySessionForGroupByAdminRoute: {
    path: string;
    method: string;
    paramsKey: string[];
};
type UpdateWeeklySessionForGroupByAdminRouteTypes = UpdateWeeklySessionForGroupRouteConfig & {
    response: APIResponse<UpdateWeeklySessionForGroupResponse>;
};

type ID = string & {
    _isID: true;
};

export { ACTION_ENUM, ALERT_STATUS_ENUM, ALERT_TYPE_ENUM, type AddAdminByAdminRouteTypes, type AddAlertByAdminRouteTypes, type AddBarCodeConfigByAdminRouteTypes, type AddChapterAttachmentRouteTypes, type AddChapterRouteTypes, type AddClassByAdminRouteTypes, type AddClassTypeActivityByAdminRouteTypes, type AddClassTypeByAdminRouteTypes, type AddClassroomByAdminRouteTypes, type AddCommentToPostRouteTypes, type AddDiplomaByAdminRouteTypes, type AddExamTypeByAdminRouteTypes, type AddExpenseByAdminRouteTypes, type AddFieldToClassTypeByAdminRouteTypes, type AddGradeReportTemplateByAdminRouteTypes, type AddGroupByAdminRouteTypes, type AddGroupTypeByAdminRouteTypes, type AddHolidayByAdminRouteTypes, type AddInvoiceForStudentByAdminRouteTypes, type AddIssueRouteTypes, type AddLevelByAdminRouteTypes, type AddMasterByMasterRouteTypes, AddMessageRoute, type AddMessageRouteTypes, type AddObservationReasonByAdminRouteTypes, type AddObservationRouteTypes, type AddParentByAdminRouteTypes, type AddParticipantToGroupRouteTypes, type AddPaymentTemplateByAdminRouteTypes, type AddPostRouteTypes, AddReactToMessageRoute, type AddReactToMessageRouteTypes, type AddReplyToCommentRouteTypes, type AddRoleByMasterRouteTypes, type AddSchoolByMasterRouteTypes, type AddSectionByAdminRouteTypes, type AddServiceByAdminRouteTypes, type AddSessionForClassByAdminRouteTypes, type AddSessionForGroupByAdminRouteTypes, type AddSessionTypeByAdminRouteTypes, type AddSignatureByAdminRouteTypes, type AddStudentByAdminRouteTypes, type AddSubLevelByAdminRouteTypes, type AddSubSubjectToClassTypeByAdminRouteTypes, type AddSubSubjectTypeByAdminRouteTypes, type AddSubjectToClassTypeByAdminRouteTypes, type AddSubjectTypeByAdminRouteTypes, type AddSupplierByAdminRouteTypes, type AddTeacherByAdminRouteTypes, type AddTeacherPaymentConfigurationByAdminRouteTypes, type AddTeacherPaymentTransactionByAdminRouteTypes, type AddTermByAdminRouteTypes, type AddTransactionByAdminRouteTypes, type AddTutorialByMasterRouteTypes, type AddWeeklySessionForClassByAdminRouteTypes, type AddWeeklySessionForGroupByAdminRouteTypes, type ApplySmartCalendarScheduleByAdminRouteTypes, type ApplyWeeklyScheduleForClassByAdminRouteTypes, type ApplyWeeklyScheduleForGroupByAdminRouteTypes, type ArchiveAdminByAdminRouteTypes, type ArchiveParentByAdminRouteTypes, type ArchiveStudentByAdminRouteTypes, type ArchiveTeacherByAdminRouteTypes, AssignStudentToClassByAdminRoute, type AssignStudentToClassByAdminRouteTypes, type AssignStudentToGroupByAdminRouteTypes, type AssignTeacherToIssueByAdminRouteTypes, type AssignTeacherToSubSubjectInClassByAdminRouteTypes, type AssignTeacherToSubjectInClassByAdminRouteTypes, CATEGORIES_ENUM, CHAPTER_ATTACHMENT_FILE_TYPE_ENUM, CHAPTER_ATTACHMENT_STATUS_ENUM, type CancelSessionByAdminRouteTypes, type CancelSmartCalendarScheduleByAdminRouteTypes, type CheckGroupRouteTypes, type CloseSessionRouteTypes, CompleteScheduleGenerationByPublicRoute, type CompleteScheduleGenerationByPublicRouteTypes, type CompleteTermByAdminRouteTypes, type ConfirmAttendanceRouteTypes, type DeleteAlertByAdminRouteTypes, type DeleteBarCodeConfigByAdminRouteTypes, type DeleteChapterAttachmentRouteTypes, type DeleteChapterRouteTypes, type DeleteClassByAdminRouteTypes, type DeleteClassTypeActivityByAdminRouteTypes, type DeleteClassTypeByAdminRouteTypes, type DeleteClassroomByAdminRouteTypes, type DeleteDiplomaByAdminRouteTypes, type DeleteExamTypeByAdminRouteTypes, type DeleteExpenseByAdminRouteTypes, type DeleteFieldFromClassTypeByAdminRouteTypes, type DeleteGradeReportTemplateByAdminRouteTypes, type DeleteGroupByAdminRouteTypes, type DeleteGroupTypeByAdminRouteTypes, type DeleteHolidayByAdminRouteTypes, type DeleteInvoiceByAdminRouteTypes, type DeleteLevelByAdminRouteTypes, type DeleteMasterByMasterRouteTypes, type DeleteMessageRouteTypes, type DeleteObservationByAdminRouteTypes, type DeleteObservationReasonByAdminRouteTypes, type DeleteParticipantFromGroupRouteTypes, type DeletePaymentTemplateByAdminRouteTypes, type DeletePostRouteTypes, type DeletePreRegistrationByAdminRouteTypes, type DeleteRoleByMasterRouteTypes, type DeleteSectionByAdminRouteTypes, type DeleteServiceByAdminRouteTypes, type DeleteSessionByAdminRouteTypes, DeleteSessionTypeByAdminRoute, type DeleteSessionTypeByAdminRouteTypes, type DeleteSignatureByAdminRouteTypes, type DeleteSmartCalendarScheduleByAdminRouteTypes, type DeleteSubLevelByAdminRouteTypes, type DeleteSubSubjectFromClassTypeByAdminRouteTypes, type DeleteSubSubjectTypeByAdminRouteTypes, type DeleteSubjectFromClassTypeByAdminRouteTypes, type DeleteSubjectTypeByAdminRouteTypes, type DeleteSuppliersByAdminRouteTypes, type DeleteTeacherPaymentTransactionByAdminRouteTypes, type DeleteTermByAdminRouteTypes, type DeleteTransactionsByAdminRouteTypes, type DeleteTutorialByMasterRouteTypes, type DeleteWeeklySessionByAdminRouteTypes, EDUCATION_DEPARTMENT_ENUM, ESTABLISHMENT_TITLE_ENUM, EXAM_GRADE_SYSTEM_ENUM, type EventResponseMapping, FEATURE_FLAGS_ENUM, type FileDTO, type ForgetPasswordRouteTypes, type ForwardIssueByAdminRouteTypes, GRADE_REPORT_THEM_ENUM, type GenerateScheduleByAdminRouteTypes, type GetActivitiesOfClassTypeByAdminRouteTypes, type GetAdminByNewIdByAdminRouteTypes, type GetAlertDetailsByAdminRouteTypes, type GetAlertStatisticsByAdminRouteTypes, type GetAllCambridgeAnnualGradeReportsByAdminRouteTypes, type GetAllCambridgeGradeReportsOfClassByAdminRouteTypes, type GetAllIBGradeReportsOfClassByAdminRouteTypes, type GetAllPrimaryAnnualGradeReportOfClassByAdminRouteTypes, type GetAllPrimaryGradeReportsOfClassByAdminRouteTypes, type GetAllSecondaryGradeReportsOfClassByAdminRouteTypes, type GetAnnualAveragesOfClassByAdminRouteTypes, type GetAppVersionByMasterRouteTypes, type GetAppVersionByPublicRouteTypes, type GetAvailableClassroomByAdminRouteTypes, type GetAvailableClassroomInWeeklySessionByAdminRouteTypes, type GetCambridgeAnnualAveragesOfClassByAdminRouteTypes, type GetCambridgeAveragesOfClassByAdminRouteTypes, type GetCambridgeBlankExamPageByAdminRouteTypes, type GetCambridgeChildGradeReportPDFRouteTypes, type GetCambridgeChildGradeReportRouteTypes, type GetCambridgeSubjectsOfClassByAdminRouteTypes, type GetCambridgeSubjectsOfClassByTeacherRouteTypes, type GetChaptersByTopicRouteTypes, GetChildAttendanceStatsRoute, type GetChildAttendanceStatsRouteTypes, type GetChildInvoicesByParentRouteTypes, type GetChildrenOfParentsByParentRouteTypes, type GetClassDashboardByAdminRouteTypes, type GetClassDiplomasByAdminRouteTypes, type GetClassListByAdminRouteTypes, type GetClassListByTeacherRouteTypes, type GetClassOverviewRouteTypes, type GetClassTypeByAdminRouteTypes, type GetCurrentUserByAdminRouteTypes, type GetCurrentUserByMasterRouteTypes, type GetCurrentUserByStudentRouteTypes, type GetCurrentUserByTeacherRouteTypes, type GetCurrentUserRouteTypes, type GetDashboardByAdminRouteTypes, type GetDashboardByParentRouteTypes, type GetDashboardByStudentRouteTypes, type GetDashboardByTeacherRouteTypes, type GetDraftWeeklyScheduleByAdminRouteTypes, type GetEntityScheduleByAdminRouteTypes, type GetFieldsOfClassByAdminRouteTypes, type GetFieldsOfClassByTeacherRouteTypes, type GetFieldsOfClassTypeByAdminRouteTypes, type GetFinanceDashboardByAdminRouteTypes, type GetGradesOfCambridgeGroupByAdminRouteTypes, type GetGradesOfCambridgeGroupByTeacherRouteTypes, type GetGradesOfCambridgeSubjectByAdminRouteTypes, type GetGradesOfCambridgeSubjectByTeacherRouteTypes, type GetGradesOfFieldByAdminRouteTypes, type GetGradesOfFieldByTeacherRouteTypes, type GetGradesOfIBGroupRouteTypes, type GetGradesOfIBSubjectRouteTypes, type GetGradesOfSecondaryGroupByAdminRouteTypes, type GetGradesOfSecondaryGroupByTeacherRouteTypes, type GetGradesOfSecondarySubjectByAdminRouteTypes, type GetGradesOfSecondarySubjectByTeacherRouteTypes, type GetGroupListByAdminRouteTypes, type GetGroupOverviewRouteTypes, type GetGroupTypesOfChaptersRouteTypes, type GetGroupsOfClassByAdminRouteTypes, type GetIBAdminObservationsByAdminRouteTypes, type GetIBAnnualAveragesOfClassByAdminRouteTypes, type GetIBAveragesOfClassByAdminRouteTypes, type GetIBBlankExamPageByAdminRouteTypes, type GetIBChildGradeReportPDFRouteTypes, type GetIBStudentGradeReportByAdminRouteTypes, type GetIBSubjectsOfClassRouteTypes, type GetInvoiceDetailsByAdminRouteTypes, type GetInvoiceDetailsRouteTypes, type GetInvoicePdfDataByAdminRouteTypes, type GetLevelDegreesCoverageByAdminRouteTypes, type GetLevelsOverviewByAdminRouteTypes, GetMessageReactionsRoute, type GetMessageReactionsRouteTypes, type GetMessageTargetUsersRouteTypes, type GetNotPromotedStudentsByAdminRouteTypes, type GetOneCommentRouteTypes, type GetOneConversationMessagesRouteTypes, type GetOneConversationRouteTypes, type GetOneHomeworkRouteTypes, type GetOneIssueRouteTypes, type GetOneObservationRouteTypes, type GetOnePostRouteTypes, type GetOnePreRegistrationByPublicRouteTypes, type GetOneRoleByMasterRouteTypes, type GetParentByNewIdByAdminRouteTypes, type GetPaymentTemplateByAdminRouteTypes, type GetPrimaryAnnualGradeReportOfStudentByAdminRouteTypes, type GetPrimaryAveragesOfClassByAdminRouteTypes, type GetPrimaryBlankExamPageByAdminRouteTypes, type GetPrimaryChildGradeReportPDFRouteTypes, type GetPrimaryChildGradeReportRouteTypes, type GetPrimaryGradeReportStatsByAdminRouteTypes, type GetReactionsOfCommentRouteTypes, type GetReactionsOfPostRouteTypes, type GetScheduleRouteTypes, type GetSchoolAvailableTimeConstraintsByAdminRouteTypes, type GetSchoolConfigByPublicRouteTypes, type GetSchoolDetailsByAdminRouteTypes, type GetSchoolLogoByPublicRouteTypes, type GetSchoolPreRegistrationByPublicRouteTypes, type GetSchoolSignatureByPublicRouteTypes, type GetSearchInvoiceByAdminRouteTypes, type GetSecondaryAveragesOfClassByAdminRouteTypes, type GetSecondaryBlankExamPageByAdminRouteTypes, type GetSecondaryChildGradeReportPDFRouteTypes, type GetSecondaryChildGradeReportRouteTypes, type GetSecondaryGradeReportStatsByAdminRouteTypes, type GetSecondarySubjectsOfClassByAdminRouteTypes, type GetSecondarySubjectsOfClassByTeacherRouteTypes, type GetSessionDetailsRouteTypes, type GetSmartSchedulePDFByAdminRouteTypes, type GetStudentAttendanceCertificateByAdminRouteTypes, type GetStudentCambridgeAnnualGradeReportByAdminRouteTypes, type GetStudentDiplomaByAdminRouteTypes, type GetStudentGradeReportCambridgeByAdminRouteTypes, type GetStudentGradeReportPrimaryByAdminRouteTypes, type GetStudentGradeReportSecondaryByAdminRouteTypes, type GetStudentInvoicesByAdminRouteTypes, type GetStudentPaymentConfigurationByAdminRouteTypes, type GetStudentProfileByAdminRouteTypes, type GetStudentProfileRouteTypes, type GetStudentTopicsChaptersRouteTypes, type GetStudentsCodeBarePdfByAdminRouteTypes, type GetStudentsOfClassRouteTypes, type GetStudentsOfGroupByAdminRouteTypes, type GetSubjectsOfClassByAdminRouteTypes, type GetSubjectsOfClassTypesByAdminRouteTypes, type GetTeacherClassAndGroupsByAdminRouteTypes, type GetTeacherClassAndGroupsRouteTypes, type GetTeacherPaymentConfigurationByAdminRouteTypes, type GetTeacherPaymentDashboardByAdminRouteTypes, type GetTeacherProfileByAdminRouteTypes, type GetTeacherProfileRouteTypes, type GetTeachersOfStudentRouteTypes, type GetTopicOfGroupByAdminRouteTypes, type GetTopicsOfChaptersByClassTypeRouteTypes, type GetTutorialsByAdminRouteTypes, type GetUsersOfPostForMentionRouteTypes, type GetWeeklyScheduleRouteTypes, HOMEWORK_STATUS_ENUM, type HideTermByAdminRouteTypes, IB_ANNUAL_GRADE_LEVELS_ENUM, type ID, INSTANCE_TYPE_ENUM, INTERACTION_TYPE_ENUM, type ImportStudentsByAdminRouteTypes, type IncompleteTermByAdminRouteTypes, type ListAdminsByAdminRouteTypes, type ListAlertsByAdminRouteTypes, type ListBankChecksByAdminRouteTypes, type ListBankTransfersByAdminRouteTypes, type ListBarCodeConfigByAdminRouteTypes, type ListChapterAttachmentsRouteTypes, type ListChapterDocumentsRouteTypes, type ListChapterVideoRouteTypes, type ListClassTypesByAdminRouteTypes, type ListClassTypesByPublicRouteTypes, type ListClassTypesByTeacherRouteTypes, type ListClassesByAdminRouteTypes, type ListClassesRouteTypes, type ListClassroomsByAdminRouteTypes, type ListCommentsOfPostRouteTypes, type ListConversationAttachmentsRouteTypes, type ListConversationLinksRouteTypes, type ListConversationMessagesRouteTypes, type ListConversationMultimediaRouteTypes, type ListConversationParticipantsRouteTypes, type ListConversationsRouteTypes, type ListDiplomasByAdminRouteTypes, type ListExamTypesByAdminRouteTypes, type ListExpensesByAdminRouteTypes, type ListGradeReportTemplatesByAdminRouteTypes, type ListGroupTypesByAdminRouteTypes, type ListGroupsByAdminRouteTypes, type ListGroupsRouteTypes, type ListHolidayByAdminRouteTypes, type ListHomeworksByAdminRouteTypes, type ListHomeworksByParentRouteTypes, type ListHomeworksByStudentRouteTypes, type ListHomeworksByTeacherRouteTypes, type ListInteractionsOfIssueRouteTypes, type ListInvoicesByAdminRouteTypes, type ListIssueReasonsRouteTypes, type ListIssuesByAdminRouteTypes, type ListIssuesOfParentRouteTypes, type ListIssuesOfTeacherRouteTypes, type ListLevelsByAdminRouteTypes, type ListLevelsByPublicRouteTypes, type ListMastersByMasterRouteTypes, type ListNextClassTypesByAdminRouteTypes, type ListNotificationsRouteTypes, type ListObservationReasonsRouteTypes, type ListObservationsByAdminRouteTypes, type ListObservationsByParentRouteTypes, type ListObservationsByStudentRouteTypes, type ListObservationsByTeacherRouteTypes, type ListParentsByAdminRouteTypes, type ListPaymentTemplatesByAdminRouteTypes, type ListPostsRouteTypes, type ListPreRegistrationByAdminRouteTypes, type ListRepliesOfCommentRouteTypes, type ListRolesByAdminRouteTypes, type ListRolesByMasterRouteTypes, type ListSchoolYearByAdminRouteTypes, type ListSchoolsByMasterRouteTypes, type ListSectionsByAdminRouteTypes, type ListServicesByAdminRouteTypes, type ListSessionTypeByAdminRouteTypes, type ListSignaturesByAdminRouteTypes, type ListSmartCalendarScheduleByAdminRouteTypes, type ListSmsSoldHistoriesByMasterRouteTypes, type ListStudentsByAdminRouteTypes, type ListSubLevelsByAdminRouteTypes, type ListSubSubjectTypesByAdminRouteTypes, type ListSubjectTypesByAdminRouteTypes, type ListSuppliersByAdminRouteTypes, type ListTargetUsersForGroupConversationAssignmentRouteTypes, type ListTeacherSessionsByAdminRouteTypes, type ListTeachersByAdminRouteTypes, type ListTermByAdminRouteTypes, type ListTransactionsByAdminRouteTypes, type ListTutorialsByMasterRouteTypes, type ListUnenrolledStudentsByAdminRouteTypes, type ListUnenrolledStudentsForGroupByAdminRouteTypes, type ListUsersForAlertByAdminRouteTypes, type LoginByMasterRouteTypes, type LoginByStudentRouteTypes, type LoginRouteTypes, type LogoutRouteTypes, MarkScheduleAsErroredByPublicRoute, type MarkScheduleAsErroredByPublicRouteTypes, type MergeInvoicesByAdminRouteTypes, NOTIFICATION_TYPES_ENUM, PROMOTION_STATUS_ENUM, type PaginationMeta, type PayInvoiceByAdminRouteTypes, type PayTeacherByAdminRouteTypes, type PublishTermByAdminRouteTypes, REACTION_TYPE_ENUM, REGISTRATION_STEP_ENUM, RESOURCES_ENUM, type ReactToCommentRouteTypes, type ReactToPostRouteTypes, type ReactionSummaryDTO, type RegisterStudentByAdminRouteTypes, type ReorderExamTypeByAdminRouteTypes, type ReorderFieldsOfClassTypesByAdminRouteTypes, type ReorderLevelsByAdminRouteTypes, type ReorderSubLevelsByAdminRouteTypes, type ReorderSubSubjectsOfClassTypesByAdminRouteTypes, type ReorderSubjectsOfClassTypesByAdminRouteTypes, type ResendInvitationByAdminRouteTypes, type ResetPasswordRouteTypes, type ResetUserPasswordByAdminRouteTypes, SMART_CALENDAR_SCHEDULE_STATUS_ENUM, type SendReplyRouteTypes, type StartSessionRouteTypes, type SwitchLevelsToNextSchoolYearByAdminRouteTypes, type SwitchShoolByMasterRouteTypes, type SwitchStudentsClassByAdminRouteTypes, type SwitchToUserByAdminRouteTypes, type TActionsEnum, type TAlertStatusEnum, type TAlertTypeEnum, type TCategoriesEnum, type TChapterAttachmentFileTypeEnum, type TChapterAttachmentStatusEnum, TEMPLATE_ENUM, type TEducationDepartmentEnum, type TEndUserEnum, type TEstablishmentTitleEnum, type TExamGradeSystemEnum, type TFeatureFlagsEnum, type TGradeReportThemEnum, type THomeworkStatusEnum, type TIBAnnualGradeLevelsEnum, type TInstanceTypeEnum, type TInteractionTypeEnum, type TMessageReactionTypeEnum, type TNotificationTypesEnum, type TPromotionStatusEnum, TRANSACTION_ADJUSTMENT_TYPE_ENUM, type TReactionTypeEnum, type TRegistrationStepEnum, type TResourcesEnum, type TSmartCalendarScheduleStatusEnum, type TTemplateEnum, type TTransactionAdjustmentTypeEnum, type TogglePinStatusOfPostRouteTypes, type ToggleUserActivationByAdminRouteTypes, type UnArchiveAdminByAdminRouteTypes, type UnArchiveParentByAdminRouteTypes, type UnArchiveStudentByAdminRouteTypes, type UnArchiveTeacherByAdminRouteTypes, type UnAssignStudentFromClassByAdminRouteTypes, type UnAssignTeacherFromSubSubjectByAdminRouteTypes, type UnAssignTeacherFromSubjectByAdminRouteTypes, type UnPayTeacherByAdminRouteTypes, type UnassignStudentFromGroupByAdminRouteTypes, type UnassignTeacherFromIssueByAdminRouteTypes, type UnmergeInvoiceByAdminRouteTypes, type UnpayInvoiceByAdminRouteTypes, type UnpaySplitByAdminRouteTypes, type UpdateAdminByAdminRouteTypes, type UpdateAdminObservationsByAdminRouteTypes, type UpdateAlertByAdminRouteTypes, type UpdateAppVersionByMasterRouteTypes, type UpdateBankCheckByAdminRouteTypes, type UpdateBankTransferByAdminRouteTypes, type UpdateBarCodeConfigByAdminRouteTypes, type UpdateCambridgeGradesOfGroupRouteTypes, type UpdateCambridgeGradesRouteTypes, type UpdateChapterAttachmentRouteTypes, type UpdateChapterRouteTypes, type UpdateClassByAdminRouteTypes, type UpdateClassConstraintsByAdminRouteTypes, type UpdateClassTypeActivityByAdminRouteTypes, type UpdateClassTypeByAdminRouteTypes, type UpdateClassroomByAdminRouteTypes, type UpdateConversationNameRouteTypes, type UpdateConversationSeenStatuesRouteTypes, type UpdateCurrentUserPasswordRouteTypes, type UpdateDiplomaByAdminRouteTypes, type UpdateExamTypeByAdminRouteTypes, type UpdateExpenseByAdminRouteTypes, type UpdateFieldOfClassTypeByAdminRouteTypes, type UpdateFlagsByMasterRouteTypes, type UpdateGradeReportTemplateByAdminRouteTypes, type UpdateGroupByAdminRouteTypes, type UpdateGroupTypeByAdminRouteTypes, type UpdateHolidayByAdminRouteTypes, type UpdateIBGradesOfClassRouteTypes, type UpdateIBGradesOfGroupRouteTypes, type UpdateInvoiceByAdminRouteTypes, type UpdateInvoiceRemindersByAdminRouteTypes, type UpdateIssueStatusByAdminRouteTypes, type UpdateLevelByAdminRouteTypes, type UpdateMasterByMasterRouteTypes, type UpdateNotAvailableTimesByAdminRouteTypes, type UpdateObservationReasonByAdminRouteTypes, type UpdateObservationRouteTypes, type UpdateParentByAdminRouteTypes, type UpdatePaymentTemplateByAdminRouteTypes, type UpdatePostRouteTypes, type UpdatePreRegistrationByAdminRouteTypes, type UpdatePreRegistrationByPublicRouteTypes, type UpdatePrimaryGradesRouteTypes, type UpdateRoleByMasterRouteTypes, type UpdateSchoolByAdminRouteTypes, type UpdateSchoolByMasterRouteTypes, type UpdateSchoolYearByAdminRouteTypes, type UpdateSecondaryGradesOfGroupRouteTypes, type UpdateSecondaryGradesRouteTypes, type UpdateSectionByAdminRouteTypes, type UpdateServiceByAdminRouteTypes, type UpdateSessionDetailsRouteTypes, type UpdateSessionForClassByAdminRouteTypes, type UpdateSessionForGroupByAdminRouteTypes, type UpdateSessionStatusByAdminRouteTypes, type UpdateSessionTypeByAdminRouteTypes, type UpdateSignatureByAdminRouteTypes, type UpdateSmartCalendarScheduleByAdminRouteTypes, type UpdateSmsSoldByMasterRouteTypes, type UpdateStudentByAdminRouteTypes, type UpdateStudentGroupByAdminRouteTypes, type UpdateStudentPaymentConfigurationByAdminRouteTypes, type UpdateStudentPromotionStatusByAdminRouteTypes, type UpdateSubLevelByAdminRouteTypes, type UpdateSubSubjectOfClassTypeByAdminRouteTypes, type UpdateSubSubjectTypeByAdminRouteTypes, type UpdateSubjectOfClassTypeByAdminRouteTypes, type UpdateSubjectTypeByAdminRouteTypes, type UpdateSupplierByAdminRouteTypes, type UpdateTeacherByAdminRouteTypes, type UpdateTeacherConstraintsByAdminRouteTypes, type UpdateTeacherPaymentConfigurationByAdminRouteTypes, type UpdateTermByAdminRouteTypes, type UpdateTransactionsByAdminRouteTypes, type UpdateTutorialByMasterRouteTypes, type UpdateWeeklySessionForClassByAdminRouteTypes, type UpdateWeeklySessionForGroupByAdminRouteTypes, type UploadAvatarRouteTypes, type VerifyCodeRouteTypes, addAdminByAdminRoute, addAlertByAdminRoute, addBarCodeConfigByAdminRoute, addChapterAttachmentRoute, addChapterRoute, addClassByAdminRoute, addClassTypeActivityByAdminRoute, addClassTypeByAdminRoute, addClassroomByAdminRoute, addCommentToPostRoute, addDiplomaByAdminRoute, addExamTypeByAdminRoute, addExpenseByAdminRoute, addFieldToClassTypeByAdminRoute, addGradeReportTemplateByAdminRoute, addGroupByAdminRoute, addGroupTypeByAdminRoute, addHolidayByAdminRoute, addInvoiceForStudentByAdminRoute, addIssueRoute, addLevelByAdminRoute, addMasterByMasterRoute, addObservationReasonByAdminRoute, addObservationRoute, addParentByAdminRoute, addParticipantToGroupRoute, addPaymentTemplateByAdminRoute, addPostRoute, addReplyToCommentRoute, addRoleByMasterRoute, addSchoolByMasterRoute, addSectionByAdminRoute, addServiceByAdminRoute, addSessionForClassByAdminRoute, addSessionForGroupByAdminRoute, addSessionTypeByAdminRoute, addSignatureByAdminRoute, addStudentByAdminRoute, addSubLevelByAdminRoute, addSubSubjectToClassTypeByAdminRoute, addSubSubjectTypeByAdminRoute, addSubjectToClassTypeByAdminRoute, addSubjectTypeByAdminRoute, addSupplierByAdminRoute, addTeacherByAdminRoute, addTeacherPaymentConfigurationByAdminRoute, addTeacherPaymentTransactionByAdminRoute, addTermByAdminRoute, addTransactionByAdminRoute, addTutorialByMasterRoute, addWeeklySessionForClassByAdminRoute, addWeeklySessionForGroupByAdminRoute, applySmartCalendarScheduleByAdminRoute, applyWeeklyScheduleForClassByAdminRoute, applyWeeklyScheduleForGroupByAdminRoute, archiveAdminByAdminRoute, archiveParentByAdminRoute, archiveStudentByAdminRoute, archiveTeacherByAdminRoute, assignStudentToGroupByAdminRoute, assignTeacherToIssueByAdminRoute, assignTeacherToSubSubjectInClassByAdminRoute, assignTeacherToSubjectInClassByAdminRoute, cancelSessionByAdminRoute, cancelSmartCalendarScheduleByAdminRoute, checkGroupRoute, closeSessionRoute, completeTermByAdminRoute, confirmAttendanceRoute, deleteAlertByAdminRoute, deleteBarCodeConfigByAdminRoute, deleteChapterAttachmentRoute, deleteChapterRoute, deleteClassByAdminRoute, deleteClassTypeActivityByAdminRoute, deleteClassTypeByAdminRoute, deleteClassroomByAdminRoute, deleteDiplomaByAdminRoute, deleteExamTypeByAdminRoute, deleteExpenseByAdminRoute, deleteFieldFromClassTypeByAdminRoute, deleteGradeReportTemplateByAdminRoute, deleteGroupByAdminRoute, deleteGroupTypeByAdminRoute, deleteHolidayByAdminRoute, deleteInvoiceByAdminRoute, deleteLevelByAdminRoute, deleteMasterByMasterRoute, deleteMessageRoute, deleteObservationByAdminRoute, deleteObservationReasonByAdminRoute, deleteParticipantFromGroupRoute, deletePaymentTemplateByAdminRoute, deletePostRoute, deletePreRegistrationByAdminRoute, deleteRoleByMasterRoute, deleteSectionByAdminRoute, deleteServiceByAdminRoute, deleteSessionByAdminRoute, deleteSignatureByAdminRoute, deleteSmartCalendarScheduleByAdminRoute, deleteSubLevelByAdminRoute, deleteSubSubjectFromClassTypeByAdminRoute, deleteSubSubjectTypeByAdminRoute, deleteSubjectFromClassTypeByAdminRoute, deleteSubjectTypeByAdminRoute, deleteSuppliersByAdminRoute, deleteTeacherPaymentTransactionByAdminRoute, deleteTermByAdminRoute, deleteTransactionsByAdminRoute, deleteTutorialByMasterRoute, deleteWeeklySessionByAdminRoute, forgetPasswordRoute, forwardIssueByAdminRoute, generateScheduleByAdminRoute, getActivitiesOfClassTypeByAdminRoute, getAdminByNewIdByAdminRoute, getAlertDetailsByAdminRoute, getAlertStatisticsByAdminRoute, getAllCambridgeAnnualGradeReportsByAdminRoute, getAllCambridgeGradeReportsOfClassByAdminRoute, getAllIBGradeReportsOfClassByAdminRoute, getAllPrimaryAnnualGradeReportOfClassByAdminRoute, getAllPrimaryGradeReportsOfClassByAdminRoute, getAllSecondaryGradeReportsOfClassByAdminRoute, getAnnualAveragesOfClassByAdminRoute, getAppVersionByMasterRoute, getAppVersionByPublicRoute, getAvailableClassroomByAdminRoute, getAvailableClassroomInWeeklySessionByAdminRoute, getCambridgeAnnualAveragesOfClassByAdminRoute, getCambridgeAveragesOfClassByAdminRoute, getCambridgeBlankExamPageByAdminRoute, getCambridgeChildGradeReportPDFRoute, getCambridgeChildGradeReportRoute, getCambridgeSubjectsOfClassByAdminRoute, getCambridgeSubjectsOfClassByTeacherRoute, getChaptersByTopicRoute, getChildInvoicesByParentRoute, getChildrenOfParentsByParentRoute, getClassDashboardByAdminRoute, getClassDiplomasByAdminRoute, getClassListByAdminRoute, getClassListByTeacherRoute, getClassOverviewRoute, getClassTypeByAdminRoute, getCurrentUserByAdminRoute, getCurrentUserByMasterRoute, getCurrentUserByStudentRoute, getCurrentUserByTeacherRoute, getCurrentUserRoute, getDashboardByAdminRoute, getDashboardByParentRoute, getDashboardByStudentRoute, getDashboardByTeacherRoute, getDraftWeeklyScheduleByAdminRoute, getEntityScheduleByAdminRoute, getFieldsOfClassByAdminRoute, getFieldsOfClassByTeacherRoute, getFieldsOfClassTypeByAdminRoute, getFinanceDashboardByAdminRoute, getGradesOfCambridgeGroupByAdminRoute, getGradesOfCambridgeGroupByTeacherRoute, getGradesOfCambridgeSubjectByAdminRoute, getGradesOfCambridgeSubjectByTeacherRoute, getGradesOfFieldByAdminRoute, getGradesOfFieldByTeacherRoute, getGradesOfIBGroupRoute, getGradesOfIBSubjectRoute, getGradesOfSecondaryGroupByAdminRoute, getGradesOfSecondaryGroupByTeacherRoute, getGradesOfSecondarySubjectByAdminRoute, getGradesOfSecondarySubjectByTeacherRoute, getGroupListByAdminRoute, getGroupOverviewRoute, getGroupTypesOfChaptersRoute, getGroupsOfClassByAdminRoute, getIBAdminObservationsByAdminRoute, getIBAnnualAveragesOfClassByAdminRoute, getIBAveragesOfClassByAdminRoute, getIBBlankExamPageByAdminRoute, getIBChildGradeReportPDFRoute, getIBStudentGradeReportByAdminRoute, getIBSubjectsOfClassRoute, getInvoiceDetailsByAdminRoute, getInvoiceDetailsRoute, getInvoicePdfDataByAdminRoute, getLevelDegreesCoverageByAdminRoute, getLevelsOverviewByAdminRoute, getMessageTargetUsersRoute, getNotPromotedStudentsByAdminRoute, getOneCommentRoute, getOneConversationMessagesRoute, getOneConversationRoute, getOneHomeworkRoute, getOneIssueRoute, getOneObservationRoute, getOnePostRoute, getOnePreRegistrationByPublicRoute, getOneRoleByMasterRoute, getParentByNewIdByAdminRoute, getPaymentTemplateByAdminRoute, getPrimaryAnnualGradeReportOfStudentByAdminRoute, getPrimaryAveragesOfClassByAdminRoute, getPrimaryBlankExamPageByAdminRoute, getPrimaryChildGradeReportPDFRoute, getPrimaryChildGradeReportRoute, getPrimaryGradeReportStatsByAdminRoute, getReactionsOfCommentRoute, getReactionsOfPostRoute, getScheduleRoute, getSchoolAvailableTimeConstraintsByAdminRoute, getSchoolConfigByPublicRoute, getSchoolDetailsByAdminRoute, getSchoolLogoByPublicRoute, getSchoolPreRegistrationByPublicRoute, getSchoolSignatureByPublicRoute, getSearchInvoiceByAdminRoute, getSecondaryAveragesOfClassByAdminRoute, getSecondaryBlankExamPageByAdminRoute, getSecondaryChildGradeReportPDFRoute, getSecondaryChildGradeReportRoute, getSecondaryGradeReportStatsByAdminRoute, getSecondarySubjectsOfClassByAdminRoute, getSecondarySubjectsOfClassByTeacherRoute, getSessionDetailsRoute, getSmartSchedulePDFByAdminRoute, getStudentAttendanceCertificateByAdminRoute, getStudentCambridgeAnnualGradeReportByAdminRoute, getStudentDiplomaByAdminRoute, getStudentGradeReportCambridgeByAdminRoute, getStudentGradeReportPrimaryByAdminRoute, getStudentGradeReportSecondaryByAdminRoute, getStudentInvoicesByAdminRoute, getStudentPaymentConfigurationByAdminRoute, getStudentProfileByAdminRoute, getStudentProfileRoute, getStudentTopicsChaptersRoute, getStudentsCodeBarePdfByAdminRoute, getStudentsOfClassRoute, getStudentsOfGroupByAdminRoute, getSubjectsOfClassByAdminRoute, getSubjectsOfClassTypesByAdminRoute, getTeacherClassAndGroupsByAdminRoute, getTeacherClassAndGroupsRoute, getTeacherPaymentConfigurationByAdminRoute, getTeacherPaymentDashboardByAdminRoute, getTeacherProfileByAdminRoute, getTeacherProfileRoute, getTeachersOfStudentRoute, getTopicOfGroupByAdminRoute, getTopicsOfChaptersByClassTypeRoute, getTutorialsByAdminRoute, getUsersOfPostForMentionRoute, getWeeklyScheduleRoute, hideTermByAdminRoute, importStudentsByAdminRoute, incompleteTermByAdminRoute, listAdminsByAdminRoute, listAlertsByAdminRoute, listBankChecksByAdminRoute, listBankTransfersByAdminRoute, listBarCodeConfigByAdminRoute, listChapterAttachmentsRoute, listChapterDocumentsRoute, listChapterVideoRoute, listClassTypesByAdminRoute, listClassTypesByPublicRoute, listClassTypesByTeacherRoute, listClassesByAdminRoute, listClassesRoute, listClassroomsByAdminRoute, listCommentsOfPostRoute, listConversationAttachmentsRoute, listConversationLinksRoute, listConversationMessagesRoute, listConversationMultimediaRoute, listConversationParticipantsRoute, listConversationsRoute, listDiplomasByAdminRoute, listExamTypesByAdminRoute, listExpensesByAdminRoute, listGradeReportTemplatesByAdminRoute, listGroupTypesByAdminRoute, listGroupsByAdminRoute, listGroupsRoute, listHolidayByAdminRoute, listHomeworksByAdminRoute, listHomeworksByParentRoute, listHomeworksByStudentRoute, listHomeworksByTeacherRoute, listInteractionsOfIssueRoute, listInvoicesByAdminRoute, listIssueReasonsRoute, listIssuesByAdminRoute, listIssuesOfParentRoute, listIssuesOfTeacherRoute, listLevelsByAdminRoute, listLevelsByPublicRoute, listMastersByMasterRoute, listNextClassTypesByAdminRoute, listNotificationsRoute, listObservationReasonsRoute, listObservationsByAdminRoute, listObservationsByParentRoute, listObservationsByStudentRoute, listObservationsByTeacherRoute, listParentsByAdminRoute, listPaymentTemplatesByAdminRoute, listPostsRoute, listPreRegistrationByAdminRoute, listRepliesOfCommentRoute, listRolesByAdminRoute, listRolesByMasterRoute, listSchoolYearByAdminRoute, listSchoolsByMasterRoute, listSectionsByAdminRoute, listServicesByAdminRoute, listSessionTypeByAdminRoute, listSignaturesByAdminRoute, listSmartCalendarScheduleByAdminRoute, listSmsSoldHistoriesByMasterRoute, listStudentsByAdminRoute, listSubLevelsByAdminRoute, listSubSubjectTypesByAdminRoute, listSubjectTypesByAdminRoute, listSuppliersByAdminRoute, listTargetUsersForGroupConversationAssignmentRoute, listTeacherSessionsByAdminRoute, listTeachersByAdminRoute, listTermByAdminRoute, listTransactionsByAdminRoute, listTutorialsByMasterRoute, listUnenrolledStudentsByAdminRoute, listUnenrolledStudentsForGroupByAdminRoute, listUsersForAlertByAdminRoute, loginByMasterRoute, loginByStudentRoute, loginRoute, logoutRoute, mergeInvoicesByAdminRoute, payInvoiceByAdminRoute, payTeacherByAdminRoute, publishTermByAdminRoute, reactToCommentRoute, reactToPostRoute, registerStudentByAdminRoute, reorderExamTypeByAdminRoute, reorderFieldsOfClassTypesByAdminRoute, reorderLevelsByAdminRoute, reorderSubLevelsByAdminRoute, reorderSubSubjectsOfClassTypesByAdminRoute, reorderSubjectsOfClassTypesByAdminRoute, resendInvitationByAdminRoute, resetPasswordRoute, resetUserPasswordByAdminRoute, sendReplyRoute, startConversationRules, startSessionRoute, switchLevelsToNextSchoolYearByAdminRoute, switchShoolByMasterRoute, switchStudentsClassByAdminRoute, switchToUserByAdminRoute, togglePinStatusOfPostRoute, toggleUserActivationByAdminRoute, unArchiveAdminByAdminRoute, unArchiveParentByAdminRoute, unArchiveStudentByAdminRoute, unArchiveTeacherByAdminRoute, unAssignStudentFromClassByAdminRoute, unAssignTeacherFromSubSubjectByAdminRoute, unAssignTeacherFromSubjectByAdminRoute, unPayTeacherByAdminRoute, unassignStudentFromGroupByAdminRoute, unassignTeacherFromIssueByAdminRoute, unmergeInvoiceByAdminRoute, unpayInvoiceByAdminRoute, unpaySplitByAdminRoute, updateAdminByAdminRoute, updateAdminObservationsByAdminRoute, updateAlertByAdminRoute, updateAppVersionByMasterRoute, updateBankCheckByAdminRoute, updateBankTransferByAdminRoute, updateBarCodeConfigByAdminRoute, updateCambridgeGradesOfGroupRoute, updateCambridgeGradesRoute, updateChapterAttachmentRoute, updateChapterRoute, updateClassByAdminRoute, updateClassConstraintsByAdminRoute, updateClassTypeActivityByAdminRoute, updateClassTypeByAdminRoute, updateClassroomByAdminRoute, updateConversationNameRoute, updateConversationSeenStatuesRoute, updateCurrentUserPasswordRoute, updateDiplomaByAdminRoute, updateExamTypeByAdminRoute, updateExpenseByAdminRoute, updateFieldOfClassTypeByAdminRoute, updateFlagsByMasterRoute, updateGradeReportTemplateByAdminRoute, updateGroupByAdminRoute, updateGroupTypeByAdminRoute, updateHolidayByAdminRoute, updateIBGradesOfClassRoute, updateIBGradesOfGroupRoute, updateInvoiceByAdminRoute, updateInvoiceRemindersByAdminRoute, updateIssueStatusByAdminRoute, updateLevelByAdminRoute, updateMasterByMasterRoute, updateNotAvailableTimesByAdminRoute, updateObservationReasonByAdminRoute, updateObservationRoute, updateParentByAdminRoute, updatePaymentTemplateByAdminRoute, updatePostRoute, updatePreRegistrationByAdminRoute, updatePreRegistrationByPublicRoute, updatePrimaryGradesRoute, updateRoleByMasterRoute, updateSchoolByAdminRoute, updateSchoolByMasterRoute, updateSchoolYearByAdminRoute, updateSecondaryGradesOfGroupRoute, updateSecondaryGradesRoute, updateSectionByAdminRoute, updateServiceByAdminRoute, updateSessionDetailsRoute, updateSessionForClassByAdminRoute, updateSessionForGroupByAdminRoute, updateSessionStatusByAdminRoute, updateSessionTypeByAdminRoute, updateSignatureByAdminRoute, updateSmartCalendarScheduleByAdminRoute, updateSmsSoldByMasterRoute, updateStudentByAdminRoute, updateStudentGroupByAdminRoute, updateStudentPaymentConfigurationByAdminRoute, updateStudentPromotionStatusByAdminRoute, updateSubLevelByAdminRoute, updateSubSubjectOfClassTypeByAdminRoute, updateSubSubjectTypeByAdminRoute, updateSubjectOfClassTypeByAdminRoute, updateSubjectTypeByAdminRoute, updateSupplierByAdminRoute, updateTeacherByAdminRoute, updateTeacherConstraintsByAdminRoute, updateTeacherPaymentConfigurationByAdminRoute, updateTermByAdminRoute, updateTransactionsByAdminRoute, updateTutorialByMasterRoute, updateWeeklySessionForClassByAdminRoute, updateWeeklySessionForGroupByAdminRoute, uploadAvatarRoute, verifyCodeRoute };
