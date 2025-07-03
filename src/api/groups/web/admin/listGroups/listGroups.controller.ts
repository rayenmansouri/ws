import _ from "lodash";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { ID } from "../../../../../types/BaseEntity";
import { ListGroupsRouteConfig, ListGroupsResponse } from "./listGroups.types";
import { SubLevelRepo } from "../../../../../feature/subLevels/domains/SubLevel.repo";
import { EntityMapper } from "../../../../../feature/entity/mapper/entity.mapper";

@Controller()
export class ListGroupsController extends BaseController<ListGroupsRouteConfig> {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListGroupsRouteConfig>): Promise<APIResponse> {
    let levelIds: ID[] | undefined;

    if (req.query.levelNewIds) {
      const levels = await this.levelRepo.findManyByNewIdsOrThrow(
        req.query.levelNewIds,
        "notFound.level",
      );
      levelIds = levels.map(level => level._id);
    }

    const data = await this.groupRepo.list(
      { search: req.query.search, levelIds: levelIds },
      { page: req.query.page, limit: req.query.limit },
    );

    const response = {
      ...data,
      docs: data.docs.map(doc => EntityMapper.toEntityDto(doc)),
    };

    return new SuccessResponse<ListGroupsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
