import { Controller } from "../../core/container/decorators/Controller.decorator";
import { inject } from "../../core/container/TypedContainer";
import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { addSchoolToGlobalStore } from "../../core/subdomainStore";
import { getNewTenantConnection } from "../../database/connectionDB/tenantPoolConnection";
import { SchoolRepository } from "../../feature/school-management/domain/school.repo";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";
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
    this.schoolRepo.switchConnection(MASTER_USER_TENANT_ID);
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
    await getNewTenantConnection(school.subdomain);
    return new SuccessResponse<CreateSchoolResponse>("global.success", { school: school });
  }
}