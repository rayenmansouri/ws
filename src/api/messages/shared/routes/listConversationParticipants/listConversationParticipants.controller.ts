import { ListConversationParticipantsRequestDTO } from "./../../../../../feature/messages/dtos/ListConversationParticipantsRequest.dto";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListConversationParticipantsRouteConfig,
  ListConversationParticipantsResponse,
} from "./listConversationParticipants.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { ListConversationParticipantsUseCase } from "../../../../../feature/messages/useCases/ListConversationParticipants.usecase";
@Controller()
export class ListConversationParticipantsController extends BaseController<ListConversationParticipantsRouteConfig> {
  constructor(
    @inject("ListConversationParticipantsUseCase")
    private readonly listConversationParticipantsUseCase: ListConversationParticipantsUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ListConversationParticipantsRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: ListConversationParticipantsRequestDTO = {
      conversationNewId: req.params.conversationNewId,
      userId: req.user._id,
      page: +req.query.page! || 1,
      limit: +req.query.limit! || 10,
      role: req.query.role,
    };

    const response = await this.listConversationParticipantsUseCase.execute(dto);
    return new SuccessResponse<ListConversationParticipantsResponse>("global.success", response);
  }
}
