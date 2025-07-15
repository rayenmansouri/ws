import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import schedule from "node-schedule";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolRepo } from "../../schools/domain/School.repo";
import { AlertRepo } from "../domain/Alert.repo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { AlertManagementApplicationService } from "./../application/alertManagement.application.service";
import { Alert } from "./../domain/alert.entity";
import { AlertMapper, AlertUser } from "./../mappers/alert.mapper";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type UpdateAlertRequestDto = {
  alertNewId: string;
  isDraft?: boolean;
  scheduledAt?: Date;
  content?: string;
  types?: {
    sms: boolean;
    notification: boolean;
  };
  users?: { userType: TEndUserEnum; userId: ID }[];
  tenantId: string;
};

@injectable()
export class UpdateAlertUseCase {
  constructor(
    @inject("AlertRepo") private readonly alertRepo: AlertRepo,
    @inject("AlertManagementApplicationService")
    private readonly alertManagementApplicationService: AlertManagementApplicationService,
    @inject("Session") private readonly session: ClientSession,
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
    @inject("Connection") private readonly connection: Connection,
  ) {}

  async execute(dto: UpdateAlertRequestDto): Promise<void> {
    const alert = await this.alertRepo.findOneByNewIdOrThrow(dto.alertNewId, "notFound.alert");

    if (alert.status === "sent") {
      throw new BadRequestError("alert.cannotUpdateSentAlert");
    }

    const updates: Record<
      string,
      | string
      | Date
      | { userType: TEndUserEnum; userId: ID }[]
      | { sms: boolean; notification: boolean }
    > = {};

    if (dto.types) {
      updates.types = dto.types;
      alert.types = dto.types;
    }

    if (dto.isDraft !== undefined) {
      if (dto.isDraft && alert.status !== "draft") {
        updates.status = "draft";
        alert.status = "draft";
      } else if (!dto.isDraft && alert.status === "draft") {
        updates.status = "scheduled";
        alert.status = "scheduled";
      }
    }

    if (dto.content) {
      updates.content = dto.content;
      alert.content = dto.content;
    }

    if (dto.scheduledAt) {
      updates.scheduledAt = dto.scheduledAt;
      alert.scheduledAt = dto.scheduledAt;
    }

    if (dto.users && dto.users.length > 0) {
      const updatedUsers = dto.users;
      updates.users = updatedUsers;
      alert.users = updatedUsers;
    }

    if (Object.keys(updates).length > 0) {
      await this.alertRepo.updateOneById(alert._id, updates);
    }

    if (alert.status !== "draft") {
      await this.processAlertSending(alert, dto.tenantId);
    }
  }

  private async processAlertSending(alert: Alert, tenantId: string): Promise<void> {
    const categorizedUsers = this.alertManagementApplicationService.categorizeUsers(alert.users);

    const { students, parents, admins, teachers } =
      await this.alertManagementApplicationService.findAllUsersOrThrow(categorizedUsers);

    const recipientsByType = AlertMapper.toAlertUser(
      { students, parents, teachers, admins },
      alert.types.sms,
    );

    if (!alert.scheduledAt || alert.scheduledAt <= new Date()) {
      await this.alertManagementApplicationService.sendAlert(
        recipientsByType,
        alert.types,
        alert._id,
        alert.content,
        tenantId,
        this.session,
      );
    } else if (alert.status === "scheduled") {
      this.scheduleAlertSending(alert, recipientsByType, tenantId);
    }
  }

  private scheduleAlertSending(
    alert: Alert,
    recipientsByType: {
      students: AlertUser[];
      parents: AlertUser[];
      teachers: AlertUser[];
      admins: AlertUser[];
    },
    tenantId: string,
  ): void {
    const rule = new schedule.RecurrenceRule();
    const scheduledDate = alert.scheduledAt;

    if (scheduledDate) {
      rule.year = scheduledDate.getFullYear();
      rule.month = scheduledDate.getMonth();
      rule.date = scheduledDate.getDate();
      rule.hour = scheduledDate.getHours() - 1;
      rule.minute = scheduledDate.getMinutes();

      schedule.scheduleJob(rule, async () => {
        const session = await this.connection.startSession();
        try {
          const scheduledAlert = await this.alertRepo.findOneById(alert._id);
          if (scheduledAlert) {
            await this.alertManagementApplicationService.sendAlert(
              recipientsByType,
              alert.types,
              alert._id,
              alert.content,
              tenantId,
              session,
            );
          }
        } catch (error) {
          await session.abortTransaction();
        } finally {
          await session.endSession();
        }
      });
    }
  }
}
