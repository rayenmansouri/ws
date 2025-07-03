import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetOneConversationRouteConfig,
  GetOneConversationResponse,
} from "./getOneConversation.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetConversationUseCase } from "../../../../../feature/messages/useCases/getConversation.usecase";

@Controller()
export class GetOneConversationController extends BaseController<GetOneConversationRouteConfig> {
  constructor(
    @inject("GetConversationUseCase")
    private getConversationUseCase: GetConversationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetOneConversationRouteConfig>): Promise<void | APIResponse> {
    const conversation = await this.getConversationUseCase.execute(
      req.params.conversationNewId,
      req.user._id,
    );
    return new SuccessResponse<GetOneConversationResponse>("global.success", conversation);
  }
}
