import { TypedRequest } from "../express/types";
import { IRquestInterceptor } from "./interface";
import mongoose from "mongoose";
import { ClientSession } from "mongoose";
import { Response } from "express";

export class TransactionInterceptor implements IRquestInterceptor{
    private session:ClientSession | null = null;

    constructor(){}
    async beforeExecution(req:TypedRequest): Promise<void> {
        const session = await mongoose.connection.startSession();
        session.startTransaction();
        req.container.bind("Session").toConstantValue(session);
        this.session = session;
    }

    async afterExecution(req:TypedRequest, res:Response, error:Error | null): Promise<void> {
        if(!this.session){
            return;
        }
        if(error){
            await this.session.abortTransaction();
        }else{
            await this.session.commitTransaction();
        }
        await this.session.endSession();
        return;
    }
}