import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetUsersOfPostForMentionUseCase } from "../../../../../feature/announcements/useCases/GetUsersOfPostForMention.usecase";
import {
  GetUsersOfPostForMentionResponse,
  GetUsersOfPostForMentionRouteConfig,
} from "./getUsersOfPostForMention.types";

@Controller()
export class GetUsersOfPostForMentionController extends BaseController<GetUsersOfPostForMentionRouteConfig> {
  constructor(
    @inject("GetUsersOfPostForMentionUseCase")
    private getUsersOfPostForMentionUseCase: GetUsersOfPostForMentionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetUsersOfPostForMentionRouteConfig>): Promise<void | APIResponse> {
    if (!req.query.search)
      return new SuccessResponse<GetUsersOfPostForMentionResponse>("global.success", []);

    const response = await this.getUsersOfPostForMentionUseCase.execute({
      search: req.query.search,
      postNewId: req.query.postNewId,
    });

    return new SuccessResponse<GetUsersOfPostForMentionResponse>("global.success", response);
  }
}
