import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { DeletePreRegistrationUseCase } from "../../../../../feature/preRegistration/useCases/DeletePreRegistration.usecase";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  DeletePreRegistrationRouteConfig,
  DeletePreRegistrationResponse,
} from "./deletePreRegistration.types";

@Controller()
export class DeletePreRegistrationController extends BaseController<DeletePreRegistrationRouteConfig> {
  constructor(
    @inject("DeletePreRegistrationUseCase")
    private deletePreRegistrationUseCase: DeletePreRegistrationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeletePreRegistrationRouteConfig>): Promise<void | APIResponse> {
    await this.deletePreRegistrationUseCase.execute(req.params.preRegistrationId);

    return new SuccessResponse<DeletePreRegistrationResponse>("global.success");
  }
}
