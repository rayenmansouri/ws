import {
  ArchiveAdminUseCase,
  ArchiveAdminUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/archiveAdmin.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ArchiveAdminRouteConfig, ArchiveAdminResponse } from "./archiveAdmin.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ArchiveAdminController extends BaseController<ArchiveAdminRouteConfig> {
  constructor(
    @inject("ArchiveAdminUseCase") private readonly archiveAdminUsecase: ArchiveAdminUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ArchiveAdminRouteConfig>): Promise<void | APIResponse> {
    const dto: ArchiveAdminUseCaseRequestDto = {
      adminNewId: req.params.adminNewId,
      tenantId: req.tenantId,
      currentUserNewId: req.user.newId,
    };

    await this.archiveAdminUsecase.execute(dto);
    return new SuccessResponse<ArchiveAdminResponse>("global.success");
  }
}
