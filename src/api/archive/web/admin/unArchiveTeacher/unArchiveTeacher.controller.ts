import {
  UnArchiveTeacherUseCase,
  unArchiveTeacherUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/unarchiveTeacher.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnArchiveTeacherRouteConfig, UnArchiveTeacherResponse } from "./unArchiveTeacher.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UnArchiveTeacherController extends BaseController<UnArchiveTeacherRouteConfig> {
  constructor(
    @inject("UnArchiveTeacherUseCase")
    private readonly unarchiveTeacherUseCase: UnArchiveTeacherUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnArchiveTeacherRouteConfig>): Promise<void | APIResponse> {
    const dto: unArchiveTeacherUseCaseRequestDto = {
      teacherNewId: req.params.teacherNewId,
    };

    await this.unarchiveTeacherUseCase.execute(dto);
    return new SuccessResponse<UnArchiveTeacherResponse>("global.success");
  }
}
