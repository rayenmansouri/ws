import { CONNECTION_POOL_IDENTIFIER, DATABASE_SERVICE_IDENTIFIER } from "../database/constant";
import { DatabaseService } from "../database/database.service";
import { TypedRequest } from "../express/types";
import { IRquestInterceptor } from "./interface";

export class BindConnectionPoolInterceptor implements IRquestInterceptor{
    constructor(){}
    
    async beforeExecution(req:TypedRequest): Promise<void> {
        const databaseService = req.container.get<DatabaseService>(DATABASE_SERVICE_IDENTIFIER);
        req.container.bind(CONNECTION_POOL_IDENTIFIER).toConstantValue(databaseService.getConnectionPool());
        if(req.DBConnection !== undefined){
            req.container.bind("Connection").toConstantValue(req.DBConnection);
          }
    }

    async afterExecution(req:TypedRequest, res:Response, error:Error | null): Promise<void> {
        return;
    }
}