import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { IsUserAllowedToViewAllPostsParams } from "../../../../../feature/announcements/domain/Post.service";
import { EnrichOnePostUseCase } from "../../../../../feature/announcements/useCases/EnrichOnePost.usecase";
import { School } from "../../../../../feature/schools/domain/school.entity";
import { GetOnePostRouteConfig, GetOnePostResponse } from "./getOnePost.types";

@Controller()
export class GetOnePostController extends BaseController<GetOnePostRouteConfig> {
  constructor(@inject("EnrichOnePostUseCase") private enrichOnePostUseCase: EnrichOnePostUseCase) {
    super();
  }

  async main(req: TypedRequest<GetOnePostRouteConfig>): Promise<APIResponse> {
    const userDetails = {
      user: req.user,
      userType: req.userType,
    } as IsUserAllowedToViewAllPostsParams;

    const school = schoolDocStore[req.tenantId] as unknown as School;

    const response = await this.enrichOnePostUseCase.execute(
      req.params.postNewId,
      userDetails,
      school,
    );

    return new SuccessResponse<GetOnePostResponse>("global.success", response);
  }
}
