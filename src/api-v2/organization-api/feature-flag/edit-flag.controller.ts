import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BaseController } from "../../../core/express/controllers/BaseController";
import { EditFeatureFlagRouteType } from "./edit-flag.types";
import { inject } from "../../../core/container/TypedContainer";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { EditFeatureFlagResponse } from "./edit-flag.types";

@Injectable({
    identifier: "EditFeatureFlagController",
})
export class EditFeatureFlagController extends BaseController<EditFeatureFlagRouteType> {
    constructor(
        @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
    ) {
        super();
    }

    async main(req: TypedRequest<EditFeatureFlagRouteType>): Promise<void | APIResponse> {
        const { id } = req.params;
        const { featureFlags } = req.body;
        const organization = await this.organizationRepo.findOne({ _id:id });
        if (!organization) {
            throw new NotFoundError("Organization not found");
        }
        const updatedOrganization = await this.organizationRepo.updateOne({ _id:id }, { featureFlags });
        return new SuccessResponse<EditFeatureFlagResponse>("global.success", { organization: updatedOrganization });
    }
}