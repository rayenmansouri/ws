import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SwitchToUserUseCase } from "../../../../../feature/authentication/useCases/SwitchToUser.usecase";
import { SwitchToUserRouteConfig, SwitchToUserResponse } from "./switchToUser.types";

@Controller()
export class SwitchToUserController extends BaseController<SwitchToUserRouteConfig> {
  constructor(@inject("SwitchToUserUseCase") private switchToUserUseCase: SwitchToUserUseCase) {
    super();
  }

  async main(req: TypedRequest<SwitchToUserRouteConfig>): Promise<void | APIResponse> {
    const { userType, userId } = req.body;

    const token = await this.switchToUserUseCase.execute(userType, userId);

    return new SuccessResponse<SwitchToUserResponse>("global.success", { token });
  }
}
