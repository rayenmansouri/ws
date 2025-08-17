import "reflect-metadata";
import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { LANGUAGE_ENUM } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { container } from "./container";
import { DatabaseService } from "../database/database.service";
import { NodeMailerEmailManager } from "../../feature/emailManager/infra/NodeMailerEmailManager";
import { TunisieSmsManager } from "../../feature/smsManager/infra/TunisieSmsManager";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, DATABASE_SERVIßE_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "../database/constant";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";
import mongoose from "mongoose";
import { EMAIL_MANAGER_IDENTIFIER } from "../../feature/emailManager/constants";
import { SMS_MANAGER_IDENTIFIER } from "../../feature/smsManager/constants";
import { FileManager } from "../fileManager/FileManager";
import { DropboxFileManager } from "../fileManager/DropboxFileManager";

export const registerAllDependencies = (): void => {
  // Register core dependencies (keeping existing functionality)
 
  container.bind(DATABASE_SERVIßE_IDENTIFIER).to(DatabaseService).inSingletonScope();
  const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
  container.bind(CONNECTION_POOL_IDENTIFIER).toConstantValue(databaseService.getConnectionPool());
  container.bind(CURRENT_CONNECTION_IDENTIFIER).toConstantValue(MASTER_USER_TENANT_ID);
  container.bind(MASTER_CONNECTION_IDENTIFIR).toConstantValue(mongoose.connection);
  // Core services - essential for basic functionality
  container.bind("RandomUtils").toConstantValue(RandomUtils);
  container.bind("StringUtils").toConstantValue(StringUtils);
  container.bind("Session").toConstantValue(undefined);
  container.bind("Language").toConstantValue(LANGUAGE_ENUM.ENGLISH);
  container.bind("EventDispatcher").to(EventDispatcher).inSingletonScope();
  container.bind("FileManager").to(DropboxFileManager).inSingletonScope();

  // Email and SMS services
  container.bind(EMAIL_MANAGER_IDENTIFIER).to(NodeMailerEmailManager).inSingletonScope();
  container.bind(SMS_MANAGER_IDENTIFIER).to(TunisieSmsManager).inSingletonScope();

  container.bind("HandlerSubscriber").to(HandlerSubscriber).inSingletonScope();

};
