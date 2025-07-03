import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AssignTeacherToIssueRouteConfig,
  AssignTeacherToIssueResponse,
} from "./assignTeacherToIssue.types";
import {
  AssignTeacherToIssueUseCase,
  assignTeacherToIssueRequestDto,
} from "../../../../../feature/issues/usecases/assignTeacherToIssue.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class AssignTeacherToIssueController extends BaseController<AssignTeacherToIssueRouteConfig> {
  constructor(@inject("AssignTeacherToIssueUseCase") private usecase: AssignTeacherToIssueUseCase) {
    super();
  }

  async main(req: TypedRequest<AssignTeacherToIssueRouteConfig>): Promise<void | APIResponse> {
    const dto: assignTeacherToIssueRequestDto = {
      issueNewId: req.params.issueNewId,
      teacherId: req.body.teacherId,
      adminId: req.user._id,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<AssignTeacherToIssueResponse>("global.success");
  }
}
