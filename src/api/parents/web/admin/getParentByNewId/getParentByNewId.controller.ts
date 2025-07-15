import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetParentByNewIdUseCase } from "../../../../../feature/parents/useCases/GetParentByNewId.usecase";
import { GetParentByNewIdRouteConfig, GetParentByNewIdResponse } from "./getParentByNewId.types";

@Controller()
export class GetParentByNewIdController extends BaseController<GetParentByNewIdRouteConfig> {
  constructor(
    @inject("GetParentByNewIdUseCase") private getParentByNewIdUseCase: GetParentByNewIdUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetParentByNewIdRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getParentByNewIdUseCase.execute(req.params.parentNewId);

    return new SuccessResponse<GetParentByNewIdResponse>("global.success", response);
  }
}
