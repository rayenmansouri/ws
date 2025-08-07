export const FEATURE_FLAGS_ENUM = {
  MESSAGES: "messages",
  ANNOUNCEMENTS: "announcements",
  SMART_CALENDAR: "smartCalendar",
  TUTORIALS: "tutorials",
  DARK_MODE: "darkMode",
  LMS: "lms",
  LIBRARY: "library",
} as const;
export type TFeatureFlagsEnum = (typeof FEATURE_FLAGS_ENUM)[keyof typeof FEATURE_FLAGS_ENUM];
