import { listAlertsRequestDto } from "./../../../../../feature/alertManagement/useCases/ListAlert.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListAlertUseCase } from "../../../../../feature/alertManagement/useCases/ListAlert.usecase";
import { ListAlertsRouteConfig, ListAlertsResponse } from "./listAlerts.types";

@Controller()
export class ListAlertController extends BaseController<ListAlertsRouteConfig> {
  constructor(@inject("ListAlertUseCase") private listAlertUseCase: ListAlertUseCase) {
    super();
  }

  async main(req: TypedRequest<ListAlertsRouteConfig>): Promise<void | APIResponse> {
    const dto: listAlertsRequestDto = {
      pagination: {
        limit: req.query.limit,
        page: req.query.page,
      },
      search: req.query.search,
    };

    const response = await this.listAlertUseCase.execute(dto);
    return new SuccessResponse<ListAlertsResponse>("global.success", response);
  }
}
