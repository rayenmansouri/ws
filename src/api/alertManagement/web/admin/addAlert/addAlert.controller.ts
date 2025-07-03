import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddAlertUseCase } from "../../../../../feature/alertManagement/useCases/AddAlert.usecase";
import { AddAlertRouteConfig, AddAlertResponse } from "./addAlert.types";
import { AddAlertUseCaseRequest } from "../../../../../feature/alertManagement/useCases/AddAlert.usecase";

@Controller()
export class AddAlertController extends BaseController<AddAlertRouteConfig> {
  constructor(@inject("AddAlertUseCase") private readonly addAlertUseCase: AddAlertUseCase) {
    super();
  }

  async main(req: TypedRequest<AddAlertRouteConfig>): Promise<void | APIResponse> {
    const dto: AddAlertUseCaseRequest = {
      types: req.body.types,
      content: req.body.content,
      scheduledAt: req.body.scheduledAt,
      tenantId: req.tenantId,
      isDraft: req.body.isDraft,
      users: req.body.users,
      adminId: req.user._id,
    };
    await this.addAlertUseCase.execute(dto);
    return new SuccessResponse<AddAlertResponse>("global.success");
  }
}
