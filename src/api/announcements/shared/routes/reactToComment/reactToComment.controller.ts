import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReactToCommentUseCase } from "../../../../../feature/announcements/useCases/ReactToComment.usecase";
import { ReactToCommentRouteConfig, ReactToCommentResponse } from "./reactToComment.types";

@Controller()
export class ReactToCommentController extends BaseController<ReactToCommentRouteConfig> {
  constructor(
    @inject("ReactToCommentUseCase") private reactToCommentUseCase: ReactToCommentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ReactToCommentRouteConfig>): Promise<void | APIResponse> {
    const response = await this.reactToCommentUseCase.execute({
      commentNewId: req.params.commentNewId,
      reactionType: req.body.reactionType,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
    });

    return new SuccessResponse<ReactToCommentResponse>("global.success", response);
  }
}
