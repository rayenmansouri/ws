import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReactToPostUseCase } from "../../../../../feature/announcements/useCases/ReactToPost.usecase";
import { ReactToPostRouteConfig, ReactToPostResponse } from "./reactToPost.types";

@Controller()
export class ReactToPostController extends BaseController<ReactToPostRouteConfig> {
  constructor(@inject("ReactToPostUseCase") private reactToPostUseCase: ReactToPostUseCase) {
    super();
  }

  async main(req: TypedRequest<ReactToPostRouteConfig>): Promise<void | APIResponse> {
    const response = await this.reactToPostUseCase.execute({
      postNewId: req.params.postNewId,
      reactionType: req.body.reactionType,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
    });

    return new SuccessResponse<ReactToPostResponse>("global.success", response);
  }
}
