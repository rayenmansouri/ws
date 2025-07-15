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

  async main(req: TypedRequest<ListLevelsRouteConfig>): Promise<void | APIResponse> {
    const data = await this.levelRepo.listLevels(
      {
        search: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(level => ({
        _id: level._id,
        newId: level.newId,
        name: level.name,
      })),
    };

    return new SuccessResponse<ListLevelsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
