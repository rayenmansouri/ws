import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetChaptersByTopicUseCase } from "../../../../../feature/lms/useCases/GetChaptersByTopic.usecase";
import {
  GetChaptersByTopicRouteConfig,
  GetChaptersByTopicResponse,
} from "./getChaptersByTopic.types";

@Controller()
export class GetChaptersByTopicController extends BaseController<GetChaptersByTopicRouteConfig> {
  constructor(
    @inject("GetChaptersByTopicUseCase")
    private getChaptersByTopicUseCase: GetChaptersByTopicUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetChaptersByTopicRouteConfig>): Promise<void | APIResponse> {
    const { topicNewId, topicType } = req.query;

    const chapters = await this.getChaptersByTopicUseCase.execute({
      topicType,
      topicNewId,
    });
    return new SuccessResponse<GetChaptersByTopicResponse>("global.success", chapters);
  }
}
