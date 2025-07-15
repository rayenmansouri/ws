import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ArchiveParentUseCase,
  ArchiveParentUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/archiveParent.usecase";
import { ArchiveParentResponse, ArchiveParentRouteConfig } from "./archiveParent.types";

@Controller()
export class ArchiveParentController extends BaseController<ArchiveParentRouteConfig> {
  constructor(@inject("ArchiveParentUseCase") private archiveParentUsecase: ArchiveParentUseCase) {
    super();
  }

  async main(req: TypedRequest<ArchiveParentRouteConfig>): Promise<void | APIResponse> {
    const dto: ArchiveParentUseCaseRequestDto = {
      parentNewId: req.params.parentNewId,
      tenantId: req.tenantId,
    };

    await this.archiveParentUsecase.execute(dto);
    return new SuccessResponse<ArchiveParentResponse>("global.success");
  }
}
