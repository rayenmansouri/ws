import dotenv from "dotenv";
import { TEnvironmentEnum, ENVIRONMENT_ENUM } from "./../enum";

export class ConfigService {
  private static _instance: ConfigService | null = null;
  public readonly environment: TEnvironmentEnum;
  public readonly port: string | undefined;
  public readonly baseUrl: string | undefined;
  public readonly internalPort: string | undefined;
  public readonly internalBaseUrl: string | undefined;
  public readonly fetSmartCalendarUrl: string | undefined;
  public readonly smsExpiresIn: string;
  public readonly databaseUser: string | undefined;
  public readonly databasePassword: string | undefined;
  public readonly databaseBaseURI: string | undefined;
  public readonly database_secret: string | undefined;
  public readonly auth_db: string;
  public readonly masterDBUri: string;
  public readonly centralDBUri: string;
  public readonly saltRounds: number;

  private constructor() {
    if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) dotenv.config();
    this.environment = process.env.NODE_ENV as TEnvironmentEnum;
    this.port = process.env.PORT;
    this.baseUrl = process.env.BASE_API_ENDPOINT;
    this.internalPort = process.env.INTERNAL_PORT;
    this.internalBaseUrl = process.env.INTERNAL_BASE_API_ENDPOINT;
    this.fetSmartCalendarUrl = process.env.SMART_CALENDAR_ENDPOINT;
    this.smsExpiresIn = process.env.SMS_EXPIRES_IN!;
    this.databaseUser = process.env.DATABASE_USER;
    this.databasePassword = process.env.DATABASE_PASSWORD;
    this.databaseBaseURI = process.env.DATABASE_BASE_URI;
    this.database_secret = this.databaseBaseURI
      ?.split("//")
      .join(`//${this.databaseUser}:${this.databasePassword}@`);
    this.auth_db = "authSource=admin";
    this.masterDBUri = `${this.database_secret}/master?${this.auth_db}`;
    this.centralDBUri = `${this.database_secret}/central?${this.auth_db}`;
    this.saltRounds = parseInt(process.env.SALT_ROUNDS || "12");
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
