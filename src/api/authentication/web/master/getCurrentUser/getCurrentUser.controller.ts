import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { School } from "../../../../../feature/schools/domain/school.entity";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetCurrentUserResponse, GetCurrentUserRouteConfig } from "./getCurrentUser.types";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<GetCurrentUserRouteConfig>): Promise<void | APIResponse> {
    const FAKE_SCHOOL = {
      logo: null,
      subdomain: "master",
      name: "Master",
      taxRate: 0,
      featureFlags: {},
    } as School;

    const response = UserMapper.toCurrentUserDTO({
      user: req.user,
      school: FAKE_SCHOOL,
      unseenNotification: 0,
      unseenConversations: 0,
      unseenAnnouncements: 0,
      unseenParentDemands: null,
      language: req.language,
    });
    return new SuccessResponse<GetCurrentUserResponse>("global.success", response);
  }
}
