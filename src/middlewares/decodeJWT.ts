import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { tokenSecret } from "../config";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { AuthFailureError } from "../core/ApplicationErrors";
import { ProtectedRequest } from "../types/app-request";

export const decodeJWT = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AuthFailureError("User not logged in!");
    }
    // 2) validate token
    let decoded: any;
    try {
      decoded = jwt.verify(token, tokenSecret as Secret);
    } catch (error: any) {
      throw new AuthFailureError("Invalid token");
    }

    // 3) add tenantId and user Id to req object
    req.tenantId = decoded.tenantId;
    req.userId = decoded.id as string;
    req.tokenExpires = decoded.iat;

    next();
  },
);

export const decodeJWTFromParams = AsyncHandlerForMiddleware(
  async (
    req: ProtectedRequest<{
      query: { token: string };
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    let token;
    if (req.query.token) {
      token = req.query.token as string;
    }
    if (!token) {
      throw new AuthFailureError("User not logged in!");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(token, tokenSecret as Secret);
    } catch (error: any) {
      throw new AuthFailureError("Invalid token");
    }
    req.tenantId = decoded.tenantId;
    req.userId = decoded.id as string;
    req.tokenExpires = decoded.iat;
    next();
  },
);
