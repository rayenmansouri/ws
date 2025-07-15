import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddReplyToCommentRouteConfig, AddReplyToCommentResponse } from "./addReplyToComment.types";
import { AddReplyToCommentUseCase } from "../../../../../feature/announcements/useCases/AddReplyToComment.usecase";
import { TEndUserEnum } from "../../../../../constants/globalEnums";

@Controller()
export class AddReplyToCommentController extends BaseController<AddReplyToCommentRouteConfig> {
  constructor(
    @inject("AddReplyToCommentUseCase")
    private addReplyToCommentUseCase: AddReplyToCommentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddReplyToCommentRouteConfig>): Promise<void | APIResponse> {
    const reply = await this.addReplyToCommentUseCase.execute({
      content: req.body.content,
      mentions: req.body.mentions,
      attachments: req.files?.attachments,
      userDetails: {
        user: req.user,
        userType: req.userType as TEndUserEnum,
      },
      parentCommentNewId: req.params.commentNewId,
    });
    return new SuccessResponse<AddReplyToCommentResponse>("post.commentAddedSuccessfully", reply);
  }
}
