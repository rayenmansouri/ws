import { injectable } from "inversify";
import { ConnectionPool } from "../database/connectionDB/tenantPoolConnection";
import { Connection } from "mongoose";
import { inject } from "./container/TypedContainer";
import { MASTER_USER_TENANT_ID } from "../feature/user-management/master/domain/master.entity";

@injectable()
export class BaseRepository{
    connection: Connection;
    constructor(
        @inject("ConnectionPool") private connectionPool: ConnectionPool,
        @inject("MasterConnection") private masterConnection: Connection,
    ){
        this.connection = this.masterConnection;
    }

    switchConnection(tenantId: string){
        if(tenantId == MASTER_USER_TENANT_ID){
            this.connection = this.masterConnection;
            return;
        }
        const connection = this.connectionPool[tenantId];
        if(!connection){
            throw new Error("Connection not found");
        }
        this.connection = connection;
    }
}