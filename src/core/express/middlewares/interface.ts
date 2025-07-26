import { Middleware } from "../types";

export interface IMiddlewareFunction {
  canActivate(): boolean;
  getMiddleware(): Middleware[]
}