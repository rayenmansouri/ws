import { NextFunction, Response } from "express";
import { TActionsEnum, TResourcesEnum } from "../constants/ActionsResource";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { Middleware } from "../core/Routes/createRoutes";
import { AuthorizationService } from "../feature/authorization/domain/Authorization.service";
import { Role } from "../feature/authorization/domain/role.entity";
import { ProtectedRequest } from "../types/app-request";
import { ForbiddenError } from "../core/ApplicationErrors";

export const authorize = (action: TActionsEnum, resource: TResourcesEnum): Middleware =>
  AsyncHandlerForMiddleware(async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    const user = req.user as unknown as { roles: Role[] };

    const isAllowed = AuthorizationService.isActionAllowed(user, action, resource);
    if (!isAllowed) throw new ForbiddenError();

    next();
  });
