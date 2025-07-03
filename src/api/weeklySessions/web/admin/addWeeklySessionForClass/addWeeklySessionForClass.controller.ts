import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddWeeklySessionForClassUseCase } from "../../../../../feature/weeklySessions/useCases/AddWeeklySessionForClass.usecase";
import {
  AddWeeklySessionForClassRouteConfig,
  AddWeeklySessionForClassResponse,
} from "./addWeeklySessionForClass.types";

@Controller()
export class AddWeeklySessionForClassController extends BaseController<AddWeeklySessionForClassRouteConfig> {
  constructor(
    @inject("AddWeeklySessionForClassUseCase")
    private addWeeklySessionForClassUseCase: AddWeeklySessionForClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddWeeklySessionForClassRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addWeeklySessionForClassUseCase.execute({
      ...req.body,
      classGroupNewId: req.body.groupNewId || null,
      week: req.body.week || null,
    });
    return new SuccessResponse<AddWeeklySessionForClassResponse>("global.success", response);
  }
}
