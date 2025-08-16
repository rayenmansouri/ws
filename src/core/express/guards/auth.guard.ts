import { injectable } from "inversify";
import { BaseGuard, ExecutionContext } from "../middlewares/interface";
import { RouteConfiguration, TypedRequestOptions } from "../types";

/**
 * Example authentication guard using NestJS-like patterns
 */
@injectable()
export class AuthGuard extends BaseGuard {
  constructor(routeConfig: RouteConfiguration<TypedRequestOptions, string>) {
    super(routeConfig);
  }

  async canActivate(context?: ExecutionContext): Promise<boolean> {
    if (!context) return false;

    const request = context.getRequest();
    const routeConfig = context.getRouteConfig();

    // Skip authentication for public routes
    if (routeConfig.isPublic) {
      return true;
    }

    // Check if user is authenticated
    if (!request.userId || !request.currentUser) {
      return false;
    }

    // Check user type matches route requirements
    if (routeConfig.endUser && request.userType !== routeConfig.endUser) {
      return false;
    }

    // Check authorization if required
    if (routeConfig.authorization) {
      return this.checkAuthorization(request, routeConfig.authorization);
    }

    return true;
  }

  private checkAuthorization(
    request: any, 
    authorization: { action: string; resource: string }
  ): boolean {
    // Implement your authorization logic here
    // This is just an example - replace with your actual authorization logic
    const userPermissions = request.currentUser?.permissions || [];
    const requiredPermission = `${authorization.action}:${authorization.resource}`;
    
    return userPermissions.includes(requiredPermission) || userPermissions.includes('*:*');
  }
}