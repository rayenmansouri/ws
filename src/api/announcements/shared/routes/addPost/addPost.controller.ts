import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddPostRequest,
  AddPostUseCase,
} from "../../../../../feature/announcements/useCases/AddPost.usecase";
import { AddPostRouteConfig, AddPostResponse } from "./addPost.types";

@Controller()
export class AddPostController extends BaseController<AddPostRouteConfig> {
  constructor(@inject("AddPostUseCase") private addPostUseCase: AddPostUseCase) {
    super();
  }

  async main(req: TypedRequest<AddPostRouteConfig>): Promise<void | APIResponse> {
    const dto: AddPostRequest = {
      content: req.body.content,
      category: req.body.category,
      classNewIds: req.body.classes,
      groupNewIds: req.body.groups,
      levelNewIds: req.body.levels,
      userTypes: req.body.userTypes,
      isCommentsAllowed: req.body.isCommentsAllowed ?? true,
      hashTags: req.body.hashTags || [],
      attachments: req.files?.attachments,
      scheduleAt: req.body.scheduleAt,
      userDetails: {
        user: req.user,
        userType: req.userType!,
      },
    };

    const response = await this.addPostUseCase.execute(dto);

    return new SuccessResponse<AddPostResponse>("post.addedSuccessfully", response);
  }
}
