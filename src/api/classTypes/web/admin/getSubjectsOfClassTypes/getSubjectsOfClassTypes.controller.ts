import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSubjectsOfClassTypesUseCase } from "../../../../../feature/classTypes/useCases/GetSubjectsOfClassTypes.usecase";
import {
  GetSubjectsOfClassTypesRouteConfig,
  GetSubjectsOfClassTypesResponse,
} from "./getSubjectsOfClassTypes.types";

@Controller()
export class GetSubjectsOfClassTypesController extends BaseController<GetSubjectsOfClassTypesRouteConfig> {
  constructor(
    @inject("GetSubjectsOfClassTypesUseCase")
    private getSubjectsOfClassTypesUseCase: GetSubjectsOfClassTypesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSubjectsOfClassTypesRouteConfig>): Promise<void | APIResponse> {
    const subjects = await this.getSubjectsOfClassTypesUseCase.execute(req.params.classTypeNewId);
    return new SuccessResponse<GetSubjectsOfClassTypesResponse>("global.success", subjects);
  }
}
