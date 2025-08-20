import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { GetAllOrganizationsRouteConfig, GetAllOrganizationsResponse } from "./get-all-organizations.types";

@Injectable({
  identifier: "GetAllOrganizationsController",
})
export class GetAllOrganizationsController extends BaseController<GetAllOrganizationsRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAllOrganizationsRouteConfig>): Promise<void | APIResponse> {
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 10;
    const search = req.query.search;
    
    // Build query for search if provided
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subdomain: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { directorName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get total count for pagination
    const total = await this.organizationRepo.count(query);
    
    const organizations = await this.organizationRepo.findAllWithPagination(query, page, limit);

    
    const totalPages = Math.ceil(total / limit);
    
    return new SuccessResponse<GetAllOrganizationsResponse>("global.success", { 
      organizations: organizations,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  }
}
