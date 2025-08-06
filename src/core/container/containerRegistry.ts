import "reflect-metadata";
import { Connection } from "mongoose";


import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { TLanguageEnum } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { DatabaseService } from "../../core/database/database.service";

export type containerRegistry = {
  //core
  RandomUtils: typeof RandomUtils;
  StringUtils: typeof StringUtils;
  Language: TLanguageEnum;
  EventDispatcher: EventDispatcher;
  DatabaseService: DatabaseService;

  // use cases

  // Application services

  //repos

  // request constants
  Connection: Connection;

  // constants
  MasterConnection: Connection;
  UserRepository: UserRepository;
  OrganizationRepository: OrganizationRepository;
  ConnectionPool: ConnectionPool;
};
