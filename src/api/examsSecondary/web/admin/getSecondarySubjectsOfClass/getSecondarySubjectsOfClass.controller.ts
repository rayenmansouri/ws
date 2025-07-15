import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondarySubjectsOfClassUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondarySubjectsOfClass.usecase";
import {
  GetSecondarySubjectsOfClassRouteConfig,
  GetSecondarySubjectsOfClassResponse,
} from "./getSecondarySubjectsOfClass.types";

@Controller()
export class GetSecondarySubjectsOfClassController extends BaseController<GetSecondarySubjectsOfClassRouteConfig> {
  constructor(
    @inject("GetSecondarySubjectsOfClassUseCase")
    private getSecondarySubjectsOfClassUseCase: GetSecondarySubjectsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSecondarySubjectsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getSecondarySubjectsOfClassUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.ADMIN,
      userId: req.user._id,
    });

    return new SuccessResponse<GetSecondarySubjectsOfClassResponse>("global.success", result);
  }
}
