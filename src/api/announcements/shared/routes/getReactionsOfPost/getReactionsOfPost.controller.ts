import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetReactionsOfPostUseCase } from "../../../../../feature/announcements/useCases/GetReactionsOfPost.usecase";
import {
  GetReactionsOfPostRouteConfig,
  GetReactionsOfPostResponse,
} from "./getReactionsOfPost.types";

@Controller()
export class GetReactionsOfPostController extends BaseController<GetReactionsOfPostRouteConfig> {
  constructor(
    @inject("GetReactionsOfPostUseCase")
    private getReactionsOfPostUseCase: GetReactionsOfPostUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetReactionsOfPostRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getReactionsOfPostUseCase.execute({
      postNewId: req.params.postNewId,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
    });

    return new SuccessResponse<GetReactionsOfPostResponse>("global.success", response);
  }
}
