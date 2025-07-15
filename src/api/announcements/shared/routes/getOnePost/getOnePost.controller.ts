import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IsUserAllowedToViewAllPostsParams } from "../../../../../feature/announcements/domain/Post.service";
import { GetOnePostUseCase } from "../../../../../feature/announcements/useCases/GetOnePost.usecase";
import { GetOnePostResponse, GetOnePostRouteConfig } from "./getOnePost.types";

@Controller()
export class GetOnePostController extends BaseController<GetOnePostRouteConfig> {
  constructor(@inject("GetOnePostUseCase") private getOnePostUseCase: GetOnePostUseCase) {
    super();
  }

  async main(req: TypedRequest<GetOnePostRouteConfig>): Promise<APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType,
    } as IsUserAllowedToViewAllPostsParams;

    const response = await this.getOnePostUseCase.execute(req.params.postNewId, userDetails);

    return new SuccessResponse<GetOnePostResponse>("global.success", response);
  }
}
