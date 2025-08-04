import { Response } from "express";
import { TypedRequest } from "../express/types";

export interface IRquestInterceptor{
    beforeExecution(req:TypedRequest): Promise<void>;
    afterExecution(req:TypedRequest, res:Response, error:Error | null): Promise<void>;
}
