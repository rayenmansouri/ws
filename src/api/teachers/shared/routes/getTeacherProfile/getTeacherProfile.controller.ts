import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetTeacherProfileUsecase,
  getTeacherProfileRequestDto,
} from "../../../../../feature/teachers/useCases/GetTeacherProfile.usecase";
import { GetTeacherProfileRouteConfig, GetTeacherProfileResponse } from "./getTeacherProfile.types";

@Controller()
export class GetTeacherProfileController extends BaseController<GetTeacherProfileRouteConfig> {
  constructor(
    @inject("GetTeacherProfileUsecase")
    private getTeacherProfileUsecase: GetTeacherProfileUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetTeacherProfileRouteConfig>): Promise<void | APIResponse> {
    const dto: getTeacherProfileRequestDto = {
      teacherNewId: req.user.newId,
    };
    const teacherProfile = await this.getTeacherProfileUsecase.execute(dto);

    return new SuccessResponse<GetTeacherProfileResponse>("global.success", teacherProfile);
  }
}
