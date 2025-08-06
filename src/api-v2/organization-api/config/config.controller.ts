import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { getConfigResponse, getConfigRouteType } from "./config-route.type";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BadRequestError } from "../../../core/ApplicationErrors";


@Injectable({
    identifier: "ConfigController",
})
export class ConfigController extends BaseController<getConfigRouteType> {
    constructor(
        @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
    ) {
        super();
    }

    async main(req: TypedRequest<getConfigRouteType>): Promise<void | APIResponse> {
        const organization = await this.organizationRepo.findOne({ _id: req.params.organizationId });
        if (!organization) {
            throw new BadRequestError("global.error", { message: "Organization not found" });
        }
        return  new SuccessResponse<getConfigResponse>("global.success", { organizationSystemType: organization.organizationSystemType });
    }
}