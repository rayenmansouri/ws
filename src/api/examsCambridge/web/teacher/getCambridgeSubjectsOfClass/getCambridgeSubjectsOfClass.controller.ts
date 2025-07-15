import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetCambridgeSubjectsOfClassUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeSubjectsOfClass.usecase";
import {
  GetCambridgeSubjectsOfClassRouteConfig,
  GetCambridgeSubjectsOfClassResponse,
} from "./getCambridgeSubjectsOfClass.types";

@Controller()
export class GetCambridgeSubjectsOfClassController extends BaseController<GetCambridgeSubjectsOfClassRouteConfig> {
  constructor(
    @inject("GetCambridgeSubjectsOfClassUseCase")
    private getCambridgeSubjectsOfClassUseCase: GetCambridgeSubjectsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetCambridgeSubjectsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getCambridgeSubjectsOfClassUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.TEACHER,
      userId: req.user._id,
    });

    return new SuccessResponse<GetCambridgeSubjectsOfClassResponse>("global.success", result);
  }
}
