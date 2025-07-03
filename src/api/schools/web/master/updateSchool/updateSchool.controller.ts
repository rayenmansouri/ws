import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSchoolRouteConfig, UpdateSchoolResponse } from "./updateSchool.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { UpdateSchoolUseCase } from "../../../../../feature/schools/useCases/UpdateSchool.usecase";

@Controller()
export class UpdateSchoolController extends BaseController<UpdateSchoolRouteConfig> {
  constructor(@inject("UpdateSchoolUseCase") private updateSchoolUseCase: UpdateSchoolUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateSchoolRouteConfig>): Promise<void | APIResponse> {
    await this.updateSchoolUseCase.execute(req.params.schoolNewId, req.body);

    return new SuccessResponse<UpdateSchoolResponse>("school.updatedSuccessfully");
  }
}
