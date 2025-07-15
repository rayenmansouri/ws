import { ListSubLevelsResponse } from "./listSubLevels.types";
import { ListSubLevelsRouteConfig } from "./listSubLevels.types";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SubLevelRepo } from "../../../../../feature/subLevels/domains/SubLevel.repo";

@Controller()
export class ListSubLevelsController extends BaseController<ListSubLevelsRouteConfig> {
  constructor(@inject("SubLevelRepo") private subLevelRepo: SubLevelRepo) {
    super();
  }

  async main(req: TypedRequest<ListSubLevelsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.subLevelRepo.listSubLevels(
      {
        search: req.query.search,
        hasSections: req.query.hasSections,
        levelNewIds: req.query.levelNewIds,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
        sort: { rank: 1 },
      },
    );
    return new SuccessResponse<ListSubLevelsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
