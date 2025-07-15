import { CloseSessionRequestDTO } from "./../../../../../feature/sessionManagement/useCases/closeSession.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CloseSessionRouteConfig, CloseSessionResponse } from "./closeSession.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { CloseSessionUseCase } from "../../../../../feature/sessionManagement/useCases/closeSession.usecase";

@Controller()
export class CloseSessionController extends BaseController<CloseSessionRouteConfig> {
  constructor(@inject("CloseSessionUseCase") private closeSessionUseCase: CloseSessionUseCase) {
    super();
  }

  async main(req: TypedRequest<CloseSessionRouteConfig>): Promise<void | APIResponse> {
    const dto: CloseSessionRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      teacherId: req.user._id,
      tenantId: req.tenantId,
    };
    await this.closeSessionUseCase.execute(dto);

    return new SuccessResponse<CloseSessionResponse>("global.success");
  }
}
