import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetClassDiplomasUseCase } from "../../../../../feature/examGrade/useCases/GetClassDiplomas.usecase";
import { GetClassDiplomasResponse, GetClassDiplomasRouteConfig } from "./getClassDiplomas.types";

@Controller()
export class GetClassDiplomasController extends BaseController<GetClassDiplomasRouteConfig> {
  constructor(
    @inject("GetClassDiplomasUseCase") private getClassDiplomasUseCase: GetClassDiplomasUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetClassDiplomasRouteConfig>): Promise<void | APIResponse> {
    const classDiplomas = await this.getClassDiplomasUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );
    return new SuccessResponse<GetClassDiplomasResponse>("global.success", classDiplomas);
  }
}
