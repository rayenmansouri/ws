import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LoginByMasterUseCase } from "../../../../../feature/authentication/useCases/LoginByMaster.usecase";
import { LoginRouteConfig, LoginResponse } from "./login.types";

@Controller()
export class LoginController extends BaseController<LoginRouteConfig> {
  constructor(@inject("LoginByMasterUseCase") private loginByMasterUseCase: LoginByMasterUseCase) {
    super();
  }

  async main(req: TypedRequest<LoginRouteConfig>): Promise<void | APIResponse> {
    const response = await this.loginByMasterUseCase.execute({
      email: req.body.credential,
      password: req.body.password,
    });
    return new SuccessResponse<LoginResponse>("global.success", response);
  }
}
