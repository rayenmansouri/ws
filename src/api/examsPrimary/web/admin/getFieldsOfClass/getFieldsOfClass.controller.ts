import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFieldsOfClassUseCase } from "../../../../../feature/examGrade/useCases/primary/GetFieldsOfClass.usecase";
import { GetFieldsOfClassRouteConfig, GetFieldsOfClassResponse } from "./getFieldsOfClass.types";

@Controller()
export class GetFieldsOfClassController extends BaseController<GetFieldsOfClassRouteConfig> {
  constructor(
    @inject("GetFieldsOfClassUseCase") private getFieldsOfClassUseCase: GetFieldsOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetFieldsOfClassRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getFieldsOfClassUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.ADMIN,
      userId: req.user._id,
    });

    return new SuccessResponse<GetFieldsOfClassResponse>("global.success", response);
  }
}
