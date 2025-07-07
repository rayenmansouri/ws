import { NextFunction, Response } from "express";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { schoolDocStore } from "../../subdomainStore";
import { container } from "../../core/container/container";
import { DatabaseManager } from "../../core/database/DatabaseManager";

export const getTenantConnection = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const schoolSubdomain = schoolDocStore[tenantId]?.subdomain;
    req.school = schoolSubdomain;

    if (!schoolSubdomain) throw new AuthFailureError();

    const dbManager = container.get(DatabaseManager);
    const connection = await dbManager.getTenantConnection(schoolSubdomain);
    req.DBConnection = connection;
    next();
  }
);

