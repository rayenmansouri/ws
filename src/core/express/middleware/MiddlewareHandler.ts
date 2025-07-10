import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../../../types/app-request";

// chain of responsibility pattern
// https://refactoring.guru/design-patterns/chain-of-responsibility

export abstract class MiddlewareCoRHandler {
  private nextHandler?: MiddlewareCoRHandler;

  public setNext(handler: MiddlewareCoRHandler): MiddlewareCoRHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(req, res, next);
    } else {
      next();
    }
  }
}
