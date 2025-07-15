import { ENVIRONMENT_ENUM, TEnvironmentEnum } from "../helpers/constants";

export const FRONT_URLS: Partial<Record<TEnvironmentEnum, string>> = {
  [ENVIRONMENT_ENUM.DEV]: "https://SUBDOMAIN.webschoool.com",
  [ENVIRONMENT_ENUM.LOCAL]: "https://SUBDOMAIN.webschoool.com",
  [ENVIRONMENT_ENUM.STAGING]: "https://SUBDOMAIN.staging.webschoool.com",
  [ENVIRONMENT_ENUM.PROD]: "https://SUBDOMAIN.webschool.tn",
};
