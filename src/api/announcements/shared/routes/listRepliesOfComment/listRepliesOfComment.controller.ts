import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IsUserAllowedToViewAllPostsParams } from "../../../../../feature/announcements/domain/Post.service";
import { ListRepliesOfCommentUseCase } from "../../../../../feature/announcements/useCases/ListRepliesOfComment.usecase";
import {
  ListRepliesOfCommentRouteConfig,
  ListRepliesOfCommentResponse,
} from "./listRepliesOfComment.types";

@Controller()
export class ListRepliesOfCommentController extends BaseController<ListRepliesOfCommentRouteConfig> {
  constructor(
    @inject("ListRepliesOfCommentUseCase")
    private listRepliesOfCommentUseCase: ListRepliesOfCommentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListRepliesOfCommentRouteConfig>): Promise<APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType,
    } as IsUserAllowedToViewAllPostsParams;

    const response = await this.listRepliesOfCommentUseCase.execute(
      req.params.commentNewId,
      userDetails,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListRepliesOfCommentResponse>("global.success", response);
  }
}
