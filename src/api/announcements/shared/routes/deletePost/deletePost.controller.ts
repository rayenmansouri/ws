import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeletePostUseCase } from "../../../../../feature/announcements/useCases/DeletePost.usecase";
import { DeletePostRouteConfig, DeletePostResponse } from "./deletePost.types";

@Controller()
export class DeletePostController extends BaseController<DeletePostRouteConfig> {
  constructor(@inject("DeletePostUseCase") private deletePostUseCase: DeletePostUseCase) {
    super();
  }

  async main(req: TypedRequest<DeletePostRouteConfig>): Promise<void | APIResponse> {
    await this.deletePostUseCase.execute(req.params.postNewId, {
      type: req.userType as TEndUserEnum,
      id: req.user._id,
    });

    return new SuccessResponse<DeletePostResponse>("post.deletedSuccessfully");
  }
}
