import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import { DecodeJWTHandler } from "./DecodeJWTHandler";
import { GetTenantConnectionHandler } from "./GetTenantConnectionHandler";
import { VerifyJWTHandler } from "./VerifyJWTHandler";

const decodeJWT = new DecodeJWTHandler();
const getTenantConnection = new GetTenantConnectionHandler();
const verifyJWT = new VerifyJWTHandler();

decodeJWT.setNext(getTenantConnection).setNext(verifyJWT);

export const multiTenantAuthMiddleware = (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => decodeJWT.handle(req, res, next);
