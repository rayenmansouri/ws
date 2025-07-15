import { Admin } from "./../../../../../feature/admins/domain/admin.entity";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ForwardIssueRouteConfig, ForwardIssueResponse } from "./forwardIssue.types";
import {
  ForwardIssueUseCaseUseCase,
  forwardIssueUseCaseRequestDto,
} from "../../../../../feature/issues/usecases/ForwardIssueUseCase.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ForwardIssueController extends BaseController<ForwardIssueRouteConfig> {
  constructor(@inject("ForwardIssueUseCaseUseCase") private usecase: ForwardIssueUseCaseUseCase) {
    super();
  }

  async main(req: TypedRequest<ForwardIssueRouteConfig>): Promise<void | APIResponse> {
    const dto: forwardIssueUseCaseRequestDto = {
      issueNewId: req.params.issueNewId,
      tenantId: req.tenantId,
      admin: req.user as unknown as Admin,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<ForwardIssueResponse>("global.success");
  }
}
