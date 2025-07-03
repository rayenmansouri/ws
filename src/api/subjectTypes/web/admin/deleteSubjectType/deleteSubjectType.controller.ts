import { de } from "@faker-js/faker";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSubjectTypeUseCase } from "../../../../../feature/subjectTypes/useCases/DeleteSubjectType.usecase";
import { DeleteSubjectTypeRouteConfig, DeleteSubjectTypeResponse } from "./deleteSubjectType.types";

@Controller()
export class DeleteSubjectTypeController extends BaseController<DeleteSubjectTypeRouteConfig> {
  constructor(
    @inject("DeleteSubjectTypeUseCase") private deleteSubjectTypeUseCase: DeleteSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSubjectTypeUseCase.execute(req.params.subjectTypeNewId);
    return new SuccessResponse<DeleteSubjectTypeResponse>("subjectType.deletedSuccessfully");
  }
}
