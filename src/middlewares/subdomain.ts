import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { NotFoundError } from "../core/ApplicationErrors";
import { schoolDocStore } from "../core/subdomainStore";
import { ProtectedRequest } from "../types/app-request";

export const getTenantBySubdomain = AsyncHandlerForMiddleware(
  (req: ProtectedRequest<{ body: { subdomain: string } }>, _: Response, next: NextFunction) => {
    const subdomain: string = req.body.subdomain;
    const tenantId = Object.values(schoolDocStore).find(
      school => school.subdomain === subdomain,
    )?._id;
    if (tenantId) {
      req.tenantId = tenantId;
      next();
    } else {
      new NotFoundError("School not found");
    }
  },
);
