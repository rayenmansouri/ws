import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetTopicsOfChaptersByClassTypeUseCase } from "../../../../../feature/lms/useCases/GetTopicsOfChaptersByClassType.usecase";
import { Teacher } from "../../../../../feature/teachers/domain/teacher.entity";
import {
  GetTopicsOfChaptersByClassTypeRouteConfig,
  GetTopicsOfChaptersByClassTypeResponse,
} from "./getTopicsOfChaptersByClassType.types";

@Controller()
export class GetTopicsOfChaptersByClassTypeController extends BaseController<GetTopicsOfChaptersByClassTypeRouteConfig> {
  constructor(
    @inject("GetTopicsOfChaptersByClassTypeUseCase")
    private getTopicsOfChaptersByClassTypeUseCase: GetTopicsOfChaptersByClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetTopicsOfChaptersByClassTypeRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getTopicsOfChaptersByClassTypeUseCase.execute({
      classTypeNewId: req.params.classTypeNewId,
      teacher: req.userType === END_USER_ENUM.TEACHER ? (req.user as unknown as Teacher) : null,
    });
    return new SuccessResponse<GetTopicsOfChaptersByClassTypeResponse>("global.success", response);
  }
}
