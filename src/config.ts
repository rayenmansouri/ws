import dotenv from "dotenv";
import { ENVIRONMENT_ENUM, TEnvironmentEnum } from "./helpers/constants";
import { FRONT_URLS } from "./constants/frontUrls";

if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) dotenv.config();
export const environment = (process.env.NODE_ENV as TEnvironmentEnum) || ENVIRONMENT_ENUM.DEV;

export const port = process.env.PORT;
export const baseUrl = process.env.BASE_API_ENDPOINT;
export const frontUrl = FRONT_URLS[environment];

export const internalPort = process.env.INTERNAL_PORT;
export const internalBaseUrl = process.env.INTERNAL_BASE_API_ENDPOINT;

export const fetSmartCalendarUrl = process.env.SMART_CALENDAR_ENDPOINT;

export const smsExpiresIn = process.env.SMS_EXPIRES_IN!;

export const databaseUser = process.env.DATABASE_USER;
export const databasePassword = process.env.DATABASE_PASSWORD;
export const databaseBaseURI = process.env.DATABASE_BASE_URI;
export const database_secret = process.env.MONGODB_URI;
//process.env.DATABASE_BASE_URI?.split("//").join(
//  `//${databaseUser}:${databasePassword}@`,
//);
export const auth_db = "authSource=admin";
export const masterDBUri = `${database_secret}/master?${auth_db}`;
export const centralDBUri = `${database_secret}/central?${auth_db}`;

export const defaultAvatarUrl =
  "https://res.cloudinary.com/dfjh0nqb8/image/upload/v1685525139/default_1_tjknpf.svg";
export const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "12");

export const tokenSecret: string = process.env.JWT_SECRET || "";
export const tokenExpireIn = process.env.JWT_EXPIRES_IN;
export const forgetPasswordSecret: string = process.env.JWT_SECRET || "";
export const forgetPasswordExpireIn = process.env.JWT_EXPIRES_IN;
export const tokenMasterSecret: string = process.env.JWT_MASTER_SECRET || "";
export const MasterTokenExpireIn = process.env.JWT_MASTER_EXPIRES_IN;

export const webschoolEmail = "webschool@info.com";

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
