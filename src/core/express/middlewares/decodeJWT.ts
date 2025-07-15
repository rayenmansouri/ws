import { NextFunction, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { TypedRequest } from "../types";
import { AuthFailureError } from "../../ApplicationErrors";
import { tokenSecret } from "../../../config";

export const decodeJWT = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AuthFailureError("User not logged in!");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, tokenSecret as Secret) as JwtPayload;
    } catch (_) {
      throw new AuthFailureError("Invalid token");
    }

    req.tenantId = decoded.tenantId;
    req.userId = decoded.id as string;
    req.tokenExpires = decoded.iat as number;

    next();
  },
);
