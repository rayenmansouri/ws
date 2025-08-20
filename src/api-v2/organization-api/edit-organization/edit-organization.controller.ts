import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { EditOrganizationRouteConfig, EditOrganizationResponse } from "./edit-organization.types";
import { NotFoundError, InternalError } from "../../../core/ApplicationErrors";
import { Response } from "express";

@Injectable({
  identifier: "EditOrganizationController",
})
export class EditOrganizationController extends BaseController<EditOrganizationRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<EditOrganizationRouteConfig>, _res: Response): Promise<void | APIResponse> {
    const { id } = req.params;
    const updateData = req.body;

    // Check if organization exists
    const existingOrganization = await this.organizationRepo.findOne({ _id: id });
    if (!existingOrganization) {
      throw new NotFoundError("global.notFound");
    }

    // Update the organization
    const updatedOrganization = await this.organizationRepo.updateOne(
      { _id: id },
      updateData
    );

    if (!updatedOrganization) {
      throw new InternalError("global.error");
    }

    return new SuccessResponse<EditOrganizationResponse>("global.success", { 
      organization: updatedOrganization
    });
  }
}
