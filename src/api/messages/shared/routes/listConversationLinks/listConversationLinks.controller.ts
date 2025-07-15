import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListConversationLinksRouteConfig,
  ListConversationLinksResponse,
} from "./listConversationLinks.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { ListConversationLinksUseCase } from "../../../../../feature/messages/useCases/ListConversationLinks.usecase";

@Controller()
export class ListConversationLinksController extends BaseController<ListConversationLinksRouteConfig> {
  constructor(
    @inject("ListConversationLinksUseCase")
    private readonly listConversationLinksUseCase: ListConversationLinksUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListConversationLinksRouteConfig>): Promise<void | APIResponse> {
    const result = await this.listConversationLinksUseCase.execute(
      req.params.conversationNewId,
      req.user._id,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListConversationLinksResponse>("global.success", result);
  }
}
