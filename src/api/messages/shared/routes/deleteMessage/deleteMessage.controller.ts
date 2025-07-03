import { DeleteMessageUseCase } from "./../../../../../feature/messages/useCases/DeleteMessage.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteMessageRouteConfig, DeleteMessageResponse } from "./deleteMessage.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class DeleteMessageController extends BaseController<DeleteMessageRouteConfig> {
  constructor(
    @inject("DeleteMessageUseCase") private readonly deleteMessageUseCase: DeleteMessageUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteMessageRouteConfig>): Promise<void | APIResponse> {
    await this.deleteMessageUseCase.execute(req.params.messageNewId, req.user._id, req.tenantId);
    return new SuccessResponse<DeleteMessageResponse>("global.success");
  }
}
