import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateAlertUseCase,
  UpdateAlertRequestDto,
} from "./../../../../../feature/alertManagement/useCases/UpdateAlert.usecase";
import { UpdateAlertResponse, UpdateAlertRouteConfig } from "./updateAlert.types";

@Controller()
export class UpdateAlertController extends BaseController<UpdateAlertRouteConfig> {
  constructor(
    @inject("UpdateAlertUseCase") private readonly updateAlertUseCase: UpdateAlertUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateAlertRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateAlertRequestDto = {
      alertNewId: req.params.alertNewId,
      isDraft: req.body.isDraft,
      scheduledAt: req.body.scheduledAt,
      content: req.body.content,
      types: req.body.types,
      users: req.body.users,
      tenantId: req.tenantId,
    };
    await this.updateAlertUseCase.execute(dto);
    return new SuccessResponse<UpdateAlertResponse>("global.success");
  }
}
