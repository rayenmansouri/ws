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
export const HOUR_TO_MILLISECOND = 1000 * 3600;
export const MINUTES_TO_MILLISECOND = 60 * 1000;
export const MONTH_TO_MILLISECOND = 30 * DAY_TO_MILLISECOND;
export const MINUTES_IN_HOUR = 60;

export const entitiesInFrench = {
  admin: "administrateur",
  student: "élève",
  parent: "parent",
  teacher: "enseignant",
  master: "master",
};
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
