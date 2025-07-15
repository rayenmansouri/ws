import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSchoolConfigRouteConfig, GetSchoolConfigResponse } from "./getSchoolConfig.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { SchoolRepo } from "../../../../../feature/schools/domain/School.repo";
import { FeatureFlagService } from "../../../../../feature/schools/domain/FeatureFlag.service";

@Controller()
export class GetSchoolConfigController extends BaseController<GetSchoolConfigRouteConfig> {
  constructor(@inject("SchoolRepo") private schoolRepo: SchoolRepo) {
    super();
  }

  async main(req: TypedRequest<GetSchoolConfigRouteConfig>): Promise<void | APIResponse> {
    const school = await this.schoolRepo.findOneBySubdomainOrThrow(req.params.subdomain);
    return new SuccessResponse<GetSchoolConfigResponse>("global.success", {
      instanceType: school.instanceType || null,
      flags: FeatureFlagService.getSchoolFeatureFlags(school),
    });
  }
}
