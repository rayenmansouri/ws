import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSubSubjectTypeUseCase } from "../../../../../feature/subSubjectTypes/usecases/DeleteSubSubjectType.usecase";
import {
  DeleteSubSubjectTypeResponse,
  DeleteSubSubjectTypeRouteConfig,
} from "./deleteSubSubjectType.types";

@Controller()
export class DeleteSubSubjectTypeController extends BaseController<DeleteSubSubjectTypeRouteConfig> {
  constructor(
    @inject("DeleteSubSubjectTypeUseCase")
    private deleteSubSubjectTypeUseCase: DeleteSubSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSubSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSubSubjectTypeUseCase.execute(req.params.subSubjectTypeNewId);
    return new SuccessResponse<DeleteSubSubjectTypeResponse>("subSubjectType.deletedSuccessfully");
  }
}
