import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSubjectFromClassTypeUseCase } from "../../../../../feature/classTypes/useCases/DeleteSubjectFromClassType.usecase";
import {
  DeleteSubjectFromClassTypeRouteConfig,
  DeleteSubjectFromClassTypeResponse,
} from "./deleteSubjectFromClassType.types";

@Controller()
export class DeleteSubjectFromClassTypeController extends BaseController<DeleteSubjectFromClassTypeRouteConfig> {
  constructor(
    @inject("DeleteSubjectFromClassTypeUseCase")
    private deleteSubjectFromClassTypeUseCase: DeleteSubjectFromClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<DeleteSubjectFromClassTypeRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.deleteSubjectFromClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.subjectTypeNewId,
    );
    return new SuccessResponse<DeleteSubjectFromClassTypeResponse>("global.success");
  }
}
