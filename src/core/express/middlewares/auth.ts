import { NextFunction, Response } from "express";
import { container } from "../../container/container";
import { AuthFailureError } from "../../ApplicationErrors";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { IMiddlewareFunction } from "./interface";
import { decodeJWT } from "./decodeJWT";
import { UserRepository } from "../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../feature/user-management/constants";

export const authMiddleware = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const userId = req.userId;
    const userRepo = container.get<UserRepository>(BASE_USER_REPOSITORY_IDENTIFIER);
    const user = await userRepo.findOne({_id:userId});
    if(!user) throw new AuthFailureError("user not found or deleted");
    if(user.needToLoginAgain(req.tokenExpires)) throw new AuthFailureError("You need to login again!");
    //TODO: check if user is active
    req.currentUser = user;
    next();
  },
);

export class AuthMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return this.routeConfig.isPublic !== true;
  }

  getMiddleware(): Middleware[] {
    return [decodeJWT,authMiddleware];
  }
}
