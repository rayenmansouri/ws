import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AssignStudentToGroupUseCase } from "../../../../../feature/groupManagement/useCases/AssignStudentToGroup.usecase";
import {
  AssignStudentToGroupRouteConfig,
  AssignStudentToGroupResponse,
} from "./assignStudentToGroup.types";

@Controller()
export class AssignStudentToGroupController extends BaseController<AssignStudentToGroupRouteConfig> {
  constructor(
    @inject("AssignStudentToGroupUseCase")
    private assignStudentToGroupUseCase: AssignStudentToGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AssignStudentToGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.assignStudentToGroupUseCase.execute({
      studentNewIds: req.body.studentNewIds,
      groupNewId: req.params.groupNewId,
    });
    return new SuccessResponse<AssignStudentToGroupResponse>("global.success", response);
  }
}
