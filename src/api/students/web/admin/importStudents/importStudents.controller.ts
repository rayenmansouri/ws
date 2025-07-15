import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ImportStudentsUseCase } from "../../../../../feature/students/useCases/ImportStudents.usecase";
import { ImportStudentsResponse, ImportStudentsRouteConfig } from "./importStudents.types";

@Controller()
export class ImportStudentsController extends BaseController<ImportStudentsRouteConfig> {
  constructor(
    @inject("ImportStudentsUseCase")
    private readonly importStudentsUseCase: ImportStudentsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ImportStudentsRouteConfig>): Promise<void | APIResponse> {
    await this.importStudentsUseCase.execute(req.body.data);

    return new SuccessResponse<ImportStudentsResponse>("studentRules.importWithSuccess");
  }
}
