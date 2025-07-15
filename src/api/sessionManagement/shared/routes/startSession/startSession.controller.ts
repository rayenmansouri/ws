import {
  StartSessionUseCase,
  StartSessionRequestDTO,
} from "./../../../../../feature/sessionManagement/useCases/startSession.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { StartSessionRouteConfig, StartSessionResponse } from "./startSession.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class StartSessionController extends BaseController<StartSessionRouteConfig> {
  constructor(
    @inject("StartSessionUseCase") private readonly startSessionUseCase: StartSessionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<StartSessionRouteConfig>): Promise<void | APIResponse> {
    const dto: StartSessionRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      userId: req.user._id,
      userType: req.userType as "teacher" | "admin",
      tenantId: req.tenantId,
    };

    await this.startSessionUseCase.execute(dto);

    return new SuccessResponse<StartSessionResponse>("global.success");
  }
}
