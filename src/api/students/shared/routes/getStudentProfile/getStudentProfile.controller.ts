import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentProfileUseCase } from "../../../../../feature/students/useCases/GetStudentProfile.usecase";
import { GetStudentProfileRouteConfig, GetStudentProfileResponse } from "./getStudentProfile.types";

@Controller()
export class GetStudentProfileController extends BaseController<GetStudentProfileRouteConfig> {
  constructor(
    @inject("GetStudentProfileUseCase")
    private getStudentProfileUseCase: GetStudentProfileUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentProfileRouteConfig>): Promise<void | APIResponse> {
    const studentProfile = await this.getStudentProfileUseCase.execute({
      studentNewId: req.user.newId,
    });

    return new SuccessResponse<GetStudentProfileResponse>("global.success", studentProfile);
  }
}
