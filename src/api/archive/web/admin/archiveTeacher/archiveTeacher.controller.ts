import {
  ArchiveTeacherUseCase,
  ArchiveTeacherUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/archiveTeacher.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ArchiveTeacherRouteConfig, ArchiveTeacherResponse } from "./archiveTeacher.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ArchiveTeacherController extends BaseController<ArchiveTeacherRouteConfig> {
  constructor(
    @inject("ArchiveTeacherUseCase") private readonly archiveTeacherUsecase: ArchiveTeacherUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ArchiveTeacherRouteConfig>): Promise<void | APIResponse> {
    const dto: ArchiveTeacherUseCaseRequestDto = {
      teacherNewId: req.params.teacherNewId,
      tenantId: req.tenantId,
    };

    await this.archiveTeacherUsecase.execute(dto);

    return new SuccessResponse<ArchiveTeacherResponse>("global.success");
  }
}
