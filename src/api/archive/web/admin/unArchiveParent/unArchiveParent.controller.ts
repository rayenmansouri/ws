import {
  UnArchiveParentUseCase,
  unArchiveParentUseCaseRequestDto,
} from "../../../../../feature/archive/useCases/unarchiveParent.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnArchiveParentRouteConfig, UnArchiveParentResponse } from "./unArchiveParent.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UnArchiveParentController extends BaseController<UnArchiveParentRouteConfig> {
  constructor(
    @inject("UnArchiveParentUseCase")
    private readonly unarchiveParentUseCase: UnArchiveParentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnArchiveParentRouteConfig>): Promise<void | APIResponse> {
    const dto: unArchiveParentUseCaseRequestDto = {
      parentNewId: req.params.parentNewId,
    };

    await this.unarchiveParentUseCase.execute(dto);
    return new SuccessResponse<UnArchiveParentResponse>("global.success");
  }
}
