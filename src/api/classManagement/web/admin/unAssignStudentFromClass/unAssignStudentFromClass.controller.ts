import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnassignStudentFromClassUseCase } from "../../../../../feature/classes/useCases/UnassignStudentFromClass.usecase";
import {
  UnAssignStudentFromClassRouteConfig,
  UnAssignStudentFromClassResponse,
} from "./unAssignStudentFromClass.types";

@Controller()
export class UnAssignStudentFromClassController extends BaseController<UnAssignStudentFromClassRouteConfig> {
  constructor(
    @inject("UnassignStudentFromClassUseCase")
    private unassignStudentFromClassUseCase: UnassignStudentFromClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnAssignStudentFromClassRouteConfig>): Promise<void | APIResponse> {
    const response = await this.unassignStudentFromClassUseCase.execute({
      classNewId: req.params.classNewId,
      studentIds: req.body.studentIds,
    });
    return new SuccessResponse<UnAssignStudentFromClassResponse>("global.success", response);
  }
}
