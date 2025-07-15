import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ArchiveStudentUseCase } from "../../../../../feature/archive/useCases/archiveStudent.usecase";
import { ArchiveStudentResponse, ArchiveStudentRouteConfig } from "./archiveStudent.types";

@Controller()
export class ArchiveStudentController extends BaseController<ArchiveStudentRouteConfig> {
  constructor(
    @inject("ArchiveStudentUseCase") private archiveStudentUsecase: ArchiveStudentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ArchiveStudentRouteConfig>): Promise<void | APIResponse> {
    await this.archiveStudentUsecase.executeWithNewId([req.params.studentNewId]);
    return new SuccessResponse<ArchiveStudentResponse>("global.success");
  }
}
