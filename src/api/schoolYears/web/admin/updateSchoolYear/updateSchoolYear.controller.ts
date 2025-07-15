import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSchoolYearUseCase } from "../../../../../feature/schoolYears/useCases/UpdateSchoolYear.usecase";
import { UpdateSchoolYearRouteConfig, UpdateSchoolYearResponse } from "./updateSchoolYear.types";

@Controller()
export class UpdateSchoolYearController extends BaseController<UpdateSchoolYearRouteConfig> {
  constructor(
    @inject("UpdateSchoolYearUseCase") private updateSchoolYearUseCase: UpdateSchoolYearUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSchoolYearRouteConfig>): Promise<void | APIResponse> {
    await this.updateSchoolYearUseCase.execute(req.params.schoolYearNewId, req.body);
    return new SuccessResponse<UpdateSchoolYearResponse>("global.success");
  }
}
