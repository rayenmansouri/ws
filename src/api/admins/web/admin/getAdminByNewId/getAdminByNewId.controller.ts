import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAdminByNewIdUseCase } from "../../../../../feature/admins/useCases/GetAdminByNewId.usecase";
import { GetAdminByNewIdRouteConfig, GetAdminByNewIdResponse } from "./getAdminByNewId.types";

@Controller()
export class GetAdminByNewIdController extends BaseController<GetAdminByNewIdRouteConfig> {
  constructor(
    @inject("GetAdminByNewIdUseCase") private getAdminByNewIdUseCase: GetAdminByNewIdUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAdminByNewIdRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getAdminByNewIdUseCase.execute(req.params.adminNewId);

    return new SuccessResponse<GetAdminByNewIdResponse>("global.success", response);
  }
}
