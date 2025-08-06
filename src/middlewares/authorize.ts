import { NextFunction, Response } from "express";
import { TActionsEnum, TResourcesEnum } from "../constants/ActionsResource";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { Middleware } from "../core/Routes/createRoutes";
import { Role } from "../feature/roles/role.entity";
import { ProtectedRequest } from "../types/app-request";
import { ForbiddenError } from "../core/ApplicationErrors";
import { AuthorizationService } from "../core/express/middlewares/authorize";

export const authorize = (action: TActionsEnum, resource: TResourcesEnum): Middleware =>
  AsyncHandlerForMiddleware(async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    const user = req.user as unknown as { roles: Role[] };

    const isAllowed = AuthorizationService.isActionAllowed(user, action, resource);
    if (!isAllowed) throw new ForbiddenError();

    next();
  });
