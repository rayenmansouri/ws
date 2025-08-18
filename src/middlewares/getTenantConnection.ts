import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { AuthFailureError } from "../core/ApplicationErrors";
import { organizationDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { ProtectedRequest } from "../types/app-request";

export const getTenantConnection = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const organizationSubdomain = organizationDocStore[tenantId]?.subdomain;
    req.organization = organizationSubdomain;

    if (!organizationSubdomain) throw new AuthFailureError("Invalid Token");

    const newConnection = await getNewTenantConnection(organizationSubdomain);
    req.conn = newConnection;
    req.newConnection = newConnection;
    next();
  },
);
