import { ClientSession, Connection } from "mongoose";
import { injectable } from "inversify";
import schedule from "node-schedule";
import { inject } from "../../../core/container/TypedContainer";
import { AlertRepo } from "../domain/Alert.repo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { AlertManagementApplicationService } from "./../application/alertManagement.application.service";
import { AlertService } from "./../domain/Alert.service";
import { AlertMapper } from "./../mappers/alert.mapper";
import { SchoolRepo } from "../../schools/domain/School.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type AddAlertUseCaseRequest = {
  types: {
    sms: boolean;
    notification: boolean;
  };
  content: string;
  users: { userType: TEndUserEnum; userId: ID }[];
  isDraft: boolean;
  tenantId: string;
  scheduledAt?: Date;
  adminId: ID;
};

@injectable()
export class AddAlertUseCase {
  constructor(
    @inject("AlertRepo") private readonly alertRepo: AlertRepo,
    @inject("AlertManagementApplicationService")
    private readonly alertManagementApplicationService: AlertManagementApplicationService,
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
    @inject("Session") private readonly session: ClientSession,
    @inject("Connection") private readonly connection: Connection,
  ) {}

  async execute(dto: AddAlertUseCaseRequest): Promise<void> {
    if (!AlertService.validate(dto)) throw new BadRequestError("alert.invalidAlertConfiguration");

    if (dto.types.sms) {
      const school = await this.schoolRepo.findOneByIdOrThrow(
        dto.tenantId as ID,
        "notFound.school",
      );

      if (!AlertService.hasEnoughSmsSold(dto.users.length, school.totalSmsSold))
        throw new BadRequestError("alert.notEnoughSmsSold");
    }

    const categorizedUsers = this.alertManagementApplicationService.categorizeUsers(dto.users);

    const { students, parents, admins, teachers } =
      await this.alertManagementApplicationService.findAllUsersOrThrow(categorizedUsers);

    const users = AlertMapper.toAlertUsersByType({ students, parents, teachers, admins });

    const {
      students: studentsIdAndPhoneNumber,
      parents: parentsIdAndPhoneNumber,
      teachers: teachersIdAndPhoneNumber,
      admins: adminsIdAndPhoneNumber,
    } = AlertMapper.toAlertUser({ students, parents, teachers, admins }, dto.types.sms);

    const alert = await this.alertRepo.addOne({
      types: {
        sms: dto.types.sms,
        notification: dto.types.notification,
      },
      content: dto.content,
      scheduledAt: dto.scheduledAt ?? null,
      status: dto.scheduledAt ? "scheduled" : "draft",
      users,
      sentAt: null,
      createdBy: dto.adminId,
    });

    if (!dto.isDraft)
      if (!dto.scheduledAt) {
        await this.alertManagementApplicationService.sendAlert(
          {
            students: studentsIdAndPhoneNumber,
            admins: adminsIdAndPhoneNumber,
            parents: parentsIdAndPhoneNumber,
            teachers: teachersIdAndPhoneNumber,
          },
          dto.types,
          alert._id,
          dto.content,
          dto.tenantId,
          this.session,
        );
      } else {
        const rule = new schedule.RecurrenceRule();
        rule.year = dto.scheduledAt.getFullYear();
        rule.month = dto.scheduledAt.getMonth();
        rule.date = dto.scheduledAt.getDate();
        rule.hour = dto.scheduledAt.getHours() - 1;
        rule.minute = dto.scheduledAt.getMinutes();

        schedule.scheduleJob(rule, async () => {
          const session = await this.connection.startSession();
          try {
            session.startTransaction();
            const scheduledAlert = await this.alertRepo.findOneById(alert._id);

            if (scheduledAlert) {
              await this.alertManagementApplicationService.sendAlert(
                {
                  students: studentsIdAndPhoneNumber,
                  admins: adminsIdAndPhoneNumber,
                  parents: parentsIdAndPhoneNumber,
                  teachers: teachersIdAndPhoneNumber,
                },
                dto.types,
                alert._id,
                dto.content,
                dto.tenantId,
                session,
              );
              await session.commitTransaction();
            }
          } catch (error) {
            await session.abortTransaction();
            throw error;
          } finally {
            await session.endSession();
          }
        });
      }
  }
}
