import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { Admin } from "../../../../../feature/admins/domain/admin.entity";
import { ResetUserPasswordUseCase } from "../../../../../feature/authentication/useCases/ResetUserPassword.usecase";
import { ResetUserPasswordRouteConfig, ResetUserPasswordResponse } from "./resetUserPassword.types";

@Controller()
export class ResetUserPasswordController extends BaseController<ResetUserPasswordRouteConfig> {
  constructor(
    @inject("ResetUserPasswordUseCase") private resetUserPasswordUseCase: ResetUserPasswordUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ResetUserPasswordRouteConfig>): Promise<void | APIResponse> {
    await this.resetUserPasswordUseCase.execute({
      userType: req.body.userType,
      userNewId: req.body.userNewId,
      admin: req.user as unknown as Admin,
      newPassword: req.body.newPassword,
    });
    return new SuccessResponse<ResetUserPasswordResponse>(
      "authentication.resetUserPasswordWithSuccess",
    );
  }
}
