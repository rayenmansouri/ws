import {
  UnArchiveStudentUseCase,
  unArchiveStudentUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/unarchiveStudent.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnArchiveStudentRouteConfig, UnArchiveStudentResponse } from "./unArchiveStudent.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UnArchiveStudentController extends BaseController<UnArchiveStudentRouteConfig> {
  constructor(
    @inject("UnArchiveStudentUseCase")
    private readonly unarchiveStudentUseCase: UnArchiveStudentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnArchiveStudentRouteConfig>): Promise<void | APIResponse> {
    const dto: unArchiveStudentUseCaseRequestDto = {
      studentNewId: req.params.studentNewId,
    };

    await this.unarchiveStudentUseCase.execute(dto);
    return new SuccessResponse<UnArchiveStudentResponse>("global.success");
  }
}
