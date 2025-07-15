import { RemoveParticipantsFromConversationDTO } from "./../../../../../feature/messages/dtos/RemoveParticipantFromGroupRequest.dto";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { RemoveParticipantsFromConversationUseCase } from "./../../../../../feature/messages/useCases/RemoveParticipantsFromConversation.usecase";
import {
  DeleteParticipantFromGroupResponse,
  DeleteParticipantFromGroupRouteConfig,
} from "./deleteParticipantFromGroup.types";

@Controller()
export class DeleteParticipantFromGroupController extends BaseController<DeleteParticipantFromGroupRouteConfig> {
  constructor(
    @inject("RemoveParticipantsFromConversationUseCase")
    private readonly removeParticipantsFromConversationUseCase: RemoveParticipantsFromConversationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<DeleteParticipantFromGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: RemoveParticipantsFromConversationDTO = {
      conversationNewId: req.params.conversationNewId,
      participantsIds: req.body.participantIds,
      userId: req.user._id,
    };

    await this.removeParticipantsFromConversationUseCase.execute(dto);

    return new SuccessResponse<DeleteParticipantFromGroupResponse>("global.success");
  }
}
