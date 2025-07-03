import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetAlertStatisticsRouteConfig,
  GetAlertStatisticsResponse,
} from "./getAlertStatistics.types";
import { AlertRepo } from "../../../../../feature/alertManagement/domain/Alert.repo";
import { SchoolRepo } from "../../../../../feature/schools/domain/School.repo";

@Controller()
export class GetAlertStatisticsController extends BaseController<GetAlertStatisticsRouteConfig> {
  constructor(
    @inject("AlertRepo") private readonly alertRepo: AlertRepo,
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAlertStatisticsRouteConfig>): Promise<void | APIResponse> {
    const alertsPromise = this.alertRepo.findAll();
    const schoolPromise = this.schoolRepo.findOneByIdOrThrow(req.tenantId, "notFound.school");

    const [alerts, school] = await Promise.all([alertsPromise, schoolPromise]);

    const stats = {
      totalSms: 0,
      totalNotifications: 0,
      smsSentCount: 0,
      smsDraftedCount: 0,
      smsScheduledCount: 0,
      notificationSentCount: 0,
      notificationDraftedCount: 0,
      notificationScheduledCount: 0,
    };

    alerts.forEach(alert => {
      if (alert.types.sms) {
        stats.totalSms = stats.totalSms + alert.users.length;

        if (alert.status === "sent") stats.smsSentCount = stats.smsSentCount + alert.users.length;
        else if (alert.status === "draft")
          stats.smsDraftedCount = stats.smsDraftedCount + alert.users.length;
        else if (alert.status === "scheduled")
          stats.smsScheduledCount = stats.smsScheduledCount + alert.users.length;
      }

      if (alert.types.notification) {
        stats.totalNotifications++;

        if (alert.status === "sent") stats.notificationSentCount++;
        else if (alert.status === "draft") stats.notificationDraftedCount++;
        else if (alert.status === "scheduled") stats.notificationScheduledCount++;
      }
    });

    return new SuccessResponse<GetAlertStatisticsResponse>("global.success", {
      ...stats,
      remainingSmsSold: school.totalSmsSold,
    });
  }
}
