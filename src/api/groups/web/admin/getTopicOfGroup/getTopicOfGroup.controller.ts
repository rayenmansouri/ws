import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { EntityMapper } from "../../../../../feature/entity/mapper/entity.mapper";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetTopicOfGroupResponse, GetTopicOfGroupRouteConfig } from "./getTopicOfGroup.types";

@Controller()
export class GetTopicOfGroupController extends BaseController<GetTopicOfGroupRouteConfig> {
  constructor(@inject("GroupRepo") private groupRepo: GroupRepo) {
    super();
  }

  async main(req: TypedRequest<GetTopicOfGroupRouteConfig>): Promise<void | APIResponse> {
    const { groupNewId } = req.params;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["teacher"],
    });

    const topic = {
      ...EntityMapper.toEntityDto(group.groupType),
      teacher: UserMapper.toUserProfileDTO(group.teacher),
    };

    return new SuccessResponse<GetTopicOfGroupResponse>("global.success", [topic]);
  }
}
