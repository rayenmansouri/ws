import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { container } from "../core/container/container";
import { ProtectedRequest } from "../types/app-request";
import { ID } from "../types/BaseEntity";

export const setTenantId = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest<{ params: { tenantId: ID } }>, _: Response, next: NextFunction) => {
    const organizationRepo = container.get("SchoolRepo"); // Using legacy alias
    const organization = await organizationRepo.findOneByIdOrThrow(req.params.tenantId, "notFound.organization");

    req.tenantId = req.params.tenantId;
    (req as any).organizationTimeZone = organization.timeZone;
    // Legacy compatibility
    (req as any).schoolTimeZone = organization.timeZone;
    next();
  },
);
