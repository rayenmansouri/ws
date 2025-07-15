import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetOnePreRegistrationUseCase } from "../../../../../feature/preRegistration/useCases/GetOnePreRegistration.usecase";
import {
  GetOnePreRegistrationRouteConfig,
  GetOnePreRegistrationResponse,
} from "./getOnePreRegistration.types";

@Controller()
export class GetOnePreRegistrationController extends BaseController<GetOnePreRegistrationRouteConfig> {
  constructor(
    @inject("GetOnePreRegistrationUseCase")
    private getOnePreRegistrationUseCase: GetOnePreRegistrationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetOnePreRegistrationRouteConfig>): Promise<void | APIResponse> {
    const preRegistration = await this.getOnePreRegistrationUseCase.execute(
      req.params.preRegistrationId,
    );

    return new SuccessResponse<GetOnePreRegistrationResponse>("global.success", preRegistration);
  }
}
