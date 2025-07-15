import express, { NextFunction, Response, Router } from "express";
import { Connection } from "mongoose";
import supertest from "supertest";
import { createRoutes } from "../../core/Routes/createRoute";
import { Middleware, RouteConfig } from "../../core/Routes/createRoutes";
import { BaseUser } from "../../feature/users/domain/baseUser.entity";
import { errorHandler } from "../../middlewares/errorHandler";
import { ProtectedRequest } from "../../types/app-request";
import { ID } from "../../types/BaseEntity";
import { Role } from "../../feature/authorization/domain/role.entity";

export const prepareRouteForTest = (
  routeConfig: RouteConfig<any>,
  ...middlewares: Middleware[]
) => {
  const app = express();
  const router = Router();

  if (middlewares.length > 0) app.use(...middlewares);

  createRoutes(router, {
    ...routeConfig,
    isPublic: true,
    authorization: undefined,
  });

  app.use(express.json(), router, errorHandler);

  const testApp = supertest(app);

  return testApp;
};

export const injectTenantIdAndConnectionMiddleware =
  (tenantId: string, connection: Connection) =>
  (req: ProtectedRequest<any>, _: Response, next: NextFunction) => {
    req.tenantId = tenantId;
    req.conn = connection;
    req.user = { _id: null };
    next();
  };
export const injectUserIdMiddleware =
  (userId: ID) => (req: ProtectedRequest, _: Response, next: NextFunction) => {
    req.user._id = userId;
    next();
  };

export const injectUserMiddleware =
  (user: Omit<BaseUser, "roles"> & { roles: Role[] }) =>
  (req: ProtectedRequest, _: Response, next: NextFunction) => {
    req.user = user;
    next();
  };
