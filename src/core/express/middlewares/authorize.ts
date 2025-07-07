import { NextFunction, Response } from "express";
import { Role } from "../../../feature/authorization/domain/role.entity";
import { ForbiddenError } from "../../ApplicationErrors";
import { Middleware, TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthorizationService } from "../../../feature/authorization/domain/Authorization.service";
import {
  TActionsEnum,
  TResourcesEnum,
} from "../../../constants/ActionsResource";

export const authorizeAdmin = (
  action: TActionsEnum,
  resource: TResourcesEnum
): Middleware =>
  asyncHandlerForMiddleware(
    (req: TypedRequest, _: Response, next: NextFunction) => {
      const user = req.user as unknown as { roles: Role[] };

      const isAllowed = AuthorizationService.isActionAllowed(
        user,
        action,
        resource
      );

      if (!isAllowed) throw new ForbiddenError();

      next();
    }
  );
