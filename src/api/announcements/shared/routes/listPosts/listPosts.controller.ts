import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { ListUserFeedUseCase } from "../../../../../feature/announcements/useCases/ListUserFeed.usecase";
import { School } from "../../../../../feature/schools/domain/school.entity";
import { OmitFromEnum } from "../../../../../types/utils/enums.util";
import { ListPostsResponse, ListPostsRouteConfig } from "./listPosts.types";

@Controller()
export class ListPostsController extends BaseController<ListPostsRouteConfig> {
  constructor(@inject("GetUserFeedUseCase") private getUserFeedUseCase: ListUserFeedUseCase) {
    super();
  }

  async main(req: TypedRequest<ListPostsRouteConfig>): Promise<void | APIResponse> {
    const user = req.user;
    const userDetails = {
      user,
      userType: req.userType as OmitFromEnum<TEndUserEnum, "admin">,
    };
    const school = schoolDocStore[req.tenantId] as unknown as School;

    const response = await this.getUserFeedUseCase.execute(
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

    return new SuccessResponse<ListPostsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
