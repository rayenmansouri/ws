import { inject } from "../../../../../core/container/TypedContainer";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  TogglePinStatusOfPostRouteConfig,
  TogglePinStatusOfPostResponse,
} from "./togglePinStatusOfPost.types";
import { TogglePinStatusOfPostUseCase } from "../../../../../feature/announcements/useCases/TogglePinStatusOfPost.usecase";

@Controller()
export class TogglePinStatusOfPostController extends BaseController<TogglePinStatusOfPostRouteConfig> {
  constructor(
    @inject("TogglePinStatusOfPostUseCase")
    private togglePinStatusOfPostUseCase: TogglePinStatusOfPostUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<TogglePinStatusOfPostRouteConfig>): Promise<void | APIResponse> {
    await this.togglePinStatusOfPostUseCase.execute({
      postNewId: req.params.postNewId,
    });

    return new SuccessResponse<TogglePinStatusOfPostResponse>("global.success");
  }
}
