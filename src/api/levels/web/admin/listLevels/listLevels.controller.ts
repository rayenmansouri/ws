import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { ListLevelsRouteConfig, ListLevelsResponse } from "./listLevels.types";

@Controller()
export class ListLevelsController extends BaseController<ListLevelsRouteConfig> {
  constructor(@inject("LevelRepo") private levelRepo: LevelRepo) {
    super();
  }

  async main(req: TypedRequest<ListLevelsRouteConfig>): Promise<APIResponse> {
    const levels = await this.levelRepo.listLevels(
      { search: req.query.search, sort: { rank: 1 } },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListLevelsResponse>("global.listSuccessfullyRetrieved", levels);
  }
}
