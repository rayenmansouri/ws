import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdatePostRouteConfig, UpdatePostResponse } from "./updatePost.types";
import { UpdatePostUseCase } from "../../../../../feature/announcements/useCases/UpdatePost.usecase";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetOnePostUseCase } from "../../../../../feature/announcements/useCases/GetOnePost.usecase";

@Controller()
export class UpdatePostController extends BaseController<UpdatePostRouteConfig> {
  constructor(
    @inject("UpdatePostUseCase") private updatePostUseCase: UpdatePostUseCase,
    @inject("GetOnePostUseCase") private getOnePostUseCase: GetOnePostUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdatePostRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType!,
    };

    await this.updatePostUseCase.execute({
      postNewId: req.params.postNewId,
      userDetails,
      userTypes: req.body.userTypes,
      levelNewIds: req.body.levels,
      classNewIds: req.body.classes,
      groupNewIds: req.body.groups,
      attachments: req.files?.attachments,
      deleteAttachments: req.body.deleteAttachments,
      isCommentsAllowed: req.body.isCommentsAllowed,
      category: req.body.category,
      hashTags: req.body.hashTags,
      content: req.body.content,
    });

    const post = await this.getOnePostUseCase.execute(req.params.postNewId, userDetails);

    return new SuccessResponse<UpdatePostResponse>("post.updatedSuccessfully", post);
  }
}
