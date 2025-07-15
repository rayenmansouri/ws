import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSubjectFromClassTypeUseCase } from "../../../../../feature/classTypes/useCases/UpdateSubjectOfClassType.usecase";
import {
  UpdateSubjectOfClassTypeRouteConfig,
  UpdateSubjectOfClassTypeResponse,
} from "./updateSubjectOfClassType.types";

@Controller()
export class UpdateSubjectOfClassTypeController extends BaseController<UpdateSubjectOfClassTypeRouteConfig> {
  constructor(
    @inject("UpdateSubjectFromClassTypeUseCase")
    private updateSubjectFromClassTypeUseCase: UpdateSubjectFromClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSubjectOfClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateSubjectFromClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.subjectTypeNewId,
      req.body,
    );
    return new SuccessResponse<UpdateSubjectOfClassTypeResponse>("subject.updatedSuccessfully");
  }
}
