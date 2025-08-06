import "reflect-metadata";
import { AdminApplicationService } from "./../../feature/admins/application/admin.application.service";
import { Connection } from "mongoose";
import { AdminRepo } from "../../feature/admins/domain/Admin.repo";
import { GetAdminByNewIdUseCase } from "../../feature/admins/useCases/GetAdminByNewId.usecase";
import { ListAdminsUseCase } from "../../feature/admins/useCases/ListAdmins.usecase";
import { UpdateAdminUseCase } from "../../feature/admins/useCases/UpdateAdmin.usecase";

import { VerificationCodeRepo } from "../../feature/authentication/domain/VerificationCode.repo";
import { ForgetPasswordUseCase } from "../../feature/authentication/useCases/ForgetPassowrd.usecase";
import { LoginUseCase } from "../../feature/authentication/useCases/Login.usecase";
import { LoginByMasterUseCase } from "../../feature/authentication/useCases/LoginByMaster.usecase";
import { LogoutUseCase } from "../../feature/authentication/useCases/Logout.usecase";
import { ResendInvitationUseCase } from "../../feature/authentication/useCases/ResendInvitation.usecase";
import { ResetPasswordUseCase } from "../../feature/authentication/useCases/ResetPassword.usecase";
import { ResetUserPasswordUseCase } from "../../feature/authentication/useCases/ResetUserPassword.usecase";
import { SwitchToUserUseCase } from "../../feature/authentication/useCases/SwitchToUser.usecase";
import { UpdateCurrentUserPasswordUseCase } from "../../feature/authentication/useCases/UpdateCurrentUserPassword.usecase";
import { VerifyCodeUseCase } from "../../feature/authentication/useCases/VerifyCode.usecase";
import { RoleRepo } from "../../feature/authorization/domain/Role.repo";
import { EmailManager } from "../../feature/emailManager/domain/EmailManager";


import { SmsManager } from "../../feature/smsManager/domain/SmsManager";



import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { TLanguageEnum } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { FileManager } from "../fileManager/FileManager";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { DatabaseService } from "../../core/database/database.service";

export type containerRegistry = {
  //core
  EmailManager: EmailManager;
  FileManager: FileManager;
  SmsManager: SmsManager;
  RandomUtils: typeof RandomUtils;
  StringUtils: typeof StringUtils;
  Language: TLanguageEnum;
  EventDispatcher: EventDispatcher;
  DatabaseService: DatabaseService;

  // use cases
  ResetUserPasswordUseCase: ResetUserPasswordUseCase;

  GetAdminByNewIdUseCase: GetAdminByNewIdUseCase;
  ListAdminsUseCase: ListAdminsUseCase;

  LoginByMasterUseCase: LoginByMasterUseCase;
  LoginUseCase: LoginUseCase;
  LogoutUseCase: LogoutUseCase;
  ResetPasswordUseCase: ResetPasswordUseCase;
  VerifyCodeUseCase: VerifyCodeUseCase;
  ForgetPasswordUseCase: ForgetPasswordUseCase;
  UpdateCurrentUserPasswordUseCase: UpdateCurrentUserPasswordUseCase;
  UpdateAdminUseCase: UpdateAdminUseCase;
  SwitchToUserUseCase: SwitchToUserUseCase;
  ResendInvitationUseCase: ResendInvitationUseCase;
  // Application services
  AdminApplicationService: AdminApplicationService;

  //repos
  VerificationCodeRepo: VerificationCodeRepo;
  RoleRepo: RoleRepo;
  AdminRepo: AdminRepo;
  // request constants
  Connection: Connection;

  // constants
  MasterConnection: Connection;
  UserRepository: UserRepository;
  OrganizationRepository: OrganizationRepository;
  ConnectionPool: ConnectionPool;
};
