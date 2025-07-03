import { UpdateConversationNameDTO } from "./../../../../../feature/messages/dtos/UpdateGroupConversationNameRequest.dto";
import { UpdateConversationNameUseCase } from "./../../../../../feature/messages/useCases/UpdateConversationName.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateConversationNameRouteConfig,
  UpdateConversationNameResponse,
} from "./updateConversationName.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdateConversationNameController extends BaseController<UpdateConversationNameRouteConfig> {
  constructor(
    @inject("UpdateConversationNameUseCase")
    private readonly updateConversationNameUseCase: UpdateConversationNameUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateConversationNameRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateConversationNameDTO = {
      userId: req.user._id,
      conversationNewId: req.params.conversationNewId,
      name: req.body.name,
      tenantId: req.tenantId,
    };

    await this.updateConversationNameUseCase.execute(dto);

    return new SuccessResponse<UpdateConversationNameResponse>("global.success");
  }
}
