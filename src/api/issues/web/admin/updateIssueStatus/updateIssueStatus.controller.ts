import {
  UpdateIssueStatusUseCase,
  updateIssueStatusRequestDto,
} from "./../../../../../feature/issues/usecases/updateIssueStatus.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateIssueStatusRouteConfig, UpdateIssueStatusResponse } from "./updateIssueStatus.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdateIssueStatusController extends BaseController<UpdateIssueStatusRouteConfig> {
  constructor(@inject("UpdateIssueStatusUseCase") private usecase: UpdateIssueStatusUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateIssueStatusRouteConfig>): Promise<void | APIResponse> {
    const dto: updateIssueStatusRequestDto = {
      issueNewId: req.params.issueNewId,
      status: req.body.status,
      adminId: req.user._id,
      tenantId: req.tenantId,
    };
    await this.usecase.execute(dto);
    return new SuccessResponse<UpdateIssueStatusResponse>("global.success");
  }
}
