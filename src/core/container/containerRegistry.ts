import "reflect-metadata";
import { Connection } from "mongoose";


import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { TLanguageEnum } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { UploadAvatarUseCase } from "../../feature/user-management/useCases/UploadAvatar.usecase";
import { UploadAvatarController } from "../../api-v2/user-management/uploadAvatar/uploadAvatar.controller";
import { VerificationCodeRepository } from "../../feature/authentication/domain/verificationCode.repo";
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
  UploadAvatarUseCase: UploadAvatarUseCase;

  // controllers
  UploadAvatarController: UploadAvatarController;

  // Application services

  //repos

  // request constants
  Connection: Connection;

  // constants
  MasterConnection: Connection;
  UserRepository: UserRepository;
  VerificationCodeRepository: VerificationCodeRepository;
  ConnectionPool: ConnectionPool;
};
