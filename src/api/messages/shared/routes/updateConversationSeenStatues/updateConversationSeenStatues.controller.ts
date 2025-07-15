import { UpdateConversationSeenStatusDTO } from "./../../../../../feature/messages/dtos/UpdateConversationSeenStatusRequest.dto";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateConversationSeenStatuesRouteConfig,
  UpdateConversationSeenStatuesResponse,
} from "./updateConversationSeenStatues.types";
import { UpdateConversationSeenStatusUseCase } from "../../../../../feature/messages/useCases/UpdateConversationSeenStatus.usecase";
import { inject } from "../../../../../core/container/TypedContainer";
import { TEndUserEnum } from "../../../../../constants/globalEnums";

@Controller()
export class UpdateConversationSeenStatuesController extends BaseController<UpdateConversationSeenStatuesRouteConfig> {
  constructor(
    @inject("UpdateConversationSeenStatusUseCase")
    private readonly updateConversationSeenStatusUseCase: UpdateConversationSeenStatusUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateConversationSeenStatuesRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: UpdateConversationSeenStatusDTO = {
      conversationId: req.params.conversationId,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
      newId: req.user.newId,
      phoneNumber: req.user.phoneNumber,
      fullName: req.user.fullName,
      email: req.user.email,
      avatar: req.user.avatar.link,
      tenantId: req.tenantId,
    };
    await this.updateConversationSeenStatusUseCase.execute(dto);

    return new SuccessResponse<UpdateConversationSeenStatuesResponse>("global.success");
  }
}
