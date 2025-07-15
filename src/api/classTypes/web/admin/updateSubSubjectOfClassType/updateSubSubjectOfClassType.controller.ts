import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSubSubjectOfClassTypeUseCase } from "../../../../../feature/classTypes/useCases/UpdateSubSubjectOfClassType.usecase";
import {
  UpdateSubSubjectOfClassTypeRouteConfig,
  UpdateSubSubjectOfClassTypeResponse,
} from "./updateSubSubjectOfClassType.types";

@Controller()
export class UpdateSubSubjectOfClassTypeController extends BaseController<UpdateSubSubjectOfClassTypeRouteConfig> {
  constructor(
    @inject("UpdateSubSubjectOfClassTypeUseCase")
    private updateSubSubjectOfClassTypeUseCase: UpdateSubSubjectOfClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateSubSubjectOfClassTypeRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.updateSubSubjectOfClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.subSubjectNewId,
      req.body,
    );

    return new SuccessResponse<UpdateSubSubjectOfClassTypeResponse>("");
  }
}
