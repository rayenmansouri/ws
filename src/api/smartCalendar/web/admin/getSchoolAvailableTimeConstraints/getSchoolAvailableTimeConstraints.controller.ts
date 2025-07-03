import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetSchoolAvailableTimeConstraintsRouteConfig,
  GetSchoolAvailableTimeConstraintsResponse,
} from "./getSchoolAvailableTimeConstraints.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetSchoolAvailableTimeConstraintsUseCase } from "../../../../../feature/smartCalendar/useCases/getSchoolAvailableTimeConstraint.usecase";

@Controller()
export class GetSchoolAvailableTimeConstraintsController extends BaseController<GetSchoolAvailableTimeConstraintsRouteConfig> {
  constructor(
    @inject("GetSchoolAvailableTimeConstraintsUseCase")
    private readonly useCase: GetSchoolAvailableTimeConstraintsUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSchoolAvailableTimeConstraintsRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.useCase.execute(req.tenantId);

    return new SuccessResponse<GetSchoolAvailableTimeConstraintsResponse>("global.success", result);
  }
}
