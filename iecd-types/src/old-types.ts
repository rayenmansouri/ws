// TypeScript version of the compiled JavaScript file

// Route configuration interface
export interface RouteConfig {
    path: string;
    method: string;
    paramsKey: string[];
  }
  
  // Action and Resource enums
  export const ACTION_ENUM = {
    VIEW: "VIEW",
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    ASSIGN: "ASSIGN",
    UNASSIGN: "UNASSIGN",
    EXPORT: "EXPORT",
    PAY: "PAY",
    UNPAY: "UNPAY",
    SWITCH: "SWITCH",
    ARCHIVE: "ARCHIVE",
    UNARCHIVE: "UNARCHIVE"
  } as const;
  
  export const RESOURCES_ENUM = {
    USER: "USER",
    TUTORIAL: "TUTORIAL",
    STUDENT: "STUDENT",
    TEACHER: "TEACHER",
    PARENT: "PARENT",
    ADMIN: "ADMIN",
    ROLE: "ROLE",
    CLASSROOM: "CLASSROOM",
    CLASS: "CLASS",
    CLASS_TYPE: "CLASS_TYPE",
    EXAM_TYPE: "EXAM_TYPE",
    HOMEWORK: "HOMEWORK",
    OBSERVATION_REASON: "OBSERVATION_REASON",
    SESSION: "SESSION",
    SESSION_TYPE: "SESSION_TYPE",
    HOLIDAY: "HOLIDAY",
    LEVEL: "LEVEL",
    SECTION: "SECTION",
    SUB_LEVEL: "SUB_LEVEL",
    TERM: "TERM",
    SUBJECT: "SUBJECT",
    GROUP: "GROUP",
    GROUP_TYPE: "GROUP_TYPE",
    SUB_SUBJECT: "SUB_SUBJECT",
    PASSWORD: "PASSWORD",
    SERVICE: "SERVICE",
    BANK_CHECK: "BANK_CHECK",
    BANK_TRANSFER: "BANK_TRANSFER",
    PAYMENT_CONFIGURATION: "PAYMENT_CONFIGURATION",
    PAYMENT_TEMPLATE: "PAYMENT_TEMPLATE",
    INVOICE: "INVOICE",
    TRANSACTION: "TRANSACTION",
    FINANCE_DASHBOARD: "FINANCE_DASHBOARD",
    EXPENSE: "EXPENSE",
    TEACHER_PAYMENT_CONFIGURATION: "TEACHER_PAYMENT_CONFIGURATION",
    SCHEDULE: "SCHEDULE",
    TEACHER_PAYMENT: "TEACHER_PAYMENT",
    EXAM_GRADE: "EXAM_GRADE",
    OBSERVATION: "OBSERVATION",
    PRE_REGISTRATION: "PRE_REGISTRATION",
    SCHOOL_YEAR: "SCHOOL_YEAR",
    ISSUE: "ISSUE",
    SMART_CALENDAR: "SMART_CALENDAR",
    ANNOUNCEMENT: "ANNOUNCEMENT",
    SUPPLIER: "SUPPLIER",
    DIPLOMA: "DIPLOMA",
    NOTIFICATION: "NOTIFICATION",
    MASTER: "MASTER",
    SCHOOL: "SCHOOL",
    FLAGS: "FLAGS",
    APP_VERSION: "APP_VERSION",
    ALERT: "ALERT",
    SMS_HISTORY: "SMS_HISTORY",
    LMS: "LMS",
    SIGNATURE: "SIGNATURE"
  } as const;
  
  // Notification types enum
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
    INVOICE_SPLIT_PAYMENT_SUCCESS: "invoice_split_payment_success"
  } as const;
  
  // Exam grade system enum
  export const EXAM_GRADE_SYSTEM_ENUM = {
    PRIMARY: "PRIMARY",
    SECONDARY: "SECONDARY",
    AUTOMATIC_PROMOTION: "AUTOMATIC_PROMOTION"
  } as const;
  
  // Establishment title enum
  export const ESTABLISHMENT_TITLE_ENUM = {
    PRIVATE_PRIMARY: "PRIVATE_PRIMARY",
    PRIVATE_SECONDARY: "PRIVATE_SECONDARY",
    PRIVATE_MIDDLE: "PRIVATE_MIDDLE"
  } as const;
  
  // End user enum
  export const END_USER_ENUM = {
    ADMIN: "admin",
    TEACHER: "teacher",
    STUDENT: "student",
    PARENT: "parent",
    MASTER: "master",
    COACH: "coach"
  } as const;
  
  // Start conversation rules
  export const startConversationRules = {
    [END_USER_ENUM.MASTER]: [],
    [END_USER_ENUM.ADMIN]: [
      END_USER_ENUM.ADMIN,
      END_USER_ENUM.TEACHER,
      END_USER_ENUM.PARENT,
      END_USER_ENUM.STUDENT
    ],
    [END_USER_ENUM.TEACHER]: [END_USER_ENUM.ADMIN],
    [END_USER_ENUM.STUDENT]: [],
    [END_USER_ENUM.PARENT]: [],
    [END_USER_ENUM.COACH]: []
  } as const;
  
  // Education department enum
  export const EDUCATION_DEPARTMENT_ENUM = {
    ARIANA: "أريانة",
    BEJA: "باجة",
    BEN_AROUS: "بن عروس",
    BIZERTE: "بنزرت",
    GABES: "قابس",
    GAFSA: "قفصة",
    JENDOUBA: "جندوبة",
    KAIROUAN: "القيروان",
    KASSERINE: "القصرين",
    KEBILI: "قبلي",
    KEF: "الكاف",
    MAHDIA: "المهدية",
    MANOUBA: "منوبة",
    MEDENINE: "مدنين",
    MONASTIR: "المنستير",
    NABEUL: "نابل",
    SFAX: "صفاقس",
    SIDI_BOUZID: "سيدي بوزيد",
    SILIANA: "سليانة",
    SOUSSE: "سوسة",
    TATAOUINE: "تطاوين",
    TOZEUR: "توزر",
    TUNIS: "تونس",
    ZAGHOUAN: "زغوان"
  } as const;
  
  // Instance type enum
  export const INSTANCE_TYPE_ENUM = {
    TUNISIAN: "TUNISIAN",
    CAMBRIDGE: "CAMBRIDGE",
    IB: "IB"
  } as const;
  
  // Grade report theme enum
  export const GRADE_REPORT_THEM_ENUM = {
    YELLOW: "yellow",
    BLUE: "blue"
  } as const;
  
  // Feature flags enum
  export const FEATURE_FLAGS_ENUM = {
    MESSAGES: "messages",
    ANNOUNCEMENTS: "announcements",
    SMART_CALENDAR: "smartCalendar",
    TUTORIALS: "tutorials",
    DARK_MODE: "darkMode",
    LMS: "lms"
  } as const;
  
  // Admin routes
  export const addAdminByAdminRoute: RouteConfig = {
    path: "/admin",
    method: "POST",
    paramsKey: []
  };
  
  export const getAdminByNewIdByAdminRoute: RouteConfig = {
    path: "/admins/:adminNewId",
    method: "GET",
    paramsKey: ["adminNewId"]
  };
  
  export const listAdminsByAdminRoute: RouteConfig = {
    path: "/admins",
    method: "GET",
    paramsKey: []
  };
  
  export const updateAdminByAdminRoute: RouteConfig = {
    path: "/admins/:adminNewId",
    method: "PATCH",
    paramsKey: ["adminNewId"]
  };
  
  // Archive routes
  export const archiveAdminByAdminRoute: RouteConfig = {
    path: "/admins/:adminNewId/archive",
    method: "PUT",
    paramsKey: ["adminNewId"]
  };
  
  export const archiveParentByAdminRoute: RouteConfig = {
    path: "/parents/:parentNewId/archive",
    method: "PUT",
    paramsKey: ["parentNewId"]
  };
  
  export const archiveStudentByAdminRoute: RouteConfig = {
    path: "/students/:studentNewId/archive",
    method: "PUT",
    paramsKey: ["studentNewId"]
  };
  
  export const archiveTeacherByAdminRoute: RouteConfig = {
    path: "/teachers/:teacherNewId/archive",
    method: "PUT",
    paramsKey: ["teacherNewId"]
  };
  
  export const unArchiveAdminByAdminRoute: RouteConfig = {
    path: "/admins/:adminNewId/unarchive",
    method: "PUT",
    paramsKey: ["adminNewId"]
  };
  
  export const unArchiveParentByAdminRoute: RouteConfig = {
    path: "/parents/:parentNewId/unarchive",
    method: "PUT",
    paramsKey: ["parentNewId"]
  };
  
  export const unArchiveStudentByAdminRoute: RouteConfig = {
    path: "/students/:studentNewId/unarchive",
    method: "PUT",
    paramsKey: ["studentNewId"]
  };
  
  export const unArchiveTeacherByAdminRoute: RouteConfig = {
    path: "/teachers/:teacherNewId/unarchive",
    method: "PUT",
    paramsKey: ["teacherNewId"]
  };
  
  // Authentication routes
  export const forgetPasswordRoute: RouteConfig = {
    path: "/forget-password",
    method: "POST",
    paramsKey: []
  };
  
  export const getCurrentUserRoute: RouteConfig = {
    path: "/me",
    method: "GET",
    paramsKey: []
  };
   
  
  export const loginByStudentRoute: RouteConfig = {
    path: "/login",
    method: "POST",
    paramsKey: []
  };
  
  export const logoutRoute: RouteConfig = {
    path: "/logout",
    method: "PATCH",
    paramsKey: []
  };
  
  export const resetPasswordRoute: RouteConfig = {
    path: "/reset-password",
    method: "POST",
    paramsKey: []
  };
  
  export const updateCurrentUserPasswordRoute: RouteConfig = {
    path: "/password",
    method: "PATCH",
    paramsKey: []
  };
  
  export const verifyCodeRoute: RouteConfig = {
    path: "/verify-code",
    method: "POST",
    paramsKey: []
  };
  
  export const getCurrentUserByAdminRoute: RouteConfig = {
    path: "/me",
    method: "GET",
    paramsKey: []
  };
  
  export const resendInvitationByAdminRoute: RouteConfig = {
    path: "/users/resend-invitation",
    method: "POST",
    paramsKey: []
  };
  
  export const resetUserPasswordByAdminRoute: RouteConfig = {
    path: "/users/password",
    method: "PATCH",
    paramsKey: []
  };
  
  export const switchToUserByAdminRoute: RouteConfig = {
    path: "/switch-to-user",
    method: "POST",
    paramsKey: []
  };
  
  export const getCurrentUserByMasterRoute: RouteConfig = {
    path: "/me",
    method: "GET",
    paramsKey: []
  };
  
  export const loginByMasterRoute: RouteConfig = {
    path: "/login",
    method: "POST",
    paramsKey: []
  };
  
  export const getCurrentUserByStudentRoute: RouteConfig = {
    path: "/me",
    method: "GET",
    paramsKey: []
  };
  
  export const getCurrentUserByTeacherRoute: RouteConfig = {
    path: "/me",
    method: "GET",
    paramsKey: []
  };
  
  // Authorization routes
  export const listRolesByAdminRoute: RouteConfig = {
    path: "/roles",
    method: "GET",
    paramsKey: []
  };
  
  export const addRoleByMasterRoute: RouteConfig = {
    path: "/roles",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteRoleByMasterRoute: RouteConfig = {
    path: "/roles/:roleNewId",
    method: "DELETE",
    paramsKey: ["roleNewId"]
  };
  
  export const getOneRoleByMasterRoute: RouteConfig = {
    path: "/roles/:roleNewId",
    method: "GET",
    paramsKey: ["roleNewId"]
  };
  
  export const listRolesByMasterRoute: RouteConfig = {
    path: "/roles",
    method: "GET",
    paramsKey: []
  };
  
  export const updateRoleByMasterRoute: RouteConfig = {
    path: "/roles/:roleNewId",
    method: "PATCH",
    paramsKey: ["roleNewId"]
  };
  
  // Class management routes
  export const getGroupsOfClassByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId/groups",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getClassOverviewRoute: RouteConfig = {
    path: "/classes/:classNewId/overview",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getStudentsOfClassRoute: RouteConfig = {
    path: "/class/:classNewId/student-list",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getTeacherClassAndGroupsRoute: RouteConfig = {
    path: "/classes",
    method: "GET",
    paramsKey: []
  };
  
  export const listClassesRoute: RouteConfig = {
    path: "/list/classes",
    method: "GET",
    paramsKey: []
  };
  
  export const AssignStudentToClassByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/assign-students",
    method: "POST",
    paramsKey: ["classNewId"]
  };
  
  export const addClassByAdminRoute: RouteConfig = {
    path: "/class",
    method: "POST",
    paramsKey: []
  };
  
  export const assignTeacherToSubSubjectInClassByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/subject/assign-teacher",
    method: "PATCH",
    paramsKey: ["classNewId"]
  };
  
  export const assignTeacherToSubjectInClassByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId/subject/assign-teacher",
    method: "PATCH",
    paramsKey: ["classNewId"]
  };
  
  export const deleteClassByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId",
    method: "DELETE",
    paramsKey: ["classNewId"]
  };
  
  export const getClassDashboardByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/dashboard",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getClassListByAdminRoute: RouteConfig = {
    path: "/sub-level/:subLevelNewId/class-list",
    method: "GET",
    paramsKey: ["subLevelNewId"]
  };
  
  export const getStudentsCodeBarePdfByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId/students-code-bare-pdf",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getSubjectsOfClassByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/subjects",
    method: "GET",
    paramsKey: ["classNewId"]
  };
  
  export const getTeacherClassAndGroupsByAdminRoute: RouteConfig = {
    path: "/teachers/:teacherNewId/classes",
    method: "GET",
    paramsKey: ["teacherNewId"]
  };
  
  export const listClassesByAdminRoute: RouteConfig = {
    path: "/classes",
    method: "GET",
    paramsKey: []
  };
  
  export const unAssignStudentFromClassByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/unassign-students",
    method: "PATCH",
    paramsKey: ["classNewId"]
  };
  
  export const unAssignTeacherFromSubSubjectByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId/sub-subjects/:subSubjectTypeId/unassign-teacher",
    method: "PATCH",
    paramsKey: ["classNewId", "subSubjectTypeId"]
  };
  
  export const unAssignTeacherFromSubjectByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId/subjects/:subjectTypeId/unassign-teacher",
    method: "PATCH",
    paramsKey: ["classNewId", "subjectTypeId"]
  };
  
  export const updateClassByAdminRoute: RouteConfig = {
    path: "/classes/:classNewId",
    method: "PATCH",
    paramsKey: ["classNewId"]
  };
  
  export const updateStudentGroupByAdminRoute: RouteConfig = {
    path: "/class/:classNewId/student/:studentNewId/group",
    method: "PUT",
    paramsKey: ["classNewId", "studentNewId"]
  };
  
  export const getClassListByTeacherRoute: RouteConfig = {
    path: "/classes/list",
    method: "GET",
    paramsKey: []
  };
  
  // Class types routes
  export const addClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types",
    method: "POST",
    paramsKey: []
  };
  
  export const addFieldToClassTypeByAdminRoute: RouteConfig = {
    path: "/classType/:classTypeNewId/fields",
    method: "POST",
    paramsKey: ["classTypeNewId"]
  };
  
  export const addSubSubjectToClassTypeByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/subSubjects",
    method: "POST",
    paramsKey: ["classTypeNewId", "subjectTypeNewId"]
  };
  
  export const addSubjectToClassTypeByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/subjects",
    method: "POST",
    paramsKey: ["classTypeNewId"]
  };
  
  export const deleteClassTypeByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId",
    method: "DELETE",
    paramsKey: ["classTypeNewId"]
  };
  
  export const deleteFieldFromClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId/fields/:fieldIndex",
    method: "DELETE",
    paramsKey: ["classTypeNewId", "fieldIndex"]
  };
  
  export const deleteSubSubjectFromClassTypeByAdminRoute: RouteConfig = {
    path: "/classType/:classTypeNewId/subSubjects/:subSubjectNewId",
    method: "DELETE",
    paramsKey: ["classTypeNewId", "subSubjectNewId"]
  };
  
  export const deleteSubjectFromClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId/subjects/:subjectTypeNewId",
    method: "DELETE",
    paramsKey: ["classTypeNewId", "subjectTypeNewId"]
  };
  
  export const getClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId",
    method: "GET",
    paramsKey: ["classTypeNewId"]
  };
  
  export const getFieldsOfClassTypeByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/fields",
    method: "POST",
    paramsKey: ["classTypeNewId"]
  };
  
  export const getSubjectsOfClassTypesByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/subjects",
    method: "GET",
    paramsKey: ["classTypeNewId"]
  };
  
  export const listClassTypesByAdminRoute: RouteConfig = {
    path: "/class-types",
    method: "GET",
    paramsKey: []
  };
  
  export const listNextClassTypesByAdminRoute: RouteConfig = {
    path: "/next-classTypes",
    method: "GET",
    paramsKey: []
  };
  
  export const reorderFieldsOfClassTypesByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/fields/reorder",
    method: "POST",
    paramsKey: ["classTypeNewId"]
  };
  
  export const reorderSubSubjectsOfClassTypesByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/reorder",
    method: "PATCH",
    paramsKey: ["classTypeNewId", "subjectTypeNewId"]
  };
  
  export const reorderSubjectsOfClassTypesByAdminRoute: RouteConfig = {
    path: "/classTypes/:classTypeNewId/subjects/reorder",
    method: "PATCH",
    paramsKey: ["classTypeNewId"]
  };
  
  export const updateClassTypeByAdminRoute: RouteConfig = {
    path: "/classType/:classTypeNewId",
    method: "PATCH",
    paramsKey: ["classTypeNewId"]
  };
  
  export const updateFieldOfClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId/fields/:fieldRank",
    method: "PATCH",
    paramsKey: ["classTypeNewId", "fieldRank"]
  };
  
  export const updateSubSubjectOfClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId/sub-subjects/:subSubjectNewId",
    method: "PATCH",
    paramsKey: ["classTypeNewId", "subSubjectNewId"]
  };
  
  export const updateSubjectOfClassTypeByAdminRoute: RouteConfig = {
    path: "/class-types/:classTypeNewId/subject-types/:subjectTypeNewId",
    method: "PATCH",
    paramsKey: ["classTypeNewId", "subjectTypeNewId"]
  };
  
  export const listClassTypesByPublicRoute: RouteConfig = {
    path: "/class-types",
    method: "GET",
    paramsKey: []
  };
  
  export const listClassTypesByTeacherRoute: RouteConfig = {
    path: "/class-types",
    method: "GET",
    paramsKey: []
  };
  
  // Classroom routes
  export const addClassroomByAdminRoute: RouteConfig = {
    path: "/classrooms",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteClassroomByAdminRoute: RouteConfig = {
    path: "/classrooms/:classroomNewId",
    method: "DELETE",
    paramsKey: ["classroomNewId"]
  };
  
  export const getAvailableClassroomByAdminRoute: RouteConfig = {
    path: "/classrooms/available",
    method: "GET",
    paramsKey: []
  };
  
  export const getAvailableClassroomInWeeklySessionByAdminRoute: RouteConfig = {
    path: "/weekly-sessions/classrooms/available",
    method: "GET",
    paramsKey: []
  };
  
  export const listClassroomsByAdminRoute: RouteConfig = {
    path: "/classrooms",
    method: "GET",
    paramsKey: []
  };
  
  export const updateClassroomByAdminRoute: RouteConfig = {
    path: "/classrooms/:classroomNewId",
    method: "PATCH",
    paramsKey: ["classroomNewId"]
  };
  
  // Dashboard routes
  export const getDashboardByAdminRoute: RouteConfig = {
    path: "/dashboard",
    method: "GET",
    paramsKey: []
  };
  
  export const getDashboardByParentRoute: RouteConfig = {
    path: "/dashboard",
    method: "GET",
    paramsKey: []
  };
  
  export const getDashboardByStudentRoute: RouteConfig = {
    path: "/dashboard",
    method: "GET",
    paramsKey: []
  };
  
  export const getDashboardByTeacherRoute: RouteConfig = {
    path: "/dashboard",
    method: "GET",
    paramsKey: []
  };
  
  // Group types routes
  export const addGroupTypeByAdminRoute: RouteConfig = {
    path: "/group-types",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteGroupTypeByAdminRoute: RouteConfig = {
    path: "/group-types/:groupTypeNewId",
    method: "DELETE",
    paramsKey: ["groupTypeNewId"]
  };
  
  export const listGroupTypesByAdminRoute: RouteConfig = {
    path: "/groups-types",
    method: "GET",
    paramsKey: []
  };
  
  export const updateGroupTypeByAdminRoute: RouteConfig = {
    path: "/group-types/:groupTypeNewId",
    method: "PATCH",
    paramsKey: ["groupTypeNewId"]
  };
  
  // Groups routes
  export const checkGroupRoute: RouteConfig = {
    path: "/groups/:groupNewId/isExist",
    method: "GET",
    paramsKey: ["groupNewId"]
  };
  
  export const getGroupOverviewRoute: RouteConfig = {
    path: "/groups/:groupNewId/overview",
    method: "GET",
    paramsKey: ["groupNewId"]
  };
  
  export const listGroupsRoute: RouteConfig = {
    path: "/list/groups",
    method: "GET",
    paramsKey: []
  };
  
  export const addGroupByAdminRoute: RouteConfig = {
    path: "/groups",
    method: "POST",
    paramsKey: []
  };
  
  export const assignStudentToGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId/assign-students",
    method: "PATCH",
    paramsKey: ["groupNewId"]
  };
  
  export const deleteGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId",
    method: "DELETE",
    paramsKey: ["groupNewId"]
  };
  
  export const getGroupListByAdminRoute: RouteConfig = {
    path: "/groups/list",
    method: "GET",
    paramsKey: []
  };
  
  export const getStudentsOfGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId/student-list",
    method: "GET",
    paramsKey: ["groupNewId"]
  };
  
  export const getTopicOfGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId/topics",
    method: "GET",
    paramsKey: ["groupNewId"]
  };
  
  export const listGroupsByAdminRoute: RouteConfig = {
    path: "/groups",
    method: "GET",
    paramsKey: []
  };
  
  export const listUnenrolledStudentsForGroupByAdminRoute: RouteConfig = {
    path: "/groups/unenrolled-students",
    method: "GET",
    paramsKey: []
  };
  
  export const unassignStudentFromGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId/unassign-students",
    method: "PATCH",
    paramsKey: ["groupNewId"]
  };
  
  export const updateGroupByAdminRoute: RouteConfig = {
    path: "/groups/:groupNewId",
    method: "PATCH",
    paramsKey: ["groupNewId"]
  };
  
  // Level management routes
  export const addLevelByAdminRoute: RouteConfig = {
    path: "/levels",
    method: "POST",
    paramsKey: []
  };
  
  export const updateLevelByAdminRoute: RouteConfig = {
    path: "/levels/:levelNewId",
    method: "PATCH",
    paramsKey: ["levelNewId"]
  };
  
  export const deleteLevelByAdminRoute: RouteConfig = {
    path: "/levels/:levelNewId",
    method: "DELETE",
    paramsKey: ["levelNewId"]
  };
  
  export const getLevelsOverviewByAdminRoute: RouteConfig = {
    path: "/levels/overview",
    method: "GET",
    paramsKey: []
  };
  
  export const listLevelsByAdminRoute: RouteConfig = {
    path: "/levels",
    method: "GET",
    paramsKey: []
  };
  
  export const reorderLevelsByAdminRoute: RouteConfig = {
    path: "/levels/:levelNewId/reorder",
    method: "PATCH",
    paramsKey: ["levelNewId"]
  };
  
  export const listLevelsByPublicRoute: RouteConfig = {
    path: "/levels",
    method: "GET",
    paramsKey: []
  };
  
  // Master routes
  export const addMasterByMasterRoute: RouteConfig = {
    path: "/masters",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteMasterByMasterRoute: RouteConfig = {
    path: "/masters/:masterNewId",
    method: "DELETE",
    paramsKey: ["masterNewId"]
  };
  
  export const getAppVersionByMasterRoute: RouteConfig = {
    path: "/app-versions",
    method: "GET",
    paramsKey: []
  };
  
  export const listMastersByMasterRoute: RouteConfig = {
    path: "/masters",
    method: "GET",
    paramsKey: []
  };
  
  export const updateAppVersionByMasterRoute: RouteConfig = {
    path: "/app-versions",
    method: "PATCH",
    paramsKey: []
  };
  
  export const updateMasterByMasterRoute: RouteConfig = {
    path: "/masters/:masterNewId",
    method: "PATCH",
    paramsKey: ["masterNewId"]
  };
  
  export const getAppVersionByPublicRoute: RouteConfig = {
    path: "/app-versions",
    method: "GET",
    paramsKey: []
  };
  
  // Message routes
  export const AddMessageRoute: RouteConfig = {
    path: "/messages",
    method: "POST",
    paramsKey: []
  };
  
  export const AddReactToMessageRoute: RouteConfig = {
    path: "/messages/:messageNewId/react",
    method: "PUT",
    paramsKey: ["messageNewId"]
  };
  
  export const GetMessageReactionsRoute: RouteConfig = {
    path: "/messages/:messageNewId/reactions",
    method: "GET",
    paramsKey: ["messageNewId"]
  };
  
  export const addParticipantToGroupRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/add-participant-members",
    method: "POST",
    paramsKey: ["conversationNewId"]
  };
  
  export const deleteMessageRoute: RouteConfig = {
    path: "/messages/:messageNewId",
    method: "DELETE",
    paramsKey: ["messageNewId"]
  };
  
  export const deleteParticipantFromGroupRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/remove-participant-members",
    method: "PUT",
    paramsKey: ["conversationNewId"]
  };
  
  export const getMessageTargetUsersRoute: RouteConfig = {
    path: "/conversations/target-users",
    method: "GET",
    paramsKey: []
  };
  
  export const getOneConversationRoute: RouteConfig = {
    path: "/conversations/:conversationNewId",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const getOneConversationMessagesRoute: RouteConfig = {
    path: "/conversation",
    method: "POST",
    paramsKey: []
  };
  
  export const listConversationAttachmentsRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/attachments",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const listConversationLinksRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/links",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const listConversationMessagesRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/messages",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const listConversationMultimediaRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/multimedia",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const listConversationParticipantsRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/participants",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const listConversationsRoute: RouteConfig = {
    path: "/conversations",
    method: "GET",
    paramsKey: []
  };
  
  export const listTargetUsersForGroupConversationAssignmentRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/target-users",
    method: "GET",
    paramsKey: ["conversationNewId"]
  };
  
  export const updateConversationNameRoute: RouteConfig = {
    path: "/conversations/:conversationNewId/name",
    method: "PATCH",
    paramsKey: ["conversationNewId"]
  };
  
  export const updateConversationSeenStatuesRoute: RouteConfig = {
    path: "/conversations/:conversationId/seen",
    method: "PATCH",
    paramsKey: ["conversationId"]
  };
  
  // Notification routes
  export const listNotificationsRoute: RouteConfig = {
    path: "/notifications",
    method: "GET",
    paramsKey: []
  };
  
  // Parent routes
  export const GetChildAttendanceStatsRoute: RouteConfig = {
    path: "/students/:studentNewId/attendance-stats",
    method: "GET",
    paramsKey: ["studentNewId"]
  };
  
  export const addParentByAdminRoute: RouteConfig = {
    path: "/parent",
    method: "POST",
    paramsKey: []
  };
  
  export const getParentByNewIdByAdminRoute: RouteConfig = {
    path: "/parents/:parentNewId",
    method: "GET",
    paramsKey: ["parentNewId"]
  };
  
  export const listParentsByAdminRoute: RouteConfig = {
    path: "/parents",
    method: "GET",
    paramsKey: []
  };
  
  export const updateParentByAdminRoute: RouteConfig = {
    path: "/parents/:parentNewId",
    method: "PATCH",
    paramsKey: ["parentNewId"]
  };
  
  export const getChildrenOfParentsByParentRoute: RouteConfig = {
    path: "/children",
    method: "GET",
    paramsKey: []
  };
  
  // Schedule routes
  export const getScheduleRoute: RouteConfig = {
    path: "/schedule",
    method: "GET",
    paramsKey: []
  };
  
  export const getWeeklyScheduleRoute: RouteConfig = {
    path: "/weekly-schedule",
    method: "GET",
    paramsKey: []
  };
  
  export const applyWeeklyScheduleForClassByAdminRoute: RouteConfig = {
    path: "/class/apply-weekly-schedule",
    method: "POST",
    paramsKey: []
  };
  
  export const applyWeeklyScheduleForGroupByAdminRoute: RouteConfig = {
    path: "/group/apply-weekly-schedule",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteSessionByAdminRoute: RouteConfig = {
    path: "/sessions/:sessionNewId",
    method: "DELETE",
    paramsKey: ["sessionNewId"]
  };
  
  export const getDraftWeeklyScheduleByAdminRoute: RouteConfig = {
    path: "/draft-weekly-schedule",
    method: "GET",
    paramsKey: []
  };
  
  export const getEntityScheduleByAdminRoute: RouteConfig = {
    path: "/schedule/entity",
    method: "GET",
    paramsKey: []
  };
  
  // School year routes
  export const listSchoolYearByAdminRoute: RouteConfig = {
    path: "/school-years",
    method: "GET",
    paramsKey: []
  };
  
  export const updateSchoolYearByAdminRoute: RouteConfig = {
    path: "/school-years/:schoolYearNewId",
    method: "PATCH",
    paramsKey: ["schoolYearNewId"]
  };
  
  // School routes
  export const getSchoolDetailsByAdminRoute: RouteConfig = {
    path: "/school-information",
    method: "GET",
    paramsKey: []
  };
  
  export const updateSchoolByAdminRoute: RouteConfig = {
    path: "/school",
    method: "PATCH",
    paramsKey: []
  };
  
  export const addSchoolByMasterRoute: RouteConfig = {
    path: "/schools",
    method: "POST",
    paramsKey: []
  };
  
  export const listSchoolsByMasterRoute: RouteConfig = {
    path: "/schools",
    method: "GET",
    paramsKey: []
  };
  
  export const switchShoolByMasterRoute: RouteConfig = {
    path: "/schools/:schoolNewId/switch",
    method: "POST",
    paramsKey: ["schoolNewId"]
  };
  
  export const updateFlagsByMasterRoute: RouteConfig = {
    path: "/schools/:schoolNewId/flags",
    method: "PATCH",
    paramsKey: ["schoolNewId"]
  };
  
  export const updateSchoolByMasterRoute: RouteConfig = {
    path: "/schools/:schoolNewId",
    method: "PATCH",
    paramsKey: ["schoolNewId"]
  };
  
  export const updateSmsSoldByMasterRoute: RouteConfig = {
    path: "/schools/:schoolId/sms-sold",
    method: "PATCH",
    paramsKey: ["schoolId"]
  };
  
  export const getSchoolConfigByPublicRoute: RouteConfig = {
    path: "/schools/:subdomain/config",
    method: "GET",
    paramsKey: ["subdomain"]
  };
  
  export const getSchoolLogoByPublicRoute: RouteConfig = {
    path: "/schools/:schoolId/logo",
    method: "GET",
    paramsKey: ["schoolId"]
  };
  
  export const getSchoolSignatureByPublicRoute: RouteConfig = {
    path: "/schools/:schoolId/signature",
    method: "GET",
    paramsKey: ["schoolId"]
  };
  
  // Session management routes
  export const closeSessionRoute: RouteConfig = {
    path: "/close-session/:sessionNewId",
    method: "PATCH",
    paramsKey: ["sessionNewId"]
  };
  
  export const confirmAttendanceRoute: RouteConfig = {
    path: "/session/:sessionNewId/confirm-attendance",
    method: "POST",
    paramsKey: ["sessionNewId"]
  };
  
  export const getSessionDetailsRoute: RouteConfig = {
    path: "/sessions/:sessionNewId",
    method: "GET",
    paramsKey: ["sessionNewId"]
  };
  
  export const startSessionRoute: RouteConfig = {
    path: "/start-session/:sessionNewId",
    method: "PATCH",
    paramsKey: ["sessionNewId"]
  };
  
  export const updateSessionDetailsRoute: RouteConfig = {
    path: "/session/:sessionNewId/edit",
    method: "PUT",
    paramsKey: ["sessionNewId"]
  };
  
  export const addSessionForClassByAdminRoute: RouteConfig = {
    path: "/sessions",
    method: "POST",
    paramsKey: []
  };
  
  export const addSessionForGroupByAdminRoute: RouteConfig = {
    path: "/groups/sessions",
    method: "POST",
    paramsKey: []
  };
  
  export const cancelSessionByAdminRoute: RouteConfig = {
    path: "/session/:sessionNewId/cancel",
    method: "PUT",
    paramsKey: ["sessionNewId"]
  };
  
  export const updateSessionForClassByAdminRoute: RouteConfig = {
    path: "/session/:sessionNewId",
    method: "PATCH",
    paramsKey: ["sessionNewId"]
  };
  
  export const updateSessionForGroupByAdminRoute: RouteConfig = {
    path: "/groups/sessions/:sessionNewId",
    method: "PATCH",
    paramsKey: ["sessionNewId"]
  };
  
  export const updateSessionStatusByAdminRoute: RouteConfig = {
    path: "/session/:sessionNewId/change-status",
    method: "PATCH",
    paramsKey: ["sessionNewId"]
  };
  
  // Session type routes
  export const DeleteSessionTypeByAdminRoute: RouteConfig = {
    path: "/session-types/:sessionTypeNewId",
    method: "DELETE",
    paramsKey: ["sessionTypeNewId"]
  };
  
  export const addSessionTypeByAdminRoute: RouteConfig = {
    path: "/session-types",
    method: "POST",
    paramsKey: []
  };
  
  export const listSessionTypeByAdminRoute: RouteConfig = {
    path: "/session-types",
    method: "GET",
    paramsKey: []
  };
  
  export const updateSessionTypeByAdminRoute: RouteConfig = {
    path: "/session-types/:sessionTypeNewId",
    method: "PATCH",
    paramsKey: ["sessionTypeNewId"]
  };
  
  // Student routes
  export const getStudentProfileRoute: RouteConfig = {
    path: "/profile",
    method: "GET",
    paramsKey: []
  };
  
  export const addStudentByAdminRoute: RouteConfig = {
    path: "/student",
    method: "POST",
    paramsKey: []
  };
  
  export const getStudentAttendanceCertificateByAdminRoute: RouteConfig = {
    path: "/students/:studentNewId/attendance-certificate",
    method: "GET",
    paramsKey: ["studentNewId"]
  };
  
  export const getStudentProfileByAdminRoute: RouteConfig = {
    path: "/students/:studentNewId/profile",
    method: "GET",
    paramsKey: ["studentNewId"]
  };
  
  export const importStudentsByAdminRoute: RouteConfig = {
    path: "/students/import",
    method: "POST",
    paramsKey: []
  };
  
  export const listStudentsByAdminRoute: RouteConfig = {
    path: "/students",
    method: "GET",
    paramsKey: []
  };
  
  export const listUnenrolledStudentsByAdminRoute: RouteConfig = {
    path: "/unenrolled-students",
    method: "GET",
    paramsKey: []
  };
  
  export const switchStudentsClassByAdminRoute: RouteConfig = {
    path: "/switch-students-class",
    method: "PATCH",
    paramsKey: []
  };
  
  export const toggleUserActivationByAdminRoute: RouteConfig = {
    path: "/users/activation",
    method: "PATCH",
    paramsKey: []
  };
  
  export const updateStudentByAdminRoute: RouteConfig = {
    path: "/students/:studentNewId",
    method: "PATCH",
    paramsKey: ["studentNewId"]
  };
  
  // Sub-level routes
  export const addSubLevelByAdminRoute: RouteConfig = {
    path: "/subLevel",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteSubLevelByAdminRoute: RouteConfig = {
    path: "/subLevels/:subLevelNewId",
    method: "DELETE",
    paramsKey: ["subLevelNewId"]
  };
  
  export const listSubLevelsByAdminRoute: RouteConfig = {
    path: "/sub-levels",
    method: "GET",
    paramsKey: []
  };
  
  export const reorderSubLevelsByAdminRoute: RouteConfig = {
    path: "/sub-levels/:subLevelNewId/reorder",
    method: "PATCH",
    paramsKey: ["subLevelNewId"]
  };
  
  export const updateSubLevelByAdminRoute: RouteConfig = {
    path: "/subLevels/:subLevelNewId",
    method: "PATCH",
    paramsKey: ["subLevelNewId"]
  };
  
  // Sub-subject type routes
  export const addSubSubjectTypeByAdminRoute: RouteConfig = {
    path: "/sub-subject-types",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteSubSubjectTypeByAdminRoute: RouteConfig = {
    path: "/sub-subject-type/:subSubjectTypeNewId",
    method: "DELETE",
    paramsKey: ["subSubjectTypeNewId"]
  };
  
  export const listSubSubjectTypesByAdminRoute: RouteConfig = {
    path: "/sub-subject-types",
    method: "GET",
    paramsKey: []
  };
  
  export const updateSubSubjectTypeByAdminRoute: RouteConfig = {
    path: "/sub-subject-types/:subSubjectTypeNewId",
    method: "PATCH",
    paramsKey: ["subSubjectTypeNewId"]
  };
  
  // Subject type routes
  export const addSubjectTypeByAdminRoute: RouteConfig = {
    path: "/subject-types",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteSubjectTypeByAdminRoute: RouteConfig = {
    path: "/subject-types/:subjectTypeNewId",
    method: "DELETE",
    paramsKey: ["subjectTypeNewId"]
  };
  
  export const listSubjectTypesByAdminRoute: RouteConfig = {
    path: "/subject-types",
    method: "GET",
    paramsKey: []
  };
  
  export const updateSubjectTypeByAdminRoute: RouteConfig = {
    path: "/subject-types/:subjectTypeNewId",
    method: "PATCH",
    paramsKey: ["subjectTypeNewId"]
  };
  
  // Teacher routes
  export const getTeacherProfileRoute: RouteConfig = {
    path: "/profile",
    method: "GET",
    paramsKey: []
  };
  
  export const addTeacherByAdminRoute: RouteConfig = {
    path: "/teacher",
    method: "POST",
    paramsKey: []
  };
  
  export const getTeacherProfileByAdminRoute: RouteConfig = {
    path: "/teachers/:teacherNewId/profile",
    method: "GET",
    paramsKey: ["teacherNewId"]
  };
  
  export const listTeachersByAdminRoute: RouteConfig = {
    path: "/teachers",
    method: "GET",
    paramsKey: []
  };
  
  export const updateTeacherByAdminRoute: RouteConfig = {
    path: "/teachers/:teacherNewId",
    method: "PATCH",
    paramsKey: ["teacherNewId"]
  };
  
  // User routes
  export const uploadAvatarRoute: RouteConfig = {
    path: "/avatar",
    method: "PATCH",
    paramsKey: []
  };
  
  // Weekly session routes
  export const addWeeklySessionForClassByAdminRoute: RouteConfig = {
    path: "/class/weekly-sessions",
    method: "POST",
    paramsKey: []
  };
  
  export const addWeeklySessionForGroupByAdminRoute: RouteConfig = {
    path: "/groups/weekly-sessions",
    method: "POST",
    paramsKey: []
  };
  
  export const deleteWeeklySessionByAdminRoute: RouteConfig = {
    path: "/weekly-session/:weeklySessionNewId",
    method: "DELETE",
    paramsKey: ["weeklySessionNewId"]
  };
  
  export const updateWeeklySessionForClassByAdminRoute: RouteConfig = {
    path: "/class/weekly-sessions/:weeklySessionNewId",
    method: "PATCH",
    paramsKey: ["weeklySessionNewId"]
  };
  
  export const updateWeeklySessionForGroupByAdminRoute: RouteConfig = {
    path: "/groups/weekly-sessions/:weeklySessionNewId",
    method: "PATCH",
    paramsKey: ["weeklySessionNewId"]
  };
  