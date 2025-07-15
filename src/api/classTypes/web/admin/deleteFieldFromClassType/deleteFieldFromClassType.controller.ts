import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteFieldFromClassTypeUseCase } from "../../../../../feature/classTypes/useCases/DeleteFieldFromClassType.usecase";
import {
  DeleteFieldFromClassTypeRouteConfig,
  DeleteFieldFromClassTypeResponse,
} from "./deleteFieldFromClassType.types";

@Controller()
export class DeleteFieldFromClassTypeController extends BaseController<DeleteFieldFromClassTypeRouteConfig> {
  constructor(
    @inject("DeleteFieldFromClassTypeUseCase")
    private deleteFieldFromClassTypeUseCase: DeleteFieldFromClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteFieldFromClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteFieldFromClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.fieldIndex,
    );
    return new SuccessResponse<DeleteFieldFromClassTypeResponse>("global.success");
  }
}
