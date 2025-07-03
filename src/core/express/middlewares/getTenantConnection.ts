import { NextFunction, Response } from "express";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { schoolDocStore } from "../../subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";

export const getTenantConnection = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const schoolSubdomain = schoolDocStore[tenantId]?.subdomain;
    req.school = schoolSubdomain;

    if (!schoolSubdomain) throw new AuthFailureError();

    const connection = await getNewTenantConnection(schoolSubdomain);
    req.DBConnection = connection;
    next();
  },
);
