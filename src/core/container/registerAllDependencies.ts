import { ClassService } from "../../feature/classes/domain/Class.service";
import { DiplomaService } from "../../feature/diploma/Diploma.service";
import { NodeMailerEmailManager } from "../../feature/emailManager/infra/NodeMailerEmailManager";
import { ClassGradeFactory } from "../../feature/examGrade/factories/classGrade.factory";
import { GroupApplicationService } from "../../feature/groupManagement/applicationServices/Group.application.service";
import { HomeworkApplicationService } from "../../feature/homeworks/applicationServices/homework.application.service";
import { HomeworkService } from "../../feature/homeworks/domain/Homework.service";
import { NotificationSettingsService } from "../../feature/notifications/NotificationSettings.service";
import { BankCheckStrategy } from "../../feature/invoices/strategies/bankCheckStrategy";
import { BankTransferStrategy } from "../../feature/invoices/strategies/bankTransferStrategy";
import { CashPaymentStrategy } from "../../feature/invoices/strategies/cashPaymentStrategy";
import { ScheduleApplicationService } from "../../feature/schedules/applications/Schedule.application.service";
import { SessionApplicationService } from "../../feature/sessionManagement/applicationServices/Session.application.service";
import { SessionService } from "../../feature/sessionManagement/domain/Session.service";
import { SmartCalendarConfigFactory } from "../../feature/smartCalendar/factories/SmartCalendarConfig.factory";
import { FetScheduleGenerator } from "../../feature/smartCalendar/infra/fet/FetScheduleGenerator";
import { TunisieSmsManager } from "../../feature/smsManager/infra/TunisieSmsManager";
import { StudentApplicationService } from "../../feature/students/application/Student.application.service";
import { SupplierService } from "../../feature/supplier/Supplier.service";
import { WeeklyScheduleApplicationService } from "../../feature/weeklySchedule/applications/WeeklySchedule.application.service";
import { WeeklySessionApplicationService } from "../../feature/weeklySessions/applicationService/WeeklySession.application.service";
import { RandomUtils } from "../../helpers/RandomUtils";
import { StringUtils } from "../../helpers/StringUtils";
import { LANGUAGE_ENUM } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { DropboxFileManager } from "../fileManager/DropboxFileManager";
import { AdminApplicationService } from "./../../feature/admins/application/admin.application.service";
import { AlertManagementApplicationService } from "./../../feature/alertManagement/application/alertManagement.application.service";
import { PaymentStrategyFactory } from "../../feature/invoices/strategies/paymentStrategy.factory";
import { container } from "./container";
import { registerUseCases } from "./registerUseCases";
import { registerUseRepos } from "./registerUseRepos";

export const registerAllDependencies = (): void => {
  //core
  container.bind("EmailManager").to(NodeMailerEmailManager);
  container.bind("FileManager").to(DropboxFileManager);
  container.bind("SmsManager").to(TunisieSmsManager);
  container.bind("RandomUtils").toConstantValue(RandomUtils);
  container.bind("StringUtils").toConstantValue(StringUtils);
  container.bind("Session").toConstantValue(undefined);
  container.bind("Language").toConstantValue(LANGUAGE_ENUM.ENGLISH);
  container.bind("ScheduleGenerator").to(FetScheduleGenerator);
  container.bind("EventDispatcher").to(EventDispatcher).inSingletonScope();
  container.bind("HandlerSubscriber").to(HandlerSubscriber).inSingletonScope();

  //services
  container.bind("NotificationSettingsService").to(NotificationSettingsService);
  container.bind("SupplierService").to(SupplierService);
  container.bind("SessionService").to(SessionService);
  container.bind("ClassService").to(ClassService);
  container.bind("DiplomaService").to(DiplomaService);
  container.bind("HomeworkService").to(HomeworkService);
  container.bind("GroupApplicationService").to(GroupApplicationService);

  // application services
  container.bind("SessionApplicationService").to(SessionApplicationService);
  container.bind("HomeworkApplicationService").to(HomeworkApplicationService);
  container.bind("ScheduleApplicationService").to(ScheduleApplicationService);
  container.bind("WeeklyScheduleApplicationService").to(WeeklyScheduleApplicationService);
  container.bind("StudentApplicationService").to(StudentApplicationService);
  container.bind("AlertManagementApplicationService").to(AlertManagementApplicationService);
  container.bind("WeeklySessionApplicationService").to(WeeklySessionApplicationService);
  container.bind("AdminApplicationService").to(AdminApplicationService);

  //factories
  container.bind("PaymentStrategyFactory").to(PaymentStrategyFactory);
  container.bind("SmartCalendarConfigFactory").to(SmartCalendarConfigFactory);
  container.bind("ClassGradeFactory").to(ClassGradeFactory);
  container.bind("CashPaymentStrategy").to(CashPaymentStrategy);
  container.bind("BankCheckStrategy").to(BankCheckStrategy);
  container.bind("BankTransferStrategy").to(BankTransferStrategy);

  registerUseCases();
  registerUseRepos();
};
