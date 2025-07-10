import dotenv from "dotenv";
import { TEnvironmentEnum, ENVIRONMENT_ENUM } from "./../enum";

export class ConfigService {
  private static _instance: ConfigService | null = null;
  public readonly environment: TEnvironmentEnum;
  public readonly port: string | undefined;
  public readonly database_secret: string | undefined;
  public readonly auth_db: string | undefined;
  public readonly tokenSecret: string | undefined;
  public readonly dropboxAppKey: string | undefined;
  public readonly dropboxAppSecret: string | undefined;
  public readonly dropboxBaseUri: string | undefined;
  public readonly dropboxRefreshToken: string | undefined;
  public readonly dropboxShareUri: string | undefined;

  private constructor() {
    if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) dotenv.config();
    this.environment = process.env.NODE_ENV as TEnvironmentEnum;
    this.port = process.env.PORT;
    this.database_secret = process.env.DATABASE_SECRET;
    this.auth_db = process.env.AUTH_DB;
    this.tokenSecret = process.env.TOKEN_SECRET;
    this.dropboxAppKey = process.env.DROPBOX_APP_KEY;
    this.dropboxAppSecret = process.env.DROPBOX_APP_SECRET;
    this.dropboxBaseUri = process.env.DROPBOX_BASE_URI;
    this.dropboxRefreshToken = process.env.DROPBOX_REFRESH_TOKEN;
    this.dropboxShareUri = process.env.DROPBOX_SHARE_URI;
  }

  private static get instance(): ConfigService {
    if (!ConfigService._instance) {
      ConfigService._instance = new ConfigService();
    }
    return ConfigService._instance;
  }

  public static get(key: keyof ConfigService): string {
    return ConfigService.instance[key] as string;
  }
}
