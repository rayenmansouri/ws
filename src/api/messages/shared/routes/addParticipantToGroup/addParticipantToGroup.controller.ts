import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddParticipantsToConversationUseCase } from "../../../../../feature/messages/useCases/AddParticipantsToConversation.usecase";
import { AddParticipantsToConversationDTO } from "./../../../../../feature/messages/dtos/AddParticipantToConversationRequest.dto";
import {
  AddParticipantToGroupResponse,
  AddParticipantToGroupRouteConfig,
} from "./addParticipantToGroup.types";

@Controller()
export class AddParticipantToGroupController extends BaseController<AddParticipantToGroupRouteConfig> {
  constructor(
    @inject("AddParticipantsToConversationUseCase")
    private addParticipantsToConversationUseCase: AddParticipantsToConversationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddParticipantToGroupRouteConfig>): Promise<void | APIResponse> {
    const dto: AddParticipantsToConversationDTO = {
      conversationNewId: req.params.conversationNewId,
      tenantId: req.tenantId,
      participants: req.body.participants.map(participant => ({
        user: participant._id,
        userType: participant.userType,
      })),
      userId: req.user._id,
    };

    await this.addParticipantsToConversationUseCase.execute(dto);

    return new SuccessResponse<AddParticipantToGroupResponse>("global.success");
  }
}
