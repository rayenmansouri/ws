import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateSmsSoldRequestDto,
  UpdateSmsSoldUseCase,
} from "./../../../../../feature/schools/useCases/UpdateSmsSold.usecase";
import { UpdateSmsSoldResponse, UpdateSmsSoldRouteConfig } from "./updateSmsSold.types";

@Controller()
export class UpdateSmsSoldController extends BaseController<UpdateSmsSoldRouteConfig> {
  constructor(
    @inject("UpdateSmsSoldUseCase") private readonly updateSmsSoldUseCase: UpdateSmsSoldUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSmsSoldRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateSmsSoldRequestDto = {
      smsSold: req.body.smsSold,
      operation: req.body.operation,
      tenantId: req.params.schoolId,
      masterId: req.user._id,
    };

    await this.updateSmsSoldUseCase.execute(dto);

    return new SuccessResponse<UpdateSmsSoldResponse>("global.success");
  }
}
