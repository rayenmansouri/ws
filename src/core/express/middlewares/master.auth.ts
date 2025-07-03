import { NextFunction, Response } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import mongoose from "mongoose";
import { tokenMasterSecret } from "../../../config";
import { ID } from "../../../types/BaseEntity";
import { container } from "../../container/container";
import { AuthFailureError } from "../../ApplicationErrors";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";

export const masterAuthentication = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    let token: string | null = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AuthFailureError("error token");
    }

    let decoded: JwtPayload;
    try {
      decoded = verify(token, tokenMasterSecret as Secret) as JwtPayload;
    } catch (_: unknown) {
      throw new AuthFailureError();
    }

    const masterRepo = container.get("MasterRepo");
    const master = await masterRepo.findOneById(decoded.id as ID);
    if (!master) {
      throw new AuthFailureError("user disconnected");
    }

    if (
      master.passwordChangedAt &&
      Math.floor(master.passwordChangedAt.getTime() / 1000) > req.tokenExpires
    )
      throw new AuthFailureError("You need to login again!");

    const roleRepo = container.get("RoleRepo");
    const roles = await roleRepo.findManyByIds(master.roles);

    req.user = { ...master, roles };
    req.DBConnection = mongoose.connection;
    next();
  },
);
