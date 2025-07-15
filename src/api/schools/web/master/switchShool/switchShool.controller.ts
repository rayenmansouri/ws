import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SwitchShoolRouteConfig, SwitchShoolResponse } from "./switchShool.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { SwitchToSchoolUsecase } from "../../../../../feature/schools/useCases/SwitchToSchool.usecase";

@Controller()
export class SwitchShoolController extends BaseController<SwitchShoolRouteConfig> {
  constructor(
    @inject("SwitchToSchoolUsecase") private switchToSchoolUsecase: SwitchToSchoolUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<SwitchShoolRouteConfig>): Promise<void | APIResponse> {
    const token = await this.switchToSchoolUsecase.execute(req.params.schoolNewId);

    return new SuccessResponse<SwitchShoolResponse>("global.success", { token });
  }
}
