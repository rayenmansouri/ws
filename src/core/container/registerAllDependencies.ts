import "reflect-metadata";
import { NodeMailerEmailManager } from "../../feature/emailManager/infra/NodeMailerEmailManager";
import { NotificationSettingsService } from "../../feature/notifications/NotificationSettings.service";
import { ClassService } from "../../feature/classes/domain/Class.service";
import { GroupApplicationService } from "../../feature/groupManagement/applicationServices/Group.application.service";
import { ScheduleApplicationService } from "../../feature/schedules/applications/Schedule.application.service";
import { SessionApplicationService } from "../../feature/sessionManagement/applicationServices/Session.application.service";
import { SessionService } from "../../feature/sessionManagement/domain/Session.service";
import { StudentApplicationService } from "../../feature/students/application/Student.application.service";
import { WeeklyScheduleApplicationService } from "../../feature/weeklySchedule/applications/WeeklySchedule.application.service";
import { WeeklySessionApplicationService } from "../../feature/weeklySessions/applicationService/WeeklySession.application.service";
import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { LANGUAGE_ENUM } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { DropboxFileManager } from "../fileManager/DropboxFileManager";
import { AdminApplicationService } from "./../../feature/admins/application/admin.application.service";
import { TunisieSmsManager } from "../../feature/smsManager/infra/TunisieSmsManager";
import { container } from "./container";
import { registerUseCases } from "./registerUseCases";
import { registerUseRepos } from "./registerUseRepos";
import { registerSchoolDependencies } from "./registries/registerSchoolDependencies";
import { connection } from "mongoose";

export const registerAllDependencies = (): void => {
  // Register core dependencies (keeping existing functionality)
  registerUseCases();
  registerUseRepos();
  
  // Core services - essential for basic functionality
  container.bind("EmailManager").to(NodeMailerEmailManager);
  container.bind("FileManager").to(DropboxFileManager);
  container.bind("SmsManager").to(TunisieSmsManager);
  container.bind("RandomUtils").toConstantValue(RandomUtils);
  container.bind("StringUtils").toConstantValue(StringUtils);
  container.bind("Session").toConstantValue(undefined);
  container.bind("Language").toConstantValue(LANGUAGE_ENUM.ENGLISH);
  container.bind("EventDispatcher").to(EventDispatcher).inSingletonScope();
  container.bind("HandlerSubscriber").to(HandlerSubscriber).inSingletonScope();

  // Essential services for user management and notifications
  container.bind("NotificationSettingsService").to(NotificationSettingsService);
  container.bind("AdminApplicationService").to(AdminApplicationService);
  
  // Register feature-specific dependencies using modular approach
  registerSchoolDependencies(container);
  
  // TODO: Gradually migrate other features to modular approach
  // registerUserDependencies(container);
  // registerInvoiceDependencies(container);
  // etc.
  container.bind("SessionService").to(SessionService);
  container.bind("ClassService").to(ClassService);
  container.bind("GroupApplicationService").to(GroupApplicationService);

  // application services
  container.bind("SessionApplicationService").to(SessionApplicationService);
  container.bind("ScheduleApplicationService").to(ScheduleApplicationService);
  container.bind("WeeklyScheduleApplicationService").to(WeeklyScheduleApplicationService);
  container.bind("StudentApplicationService").to(StudentApplicationService);
  container.bind("WeeklySessionApplicationService").to(WeeklySessionApplicationService);
  container.bind("AdminApplicationService").to(AdminApplicationService);
  container.bind("Connection").toConstantValue(connection);
};
