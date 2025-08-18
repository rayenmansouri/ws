import { inject } from "../../../core/container/TypedContainer";
import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { DATABASE_SERVIßE_IDENTIFIER } from "../../../core/database/constant";
import { DatabaseService } from "../../../core/database/database.service";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { CreateOrganizationResponse, CreateOrganizationRouteConfig } from "../organization.types";

@Injectable({
  identifier: "CreateSchoolController",
})
export class CreateOrganizationController extends BaseController<CreateOrganizationRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
    @inject(DATABASE_SERVIßE_IDENTIFIER) private databaseService: DatabaseService,

  ) {
    super();
  }

  async main(req: TypedRequest<CreateOrganizationRouteConfig>): Promise<void | APIResponse> {
    // check if school already exists
    const existingOrganization = await this.organizationRepo.findOne({ _id: req.body.subdomain });
    if(existingOrganization) throw new BadRequestError("global.organizationAlreadyExists");
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
      organizationSystemType: req.body.organizationSystemType,
    };

    const organization = await this.organizationRepo.create(mockSchool);
    this.databaseService.addOrganization(organization);
    this.databaseService.getNewTenantConnection(organization.subdomain);
    return new SuccessResponse<CreateOrganizationResponse>("global.success", { organization: organization });
  }
}