import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetActivitiesOfClassTypeUseCase } from "../../../../../feature/smartCalendar/useCases/GetActivitiesOfClassType.usecase";
import {
  GetActivitiesOfClassTypeRouteConfig,
  GetActivitiesOfClassTypeResponse,
} from "./getActivitiesOfClassType.types";

@Controller()
export class GetActivitiesOfClassTypeController extends BaseController<GetActivitiesOfClassTypeRouteConfig> {
  constructor(
    @inject("GetActivitiesOfClassTypeUseCase")
    private getActivitiesOfClassTypeUseCase: GetActivitiesOfClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetActivitiesOfClassTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getActivitiesOfClassTypeUseCase.execute(req.params.classTypeNewId);

    return new SuccessResponse<GetActivitiesOfClassTypeResponse>("global.success", response);
  }
}
