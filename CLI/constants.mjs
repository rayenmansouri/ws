import path from "path";

export const USER_TYPES = ["master", "admin", "teacher", "student", "parent", "public"];

export const PLATFORMS = ["web", "mobile", "internal"];

export const PROJECT_DIRECTORY = path.join(__dirname, "..");

export const API_DIRECTORY = path.join(PROJECT_DIRECTORY, "src", "api-v2");

export const FEATURE_DIRECTORY = path.join(PROJECT_DIRECTORY, "src", "feature");

export const DATABASE_DIRECTORY = path.join(PROJECT_DIRECTORY, "src", "newDatabase", "mongo");

export const WEB_SCHOOL_TYPES_DIRECTORY = path.join(PROJECT_DIRECTORY, "iecd-types", "src");

export const USE_CASE_CONTAINER_PATH = path.join(
  PROJECT_DIRECTORY,
  "src",
  "core",
  "container",
  "registerUseCases.ts",
);
export const REPO_CONTAINER_PATH = path.join(
  PROJECT_DIRECTORY,
  "src",
  "core",
  "container",
  "registerUseRepos.ts",
);

export const CONTAINER_REGISTRY_PATH = path.join(
  PROJECT_DIRECTORY,
  "src",
  "core",
  "container",
  "containerRegistry.ts",
);
