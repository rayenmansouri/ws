import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { ID } from "../../../shared/value-objects/ID.vo";
import { SubdomainVo } from "../../../shared/value-objects/Subdomain.vo";
import { ProtectedRequest } from "../../../types/app-request";
import { AuthFailureError } from "../../ApplicationErrors";
import { MiddlewareCoRHandler } from "./MiddlewareHandler";
import { JwtPayload } from "../../../types/app-request";
import { ConfigService } from "../../../shared/config/ConfigService";

export class DecodeJWTHandler extends MiddlewareCoRHandler {
  public async handle(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        throw new AuthFailureError("No token provided");
      }

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token,
          ConfigService.get("tokenSecret") as Secret
        ) as JwtPayload;
      } catch (_: unknown) {
        throw new AuthFailureError("Invalid token");
      }

      req.tenantId = ID.create(decoded.tenantId);
      req.countrySubdomain = SubdomainVo.create(decoded.countrySubdomain);
      req.tokenExpires = decoded.iat;

      await super.handle(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
