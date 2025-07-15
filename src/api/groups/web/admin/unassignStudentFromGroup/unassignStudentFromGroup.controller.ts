import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnassignStudentFromGroupUseCase } from "../../../../../feature/groupManagement/useCases/UnassignStudentFromGroup.usecase";
import {
  UnassignStudentFromGroupRouteConfig,
  UnassignStudentFromGroupResponse,
} from "./unassignStudentFromGroup.types";

@Controller()
export class UnassignStudentFromGroupController extends BaseController<UnassignStudentFromGroupRouteConfig> {
  constructor(
    @inject("UnassignStudentFromGroupUseCase")
    private unassignStudentFromGroupUseCase: UnassignStudentFromGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnassignStudentFromGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.unassignStudentFromGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      studentNewIds: req.body.studentNewIds,
    });
    return new SuccessResponse<UnassignStudentFromGroupResponse>("global.success", response);
  }
}
