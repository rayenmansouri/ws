import { NextFunction, Response } from "express";
import {
  getNewTenantConnection,
  getSchoolFromSubdomain,
} from "../../../database/connectionDB/tenantPoolConnection";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";

export const getTenantConnectionForPublicRoutes = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    //@ts-expect-error - This is needed to not complicate the type
    const schoolSubdomain = req.query.schoolSubdomain as string;

    const school = getSchoolFromSubdomain(schoolSubdomain);

    if (!school) {
      next();
      return;
    }

    const connection = await getNewTenantConnection(schoolSubdomain);
    req.DBConnection = connection;

    next();
  },
);
