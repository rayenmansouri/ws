import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetClassTypeUseCase } from "../../../../../feature/classTypes/useCases/GetClassType.usecase";
import { GetClassTypeRouteConfig, GetClassTypeResponse } from "./getClassType.types";

@Controller()
export class GetClassTypeController extends BaseController<GetClassTypeRouteConfig> {
  constructor(@inject("GetClassTypeUseCase") private getClassTypeUseCase: GetClassTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<GetClassTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getClassTypeUseCase.execute(req.params.classTypeNewId);
    return new SuccessResponse<GetClassTypeResponse>("global.success", response);
  }
}
