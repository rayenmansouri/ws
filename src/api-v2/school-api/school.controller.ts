import { Controller } from "../../core/container/decorators/Controller.decorator";
import { inject } from "../../core/container/TypedContainer";
import { BaseController } from "../../core/express/controllers/BaseController";
import { getTenantConnection } from "../../core/express/middlewares/getTenantConnection";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { addSchoolToGlobalStore } from "../../core/subdomainStore";
import { getNewTenantConnection } from "../../database/connectionDB/tenantPoolConnection";
import { School } from "../../feature/school-management/domain/school.entity";
import { SchoolRepository } from "../../feature/school-management/domain/school.repo";
import { CreateSchoolRouteConfig, CreateSchoolResponse } from "./school.types";

@Controller()
export class CreateSchoolController extends BaseController<CreateSchoolRouteConfig> {
  constructor(
    @inject("SchoolRepository") private schoolRepo: SchoolRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<CreateSchoolRouteConfig>): Promise<void | APIResponse> {
    // TODO: Implement create school use case
    const mockSchool = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      subdomain: req.body.subdomain,
    };

    const school = await this.schoolRepo.create(mockSchool);
    addSchoolToGlobalStore(school);
    return new SuccessResponse<CreateSchoolResponse>("global.success", { school: school });
  }
}