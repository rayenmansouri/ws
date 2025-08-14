import { injectable } from "inversify";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { Connection, FilterQuery, Model, PopulateOptions } from "mongoose";
import { inject } from "../container/TypedContainer";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, DATABASE_SERVICE_IDENTIFIER, MASTER_CONNECTION_IDENTIFIER } from "./constant";


type PropsOnly<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
  };
@injectable()
export abstract class BaseRepository<Input,Output>{
    connection: Connection;
    abstract dto: new (...args: any[]) => Output;
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) private connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIER) private masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) private currentConnection: string,
    ){
        this.connection = this.currentConnection === MASTER_USER_TENANT_ID ? this.masterConnection : this.connectionPool[this.currentConnection];
    }

    switchConnection(tenantId: string): void{
        if(tenantId == MASTER_USER_TENANT_ID){
            this.connection = this.masterConnection;
            return;
        }
        const connection = this.connectionPool[tenantId];
        if(connection === undefined){
            throw new Error("Connection not found");
        }
        this.connection = connection;
    }

    async findOne(query: FilterQuery<Input>, populateOptions?: string | PopulateOptions | (string | PopulateOptions)[]): Promise<Output | null> {
        const model = this.getModel();
        let queryBuilder = model.findOne(query);
        
        if (populateOptions) {
            queryBuilder = queryBuilder.populate(populateOptions);
        }
        
        const result = await queryBuilder.lean();
        return result ? new this.dto(result) : null;
    }

    async create(input: Input): Promise<Output> {
        const model = this.getModel();
        const result = await model.create(input);
        return new this.dto(result);
    }

    async findAll(query: FilterQuery<Output> = {}, populateOptions?: string | PopulateOptions | (string | PopulateOptions)[]): Promise<Output[]> {
        const model = this.getModel();
        let queryBuilder = model.find(query);
        
        if (populateOptions) {
            queryBuilder = queryBuilder.populate(populateOptions);
        }
        
        const result = await queryBuilder.lean();
        return result.map(item => new this.dto(item));
    }
    
    abstract getModel(): Model<PropsOnly<Output>>;
}