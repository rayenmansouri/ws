
import { RandomUtils } from "../../../helpers/RandomUtils";
import { StringUtils } from "../../../helpers/StringUtils";
import { TLanguageEnum } from "../../../translation/constants";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";
import { Connection, ClientSession } from "mongoose";
import { Organization } from "../../../feature/organization-magement/domain/organization.entity";

export type CoreRegistry = {
  // Core Services
  
  
  // Utilities
  RandomUtils: typeof RandomUtils;
  StringUtils: typeof StringUtils;
  Language: TLanguageEnum;
  
  // Event System
  EventDispatcher: EventDispatcher;
  
  // Request Constants
  Organization: Organization;
  Connection: Connection;
  Session: ClientSession | undefined;
  MasterConnection: Connection;
}; 