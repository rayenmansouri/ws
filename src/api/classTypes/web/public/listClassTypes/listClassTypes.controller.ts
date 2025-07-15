import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassTypeRepo } from "../../../../../feature/classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { SubLevelRepo } from "../../../../../feature/subLevels/domains/SubLevel.repo";
import { ListClassTypesRouteConfig, ListClassTypesResponse } from "./listClassTypes.types";

@Controller()
export class ListClassTypesController extends BaseController<ListClassTypesRouteConfig> {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListClassTypesRouteConfig>): Promise<void | APIResponse> {
    const level = await this.levelRepo.findManyByNewIdsOrThrow(
      req.query.levelNewIds,
      "notFound.level",
    );

    const levelIds = level.map(level => level._id);

    const subLevels = await this.subLevelRepo.findSubLevelsOfLevels(levelIds);
    const subLevelIds = subLevels.map(subLevel => subLevel._id);

    const data = await this.classTypeRepo.listClassTypes(
      {
        subLevelIds,
        search: req.query.search,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(doc => ({
        _id: doc._id,
        name: doc.name,
        newId: doc.newId,
      })),
    };

    return new SuccessResponse<ListClassTypesResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
