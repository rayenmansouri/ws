import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { tokenMasterSecret } from "../../config";
import { AsyncHandlerForMiddleware } from "../../core/AsyncHandler";
import { AuthFailureError } from "../../core/ApplicationErrors";
import { ProtectedRequest } from "../../types/app-request";
import { container } from "../../core/container/container";
import { ID } from "../../types/BaseEntity";

export const masterAuthentication = AsyncHandlerForMiddleware(
  async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    let token: string | null = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AuthFailureError("error token");
    }

    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, tokenMasterSecret as Secret) as jwt.JwtPayload;
    } catch (_: unknown) {
      throw new AuthFailureError();
    }

    const masterRepo = container.get("MasterRepo");
    const currentUser = await masterRepo.findOneById(decoded.id as ID);
    if (!currentUser) throw new AuthFailureError("user disconnected");

    if (
      currentUser.passwordChangedAt &&
      Math.floor(currentUser.passwordChangedAt.getTime() / 1000) > req.tokenExpires
    )
      throw new AuthFailureError("You need to login again!");

    const roleRepo = container.get("RoleRepo");
    const roles = await roleRepo.findManyByIds(currentUser.roles);

    req.user = { ...currentUser, roles };
    next();
  },
);
