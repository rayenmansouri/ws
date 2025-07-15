import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBSubjectsOfClassUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBSubjectsOfClass.usecase";
import {
  GetIBSubjectsOfClassResponse,
  GetIBSubjectsOfClassRouteConfig,
} from "./getIBSubjectsOfClass.types";

@Controller()
export class GetIBSubjectsOfClassController extends BaseController<GetIBSubjectsOfClassRouteConfig> {
  constructor(
    @inject("GetIBSubjectsOfClassUseCase")
    private getIBSubjectsOfClassUseCase: GetIBSubjectsOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBSubjectsOfClassRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getIBSubjectsOfClassUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TEndUserEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<GetIBSubjectsOfClassResponse>("global.success", result);
  }
}
