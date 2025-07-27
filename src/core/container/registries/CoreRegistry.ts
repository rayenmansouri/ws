import { EmailManager } from "../../../feature/emailManager/domain/EmailManager";
import { FileManager } from "../../../core/fileManager/FileManager";
import { SmsManager } from "../../../feature/smsManager/domain/SmsManager";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { StringUtils } from "../../../helpers/StringUtils";
import { TLanguageEnum } from "../../../translation/constants";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../../../core/domainEvents/HandlerSubscriber";
import { Connection, ClientSession } from "mongoose";
import { School } from "../../../feature/schools/domain/school.entity";

export type CoreRegistry = {
  // Core Services
  EmailManager: EmailManager;
  FileManager: FileManager;
  SmsManager: SmsManager;
  
  // Utilities
  RandomUtils: typeof RandomUtils;
  StringUtils: typeof StringUtils;
  Language: TLanguageEnum;
  
  // Event System
  EventDispatcher: EventDispatcher;
  HandlerSubscriber: HandlerSubscriber;
  
  // Request Constants
  School: School;
  Connection: Connection;
  Session: ClientSession | undefined;
  MasterConnection: Connection;
}; 