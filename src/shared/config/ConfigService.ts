import dotenv from "dotenv";
import { TEnvironmentEnum, ENVIRONMENT_ENUM } from "./../enum";

export class ConfigService {
  private static _instance: ConfigService | null = null;
  public readonly environment: TEnvironmentEnum;
  public readonly port: string | undefined;

  private constructor() {
    if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) dotenv.config();
    this.environment = process.env.NODE_ENV as TEnvironmentEnum;
    this.port = process.env.PORT;
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
