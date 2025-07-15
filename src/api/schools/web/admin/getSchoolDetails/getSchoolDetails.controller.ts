import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSchoolDetailsUseCase } from "../../../../../feature/schools/useCases/GetSchoolInformation.usecase";
import { GetSchoolDetailsRouteConfig, GetSchoolDetailsResponse } from "./getSchoolDetails.types";

@Controller()
export class GetSchoolDetailsController extends BaseController<GetSchoolDetailsRouteConfig> {
  constructor(
    @inject("GetSchoolDetailsUseCase") private getSchoolDetailsUseCase: GetSchoolDetailsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSchoolDetailsRouteConfig>): Promise<void | APIResponse> {
    const response = this.getSchoolDetailsUseCase.execute();
    return new SuccessResponse<GetSchoolDetailsResponse>("global.success", response);
  }
}
