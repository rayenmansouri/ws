import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListConversationsUseCase } from "../../../../../feature/messages/useCases/ListConversations.usecase";
import { ListConversationsResponse, ListConversationsRouteConfig } from "./listConversations.types";

@Controller()
export class ListConversationsController extends BaseController<ListConversationsRouteConfig> {
  constructor(
    @inject("ListConversationsUseCase")
    private listConversationsUseCase: ListConversationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListConversationsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listConversationsUseCase.execute(
      {
        userId: req.user._id,
        userType: req.userType as TEndUserEnum,
        search: req.query.search,
        isGroup: req.query.isGroup,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListConversationsResponse>("global.success", response);
  }
}
