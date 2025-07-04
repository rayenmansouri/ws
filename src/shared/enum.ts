export const ENVIRONMENT_ENUM = {
  DEV: "development",
  STAGING: "staging",
  PROD: "production",
  LOCAL: "local",
  TEST: "test",
} as const;

export type TEnvironmentEnum =
  (typeof ENVIRONMENT_ENUM)[keyof typeof ENVIRONMENT_ENUM];
