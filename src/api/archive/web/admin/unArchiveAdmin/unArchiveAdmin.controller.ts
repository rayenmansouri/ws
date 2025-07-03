import {
  UnArchiveAdminUseCase,
  unArchiveAdminUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/unarchiveAdmin.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnArchiveAdminRouteConfig, UnArchiveAdminResponse } from "./unArchiveAdmin.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UnArchiveAdminController extends BaseController<UnArchiveAdminRouteConfig> {
  constructor(
    @inject("UnArchiveAdminUseCase") private readonly unArchiveAdminUseCase: UnArchiveAdminUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnArchiveAdminRouteConfig>): Promise<void | APIResponse> {
    const dto: unArchiveAdminUseCaseRequestDto = {
      adminNewId: req.params.adminNewId,
    };
    await this.unArchiveAdminUseCase.execute(dto);

    return new SuccessResponse<UnArchiveAdminResponse>("global.success");
  }
}
