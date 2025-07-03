import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { NotificationRepo } from "../../../../../feature/notifications/Notification.repo";
import { ListNotificationsRouteConfig, ListNotificationsResponse } from "./listNotifications.types";

@Controller()
export class ListNotificationsController extends BaseController<ListNotificationsRouteConfig> {
  constructor(@inject("NotificationRepo") private notificationRepo: NotificationRepo) {
    super();
  }

  async main(req: TypedRequest<ListNotificationsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.notificationRepo.listNotifications(
      {
        userId: req.user._id,
        status: req.query.status,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListNotificationsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
