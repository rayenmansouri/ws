export const ENVIRONMENT_ENUM = {
  DEV: "development",
  STAGING: "staging",
  PROD: "production",
  LOCAL: "local",
  TEST: "test",
} as const;

export type TEnvironmentEnum = (typeof ENVIRONMENT_ENUM)[keyof typeof ENVIRONMENT_ENUM];

export const ErrorsCode = {
  MONGODB_DUPLICATE_ERROR_CODE: 11000,
  MONGODB_WRITE_CONFLICT_ERROR_CODE: 112,
};

export const DAY_TO_MILLISECOND = 1000 * 3600 * 24;
// Removed unused time constants

export const entitiesInFrench = {
  admin: "administrateur",
  student: "élève",
  parent: "parent",
  teacher: "enseignant",
  master: "master",
};
// Removed unused monthNames array

export const SCHEDULE_ENTITY_ENUM = {
  TEACHER: "teacher",
  STUDENT: "student",
  CLASSROOM: "classroom",
  GROUP: "group",
  CLASS: "class",
  CLASS_GROUP: "classGroup",
} as const;
export type TScheduleEntityEnum = (typeof SCHEDULE_ENTITY_ENUM)[keyof typeof SCHEDULE_ENTITY_ENUM];

export const ALLOWED_VIDEO_EXTENSIONS = ["mp4", "avi", "mov", "wmv", "mkv", "flv", "webm"];

export const TOPIC_TYPE_ENUM = {
  SUBJECT_TYPE: "subjectType",
  SUB_SUBJECT_TYPE: "subSubjectType",
  GROUP: "group",
  FIELD: "field",
} as const;
export type TTopicTypeEnum = (typeof TOPIC_TYPE_ENUM)[keyof typeof TOPIC_TYPE_ENUM];
