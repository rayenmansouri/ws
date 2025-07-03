import { ListConversationMultimediaUseCase } from "./../../../../../feature/messages/useCases/ListConversationMultimedia.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListConversationMultimediaRouteConfig,
  ListConversationMultimediaResponse,
} from "./listConversationMultimedia.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";

@Controller()
export class ListConversationMultimediaController extends BaseController<ListConversationMultimediaRouteConfig> {
  constructor(
    @inject("ListConversationMultimediaUseCase")
    private listConversationMultimediaUseCase: ListConversationMultimediaUseCase,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ListConversationMultimediaRouteConfig>,
  ): Promise<void | APIResponse> {
    const { conversationNewId } = req.params;

    const response = await this.listConversationMultimediaUseCase.execute(
      conversationNewId,
      req.user._id,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListConversationMultimediaResponse>("global.success", response);
  }
}
