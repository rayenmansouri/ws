import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IsUserAllowedToViewAllPostsParams } from "../../../../../feature/announcements/domain/Post.service";
import { ListCommentsOfPostUseCase } from "../../../../../feature/announcements/useCases/ListCommentsOfPost.usecase";
import {
  ListCommentsOfPostRouteConfig,
  ListCommentsOfPostResponse,
} from "./listCommentsOfPost.types";

@Controller()
export class ListCommentsOfPostController extends BaseController<ListCommentsOfPostRouteConfig> {
  constructor(
    @inject("ListCommentsOfPostUseCase")
    private listCommentsOfPostUseCase: ListCommentsOfPostUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListCommentsOfPostRouteConfig>): Promise<APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType,
    } as IsUserAllowedToViewAllPostsParams;

    const response = await this.listCommentsOfPostUseCase.execute(
      req.params.postNewId,
      userDetails,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListCommentsOfPostResponse>("global.success", response);
  }
}
