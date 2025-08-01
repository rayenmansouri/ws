import { NextFunction, Response } from "express";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { TypedRequest } from "../types";
import { AuthFailureError } from "../../ApplicationErrors";
import { AuthenticationHelper } from "../../auth.helper";
import { MASTER_USER_TENANT_ID } from "../../../feature/user-management/master/domain/master.entity";


export const validatetDecodedToken = (decoded:any) => {
  if(!decoded.tenantId) throw new AuthFailureError("global.invalidToken");
  if(!decoded.id) throw new AuthFailureError("global.invalidToken");
  if(!decoded.iat) throw new AuthFailureError("global.invalidToken");
}

export const decodeJWT = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AuthFailureError("User not logged in!");
    }
    const decoded = AuthenticationHelper.verifyToken(token);
    validatetDecodedToken(decoded);
    req.tenantId = decoded.tenantId as string || MASTER_USER_TENANT_ID;
    req.userId = decoded.id as string;
    req.tokenExpires = decoded.iat as number;
    next();
  },
);

