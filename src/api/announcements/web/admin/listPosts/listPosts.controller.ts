import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { Populate } from "../../../../../core/populateTypes";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { AdminMetaData } from "../../../../../feature/admins/domain/admin.entity";
import { PostService } from "../../../../../feature/announcements/domain/Post.service";
import { ListAllPostsFeedUseCase } from "../../../../../feature/announcements/useCases/ListAllPostsFeed.usecase";
import { ListUserFeedUseCase } from "../../../../../feature/announcements/useCases/ListUserFeed.usecase";
import { School } from "../../../../../feature/schools/domain/school.entity";
import { ListPostsResponse, ListPostsRouteConfig } from "./listPosts.types";

@Controller()
export class ListPostsController extends BaseController<ListPostsRouteConfig> {
  constructor(
    @inject("GetAllPostsUseCase") private getAllPostsUseCase: ListAllPostsFeedUseCase,
    @inject("GetUserFeedUseCase") private getUserFeedUseCase: ListUserFeedUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListPostsRouteConfig>): Promise<APIResponse> {
    const admin = req.user as Populate<AdminMetaData, "roles">;
    const school = schoolDocStore[req.tenantId] as unknown as School;
    const userDetails = {
      user: admin,
      userType: END_USER_ENUM.ADMIN,
    };

    let response: ListPostsResponse;

    if (PostService.isUserAllowedToViewAllPosts({ user: admin, userType: END_USER_ENUM.ADMIN }))
      response = await this.getAllPostsUseCase.execute(
        {
          hashTags: req.query.hashTags,
        },
        userDetails,
        school,
        {
          page: req.query.page,
          limit: req.query.limit,
        },
      );
    else
      response = await this.getUserFeedUseCase.execute(
        { hashTags: req.query.hashTags },
        userDetails,
        school,
        {
          page: req.query.page,
          limit: req.query.limit,
        },
      );

    return new SuccessResponse<ListPostsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
