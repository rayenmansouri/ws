import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSchoolUseCase } from "../../../../../feature/schools/useCases/AddSchool.usecase";
import { AddSchoolResponse, AddSchoolRouteConfig } from "./addSchool.types";

@Controller()
export class AddSchoolController extends BaseController<AddSchoolRouteConfig> {
  constructor(@inject("AddSchoolUseCase") private addSchoolUseCase: AddSchoolUseCase) {
    super();
  }

  async main(req: TypedRequest<AddSchoolRouteConfig>): Promise<void | APIResponse> {
    await this.addSchoolUseCase.execute(req.body);

    return new SuccessResponse<AddSchoolResponse>("school.addedSuccessfully");
  }
}
