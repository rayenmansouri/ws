import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { container } from "../core/container/container";
import { ProtectedRequest } from "../types/app-request";
import { ID } from "../types/BaseEntity";
import { OrganizationRepository } from "../feature/organization-magement/domain/organization.repo";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../feature/organization-magement/constant";
import { NotFoundError } from "../core/ApplicationErrors";

export const setTenantId = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest<{ params: { tenantId: ID } }>, _: Response, next: NextFunction) => {
    const organizationRepo = container.get<OrganizationRepository>(ORGANIZATION_REPOSITORY_IDENTIFIER);
    const organization = await organizationRepo.findOne({ _id: req.params.tenantId });
    if (!organization) throw new NotFoundError("notFound.organization");

    req.tenantId = req.params.tenantId;
    req.organizationTimeZone = organization.timeZone || "Africa/Tunis";
    next();
  },
);
