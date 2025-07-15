import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { RegisterStudentUseCase } from "../../../../../feature/preRegistration/useCases/RegisterStudent.usecase";
import { RegisterStudentRouteConfig, RegisterStudentResponse } from "./registerStudent.types";

@Controller()
export class RegisterStudentController extends BaseController<RegisterStudentRouteConfig> {
  constructor(
    @inject("RegisterStudentUseCase") private registerStudentUseCase: RegisterStudentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<RegisterStudentRouteConfig>): Promise<void | APIResponse> {
    await this.registerStudentUseCase.execute(req.params.preRegistrationId);

    return new SuccessResponse<RegisterStudentResponse>("global.success");
  }
}
