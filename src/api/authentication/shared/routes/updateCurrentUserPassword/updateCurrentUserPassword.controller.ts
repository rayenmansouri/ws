import { InternalError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateCurrentUserPasswordUseCase } from "../../../../../feature/authentication/useCases/UpdateCurrentUserPassword.usecase";
import {
  UpdateCurrentUserPasswordRouteConfig,
  UpdateCurrentUserPasswordResponse,
} from "./updateCurrentUserPassword.types";

@Controller()
export class UpdateCurrentUserPasswordController extends BaseController<UpdateCurrentUserPasswordRouteConfig> {
  constructor(
    @inject("UpdateCurrentUserPasswordUseCase")
    private updateCurrentUserPasswordUseCase: UpdateCurrentUserPasswordUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateCurrentUserPasswordRouteConfig>): Promise<void | APIResponse> {
    const user = req.user;
    const userType = req.userType;
    if (!userType) throw new InternalError("userType is not defined");

    const { currentPassword, newPassword } = req.body;

    const response = await this.updateCurrentUserPasswordUseCase.execute({
      user,
      userType,
      currentPassword,
      newPassword,
    });
    return new SuccessResponse<UpdateCurrentUserPasswordResponse>("global.success", response);
  }
}
