import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddWeeklySessionForGroupUseCase } from "../../../../../feature/weeklySessions/useCases/AddWeeklySessionForGroup.usecase";
import {
  AddWeeklySessionForGroupRouteConfig,
  AddWeeklySessionForGroupResponse,
} from "./addWeeklySessionForGroup.types";

@Controller()
export class AddWeeklySessionForGroupController extends BaseController<AddWeeklySessionForGroupRouteConfig> {
  constructor(
    @inject("AddWeeklySessionForGroupUseCase")
    private addWeeklySessionForGroupUseCase: AddWeeklySessionForGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddWeeklySessionForGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addWeeklySessionForGroupUseCase.execute(req.body);
    return new SuccessResponse<AddWeeklySessionForGroupResponse>("global.success", response);
  }
}
