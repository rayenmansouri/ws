import { GetMessageReactionsUseCase } from "./../../../../../feature/messages/useCases/GetMessageReactions.usercase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetMessageReactionsRouteConfig,
  GetMessageReactionsResponse,
} from "./GetMessageReactions.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetMessageReactionsController extends BaseController<GetMessageReactionsRouteConfig> {
  constructor(
    @inject("GetMessageReactionsUseCase")
    private getMessageReactionsUseCase: GetMessageReactionsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetMessageReactionsRouteConfig>): Promise<void | APIResponse> {
    const messagesReactions = await this.getMessageReactionsUseCase.execute(
      req.params.messageNewId,
      req.user._id,
    );

    return new SuccessResponse<GetMessageReactionsResponse>("global.success", messagesReactions);
  }
}
