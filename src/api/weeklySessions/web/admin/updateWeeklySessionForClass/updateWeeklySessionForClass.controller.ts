import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateWeeklySessionForClassUseCase } from "../../../../../feature/weeklySessions/useCases/UpdateWeeklySessionForClass.usecase";
import {
  UpdateWeeklySessionForClassRouteConfig,
  UpdateWeeklySessionForClassResponse,
} from "./updateWeeklySessionForClass.types";

@Controller()
export class UpdateWeeklySessionForClassController extends BaseController<UpdateWeeklySessionForClassRouteConfig> {
  constructor(
    @inject("UpdateWeeklySessionForClassUseCase")
    private updateWeeklySessionForClassUseCase: UpdateWeeklySessionForClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateWeeklySessionForClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.updateWeeklySessionForClassUseCase.execute(
      req.params.weeklySessionNewId,
      req.body,
    );
    return new SuccessResponse<UpdateWeeklySessionForClassResponse>(
      "weeklySession.updateSuccessfully",
      result,
    );
  }
}
