import { NextFunction, Response } from "express";
import { BaseUser } from "../../../shared/domain/baseUser.entity";
import { ProtectedRequest } from "../../../types/app-request";
import { AuthFailureError } from "../../ApplicationErrors";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { MongoAdminRepo } from "./../../../database/mongo/repositories/MongoAdmin.repo";
import { MiddlewareCoRHandler } from "./MiddlewareHandler";

export class VerifyJWTHandler extends MiddlewareCoRHandler {
  public async handle(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.tokenExpires || req.tokenExpires < Date.now() / 1000) {
        throw new AuthFailureError("Token expired or invalid");
      }

      const user = await this.verifyUser(req);
      this.validateUserStatus(user, req);

      req.user = user;

      await super.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  private async verifyUser(
    req: ProtectedRequest
  ): Promise<Omit<BaseUser, "roles">> {
    const connection = req.conn;
    let user: Omit<BaseUser, "roles">;

    switch (req.userType) {
      case END_USER_ENUM.ADMIN: {
        const adminRepo = new MongoAdminRepo(connection, null);
        // const roleRepo = container.get("RoleRepo");

        const admin = await adminRepo.findOneById(req.user.id);
        if (!admin) throw new AuthFailureError();

        // const roles = await roleRepo.findManyByIds(admin.roles);

        // user = { ...admin, roles };
        user = admin;
        break;
      }
      default:
        throw new AuthFailureError("Unsupported user type");
    }

    return user;
  }

  private validateUserStatus(
    user: Omit<BaseUser, "roles">,
    req: ProtectedRequest
  ): void {
    if (!user.isActive) {
      throw new AuthFailureError("authentication.invalidCredentials", {
        isActive: false,
      });
    }

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) >
        (req.tokenExpires || 0)
    ) {
      throw new AuthFailureError("Invalid token");
    }
  }
}
