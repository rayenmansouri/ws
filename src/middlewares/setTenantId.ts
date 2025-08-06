import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { container } from "../core/container/container";
import { ProtectedRequest } from "../types/app-request";
import { ID } from "../types/BaseEntity";

export const setTenantId = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest<{ params: { tenantId: ID } }>, _: Response, next: NextFunction) => {
    const schoolRepo = container.get("SchoolRepo");
    const school = await schoolRepo.findOneByIdOrThrow(req.params.tenantId, "notFound.school");

    req.tenantId = req.params.tenantId;
    req.organizationTimeZone = school.timeZone;
    next();
  },
);
