import dotenv from "dotenv";
import { ENVIRONMENT_ENUM, TEnvironmentEnum } from "./helpers/constants";
import { FRONT_URLS } from "./constants/frontUrls";

if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) dotenv.config();
export const environment = process.env.NODE_ENV as TEnvironmentEnum;

// Removed unused exports: port, baseUrl
export const frontUrl = FRONT_URLS[environment];

// Removed unused exports: internalPort, internalBaseUrl, fetSmartCalendarUrl

export const smsExpiresIn = process.env.SMS_EXPIRES_IN!;

export const databaseUser = process.env.DATABASE_USER;
export const databasePassword = process.env.DATABASE_PASSWORD;
const databaseBaseURI = process.env.DATABASE_BASE_URI;
export const database_secret = process.env.DATABASE_BASE_URI?.split("//").join(
  `//${databaseUser}:${databasePassword}@`,
);
export const auth_db = "authSource=admin";
// Removed unused exports: masterDBUri, centralDBUri, defaultAvatarUrl
export const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "12");

export const port = process.env.PORT;
export const tokenSecret: string = process.env.JWT_SECRET || "";
export const tokenExpireIn = process.env.JWT_EXPIRES_IN;
export const tokenMasterSecret: string = process.env.JWT_MASTER_SECRET || "";
// Removed unused exports: forgetPasswordSecret, forgetPasswordExpireIn, MasterTokenExpireIn, webschoolEmail

export const emailService = {
  username: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
} as {
  username: string;
  password: string;
  host: string;
  port: string;
};

export const tunisieSmsCredentials = {
  key: process.env.SMS_KEY,
  prefix: process.env.SMS_PREFIX,
  sender: process.env.SMS_SENDER,
  fct: process.env.SMS_FCT,
  url: process.env.SMS_URI,
};

export const logsRetentionDays = +(process.env.LOGS_RETENTION_DAYS as string) || 7;

export const dropboxAppKey = process.env.DROPBOX_APP_KEY;
export const dropboxAppSecret = process.env.DROPBOX_APP_SECRET;
export const dropboxRefreshToken = process.env.DROPBOX_REFRESH_TOKEN;
export const dropboxBaseUri = process.env.DROPBOX_BASE_API_URI;
export const dropboxShareUri = process.env.DROPBOX_SHARE_LINK_BASE;

export const numberOfHoursBetweenBackups = +(process.env.NUMBER_OF_HOURS_BETWEEN_BACKUPS as string);
export const backupStartAt = +(process.env.BACKUP_START_AT as string);
export const backupEndAt = +(process.env.BACKUP_END_AT as string);
export const backupRetentionDays = +(process.env.BACKUP_RETENTION_DAYS as string);
export const shouldUploadBackup = Boolean(process.env.SHOULD_UPLOAD_BACKUP);

export const sentryDSN = process.env.SENTRY_DSN;
