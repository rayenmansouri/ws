import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../core/express/types";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { UserRepository } from "../../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../../feature/user-management/constants";
import { LogoutRouteConfig } from "./logout.types";
import { Response } from "express";

@Injectable({
  identifier: "LogoutController",
})
export class LogoutController extends BaseController<LogoutRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private baseUserRepo: UserRepository

  ) {
    super(
    );
  }

  async main(_req: TypedRequest<LogoutRouteConfig>, _res: Response): Promise<void | APIResponse> {
    // For JWT-based authentication, logout is typically handled client-side
    // by removing the token from storage. However, we can implement server-side
    // logout by adding the token to a blacklist or updating user status if needed.
    
    // For now, we'll return a success response indicating successful logout    
    // In a production environment, you might want to:
    // 1. Add the token to a blacklist
    // 2. Update user's last logout timestamp
    // 3. Invalidate refresh tokens if using them
    
    // Note: This method is async to maintain consistency with other controller methods
    // even though we don't have any async operations in this simple logout case
    await this.baseUserRepo.updateOne(
        {
            id: _req.currentUser?.id
        },
        {
            passwordChangedAt: new Date()
        }
    )
    return new SuccessResponse<null>("authentication.logoutSuccess", null);
  }
}
