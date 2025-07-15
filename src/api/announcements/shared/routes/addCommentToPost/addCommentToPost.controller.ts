import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddCommentToPostUseCase } from "../../../../../feature/announcements/useCases/AddCommentToPost.usecase";
import { AddCommentToPostRouteConfig, AddCommentToPostResponse } from "./addCommentToPost.types";

@Controller()
export class AddCommentToPostController extends BaseController<AddCommentToPostRouteConfig> {
  constructor(
    @inject("AddCommentToPostUseCase") private addCommentToPostUseCase: AddCommentToPostUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddCommentToPostRouteConfig>): Promise<void | APIResponse> {
    const comment = await this.addCommentToPostUseCase.execute({
      postNewId: req.params.postNewId,
      content: req.body.content,
      attachments: req.files?.attachments,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
      mentions: req.body.mentions,
    });

    return new SuccessResponse<AddCommentToPostResponse>("post.commentAddedSuccessfully", comment);
  }
}
