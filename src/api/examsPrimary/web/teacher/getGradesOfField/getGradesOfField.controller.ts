import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfFieldUseCase } from "../../../../../feature/examGrade/useCases/primary/GetGradesOfField.usecase";
import { GetGradesOfFieldRouteConfig, GetGradesOfFieldResponse } from "./getGradesOfField.types";

@Controller()
export class GetGradesOfFieldController extends BaseController<GetGradesOfFieldRouteConfig> {
  constructor(
    @inject("GetGradesOfFieldUseCase") private getGradesOfFieldUseCase: GetGradesOfFieldUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGradesOfFieldRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getGradesOfFieldUseCase.execute({
      classNewId: req.params.classNewId,
      fieldIndex: +req.params.fieldIndex,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.TEACHER,
      userId: req.user._id,
    });

    return new SuccessResponse<GetGradesOfFieldResponse>("global.success", result);
  }
}
