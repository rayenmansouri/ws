import { injectable } from "inversify";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { Connection, FilterQuery, Model } from "mongoose";
import { inject } from "../container/TypedContainer";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";


type PropsOnly<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
  };
@injectable()
export abstract class BaseRepository<Input,Output>{
    connection: Connection;
    abstract dto: new (...args: any[]) => Output;
    constructor(
        @inject("ConnectionPool") private connectionPool: ConnectionPool,
        @inject("MasterConnection") private masterConnection: Connection,
    ){
        this.connection = this.masterConnection;
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

    async findOne(query: FilterQuery<Input>): Promise<Output | null> {
        const model = this.getModel();
        const result = await model.findOne(query).lean()
        return result ? new this.dto(result) : null;
    }

    async create(input: Input): Promise<Output> {
        const model = this.getModel();
        const result = await model.create(input);
        return new this.dto(result);
    }

    async findAll(): Promise<Output[]> {
        const model = this.getModel();
        const result = await model.find().lean();
        return result.map(item => new this.dto(item));
    }
    
    abstract getModel(): Model<PropsOnly<Output>>;
}