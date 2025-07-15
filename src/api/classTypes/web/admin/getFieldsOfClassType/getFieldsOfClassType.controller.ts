import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFieldsOfClassTypeUseCase } from "../../../../../feature/classTypes/useCases/GetFieldsOfClassTypes.usecase";
import {
  GetFieldsOfClassTypeRouteConfig,
  GetFieldsOfClassTypeResponse,
} from "./getFieldsOfClassType.types";

@Controller()
export class GetFieldsOfClassTypeController extends BaseController<GetFieldsOfClassTypeRouteConfig> {
  constructor(
    @inject("GetFieldsOfClassTypeUseCase")
    private getFieldsOfClassTypeUseCase: GetFieldsOfClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetFieldsOfClassTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getFieldsOfClassTypeUseCase.execute(req.params.classTypeNewId);
    return new SuccessResponse<GetFieldsOfClassTypeResponse>("global.success", response);
  }
}
