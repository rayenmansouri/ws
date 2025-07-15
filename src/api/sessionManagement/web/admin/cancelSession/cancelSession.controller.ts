import {
  CancelSessionUseCase,
  CancelSessionRequestDTO,
} from "./../../../../../feature/sessionManagement/useCases/cancelSession.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CancelSessionRouteConfig, CancelSessionResponse } from "./cancelSession.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class CancelSessionController extends BaseController<CancelSessionRouteConfig> {
  constructor(
    @inject("CancelSessionUseCase") private readonly cancelSessionUseCase: CancelSessionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<CancelSessionRouteConfig>): Promise<void | APIResponse> {
    const dto: CancelSessionRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      userId: req.user._id,
      tenantId: req.tenantId,
      reasonForCanceling: req.body.reasonForCanceling,
    };

    await this.cancelSessionUseCase.execute(dto);

    return new SuccessResponse<CancelSessionResponse>("global.success");
  }
}
