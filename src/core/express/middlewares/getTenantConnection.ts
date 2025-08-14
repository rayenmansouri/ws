import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { IMiddlewareFunction } from "./interface";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { container } from "../../container/container";
import { DatabaseService } from "../../database/database.service";
import { DATABASE_SERVIßE_IDENTIFIER } from "../../database/constant";
import { Organization } from "../../../feature/organization-magement/domain/organization.entity";
import { Connection } from "mongoose";
import { MASTER_USER_TENANT_ID } from "../../../feature/user-management/master/domain/master.entity";


function getOrganizationOrThrow(tenantId: string): {organization: Organization, connection: Connection} {
  const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
  const organization = databaseService.getOrganization(tenantId);
  if(!organization) throw new AuthFailureError();
  const connection = databaseService.getNewTenantConnection(organization.subdomain);
  return { organization, connection };
}

export const getTenantConnection = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    if(tenantId === MASTER_USER_TENANT_ID) {
      throw new AuthFailureError("user.doesNotBelongToTenant");
    }
    const { organization, connection } = getOrganizationOrThrow(tenantId);
    req.school = organization?.subdomain;
    req.DBConnection = connection;
    req.currentConnection = organization.subdomain;
    //check if the user belongs to the tenant
    if(req.currentUser.schoolSubdomain !== organization.subdomain) throw new AuthFailureError("user.doesNotBelongToTenant");
    next();
  },
);

export class GetTenantConnectionMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return this.routeConfig.isPublic !== true && this.routeConfig.endUser !== undefined && this.routeConfig.endUser !== END_USER_ENUM.MASTER;
  }
  getMiddleware(): Middleware[] {
    return [getTenantConnection];
  }
}
