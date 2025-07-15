import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ResendInvitationUseCase } from "../../../../../feature/authentication/useCases/ResendInvitation.usecase";
import { ResendInvitationRouteConfig, ResendInvitationResponse } from "./resendInvitation.types";

@Controller()
export class ResendInvitationController extends BaseController<ResendInvitationRouteConfig> {
  constructor(
    @inject("ResendInvitationUseCase")
    private resendInvitationUseCase: ResendInvitationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ResendInvitationRouteConfig>): Promise<void | APIResponse> {
    const response = await this.resendInvitationUseCase.execute(
      req.body.userNewIds,
      req.body.userType,
    );

    return new SuccessResponse<ResendInvitationResponse>("global.success", response);
  }
}
