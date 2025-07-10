import { MiddlewareCoRHandler } from "./MiddlewareHandler";
import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import { container } from "../../container/container";

export class GetTenantConnectionHandler extends MiddlewareCoRHandler {
  public async handle(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dbManager = container.get("IDatabaseManager");
      const connection = await dbManager.getTenantConnection(
        req.countrySubdomain
      );
      req.conn = connection;
      await super.handle(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
