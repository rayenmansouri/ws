import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IsUserAllowedToViewAllPostsParams } from "../../../../../feature/announcements/domain/Post.service";
import { GetOneCommentUseCase } from "../../../../../feature/announcements/useCases/GetOneComment.usecase";
import { GetOneCommentRouteConfig, GetOneCommentResponse } from "./getOneComment.types";

@Controller()
export class GetOneCommentController extends BaseController<GetOneCommentRouteConfig> {
  constructor(@inject("GetOneCommentUseCase") private getOneCommentUseCase: GetOneCommentUseCase) {
    super();
  }

  async main(req: TypedRequest<GetOneCommentRouteConfig>): Promise<APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType,
    } as IsUserAllowedToViewAllPostsParams;

    const response = await this.getOneCommentUseCase.execute(req.params.commentNewId, userDetails);

    return new SuccessResponse<GetOneCommentResponse>("global.success", response);
  }
}
