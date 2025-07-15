import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListPostsOfUserUseCase } from "../../../../../feature/announcements/useCases/ListPostsOfUser.usecase";
import { OmitFromEnum } from "../../../../../types/utils/enums.util";
import { ListPostsResponse, ListPostsRouteConfig } from "./listPosts.types";

@Controller()
export class ListPostsController extends BaseController<ListPostsRouteConfig> {
  constructor(
    @inject("ListPostsOfUserUseCase") private listPostsOfUserUseCase: ListPostsOfUserUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListPostsRouteConfig>): Promise<void | APIResponse> {
    const user = req.user;
    const userDetails = {
      user,
      userType: req.userType as OmitFromEnum<TEndUserEnum, "admin">,
    };

    const response = await this.listPostsOfUserUseCase.execute(
      {
        hashTags: req.query.hashTags,
      },
      userDetails,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListPostsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
