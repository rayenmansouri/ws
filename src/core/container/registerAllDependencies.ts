import "reflect-metadata";
import { NodeMailerEmailManager } from "../../feature/emailManager/infra/NodeMailerEmailManager";
import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { LANGUAGE_ENUM } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
// import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { DropboxFileManager } from "../fileManager/DropboxFileManager";
import { AdminApplicationService } from "./../../feature/admins/application/admin.application.service";
import { TunisieSmsManager } from "../../feature/smsManager/infra/TunisieSmsManager";
import { container } from "./container";
import { DATABASE_SERVIßE_IDENTIFIER, DatabaseService } from "../database/database.service";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIER } from "../database/constant";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";
import mongoose from "mongoose";

export const registerAllDependencies = (): void => {
  // Register core dependencies (keeping existing functionality)
 
  container.bind(DATABASE_SERVIßE_IDENTIFIER).to(DatabaseService).inSingletonScope();
  const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
  container.bind(CONNECTION_POOL_IDENTIFIER).toConstantValue(databaseService.getConnectionPool());
  container.bind(CURRENT_CONNECTION_IDENTIFIER).toConstantValue(MASTER_USER_TENANT_ID);
  container.bind(MASTER_CONNECTION_IDENTIFIER).toConstantValue(mongoose.connection);
  // Core services - essential for basic functionality
  container.bind("EmailManager").to(NodeMailerEmailManager);
  container.bind("FileManager").to(DropboxFileManager);
  container.bind("SmsManager").to(TunisieSmsManager);
  container.bind("RandomUtils").toConstantValue(RandomUtils);
  container.bind("StringUtils").toConstantValue(StringUtils);
  container.bind("Session").toConstantValue(undefined);
  container.bind("Language").toConstantValue(LANGUAGE_ENUM.ENGLISH);
  container.bind("EventDispatcher").to(EventDispatcher).inSingletonScope();
  // container.bind("HandlerSubscriber").to(HandlerSubscriber).inSingletonScope();

  // Essential services for user management and notifications
  container.bind("AdminApplicationService").to(AdminApplicationService);
  
};
