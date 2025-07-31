import { NextFunction, Response } from "express";
import { container } from "../../container/container";
import { AuthFailureError } from "../../ApplicationErrors";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { IMiddlewareFunction } from "./interface";
import { decodeJWT } from "./decodeJWT";

export const authMiddleware = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const userId = req.userId;
    const userRepo = container.get("UserRepository");
    const user = await userRepo.findOne({_id:userId});
    if(!user) throw new AuthFailureError("user not found or deleted");
    if(user.needToLoginAgain(req.tokenExpires)) throw new AuthFailureError("You need to login again!");
    //todo check if user is active
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
