import { Admin } from "./../../../../../feature/admins/domain/admin.entity";
import {
  UnAssignTeacherFromIssueUseCase,
  unassignTeacherFromIssueRequestDto,
} from "./../../../../../feature/issues/usecases/unassignTeacherFromIssue.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UnassignTeacherFromIssueRouteConfig,
  UnassignTeacherFromIssueResponse,
} from "./unassignTeacherFromIssue.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UnassignTeacherFromIssueController extends BaseController<UnassignTeacherFromIssueRouteConfig> {
  constructor(
    @inject("UnAssignTeacherFromIssueUseCase") private usecase: UnAssignTeacherFromIssueUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnassignTeacherFromIssueRouteConfig>): Promise<void | APIResponse> {
    const dto: unassignTeacherFromIssueRequestDto = {
      issueNewId: req.params.issueNewId,
      admin: req.user as unknown as Admin,
      tenantId: req.tenantId,
    };
    await this.usecase.execute(dto);
    return new SuccessResponse<UnassignTeacherFromIssueResponse>("global.success");
  }
}
