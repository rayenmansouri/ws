import { inject } from "../../../../../core/container/TypedContainer";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetReactionsOfCommentRouteConfig,
  GetReactionsOfCommentResponse,
} from "./getReactionsOfComment.types";
import { GetReactionsOfCommentUseCase } from "../../../../../feature/announcements/useCases/GetReactionsOfComment.usecase";
import { TEndUserEnum } from "../../../../../constants/globalEnums";

@Controller()
export class GetReactionsOfCommentController extends BaseController<GetReactionsOfCommentRouteConfig> {
  constructor(
    @inject("GetReactionsOfCommentUseCase")
    private getReactionsOfCommentUseCase: GetReactionsOfCommentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetReactionsOfCommentRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getReactionsOfCommentUseCase.execute({
      commentNewId: req.params.commentNewId,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
    });

    return new SuccessResponse<GetReactionsOfCommentResponse>("global.success", response);
  }
}
