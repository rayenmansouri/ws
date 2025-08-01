import { inject } from "../../core/container/TypedContainer";
import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { addSchoolToGlobalStore } from "../../core/subdomainStore";
import { getNewTenantConnection } from "../../database/connectionDB/tenantPoolConnection";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { CreateOrganizationRouteConfig, CreateOrganizationResponse } from "./organization.types";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";

@Injectable({
  identifier: "CreateSchoolController",
})
export class CreateOrganizationController extends BaseController<CreateOrganizationRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
    
  ) {
    super();
  }

  async main(req: TypedRequest<CreateOrganizationRouteConfig>): Promise<void | APIResponse> {
    // TODO: Implement create school use case
    const mockSchool = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      subdomain: req.body.subdomain,
      phoneNumber: req.body.phoneNumber,
      directorName: req.body.directorName,
      configName: req.body.configName,
      maxStudentSeats: req.body.maxStudentSeats,
      gradeBookTheme: req.body.gradeBookTheme,
      enableEmail: req.body.enableEmail,
    };

    const organization = await this.organizationRepo.create(mockSchool);
    addSchoolToGlobalStore(organization);

    await getNewTenantConnection(organization.subdomain);
    return new SuccessResponse<CreateOrganizationResponse>("global.success", { organization: organization });
  }
}