import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AssignStudentToClassUseCase } from "../../../../../feature/classes/useCases/AssignStudentToClass.usecase";
import {
  AssignStudentToClassRouteConfig,
  AssignStudentToClassResponse,
} from "./AssignStudentToClass.types";

@Controller()
export class AssignStudentToClassController extends BaseController<AssignStudentToClassRouteConfig> {
  constructor(
    @inject("AssignStudentToClassUseCase")
    private assignStudentToClassUseCase: AssignStudentToClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AssignStudentToClassRouteConfig>): Promise<void | APIResponse> {
    const { classNewId } = req.params;
    const { students: studentIds } = req.body;

    const response = await this.assignStudentToClassUseCase.execute({
      classNewId,
      studentIds,
    });
    return new SuccessResponse<AssignStudentToClassResponse>("global.success", response);
  }
}
