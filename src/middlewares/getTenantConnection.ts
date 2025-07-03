import { NextFunction, Response } from "express";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { AuthFailureError } from "../core/ApplicationErrors";
import { schoolDocStore } from "../core/subdomainStore";
import {
  getNewTenantConnection,
  getTenantCon,
} from "../database/connectionDB/tenantPoolConnection";
import { ProtectedRequest } from "../types/app-request";

export const getTenantConnection = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const schoolSubdomain = schoolDocStore[tenantId]?.subdomain;
    req.school = schoolSubdomain;

    if (!schoolSubdomain) throw new AuthFailureError("Invalid Token");

    const connection = await getTenantCon(schoolSubdomain);
    const newConnection = await getNewTenantConnection(schoolSubdomain);
    req.conn = connection;
    req.newConnection = newConnection;
    next();
  },
);
