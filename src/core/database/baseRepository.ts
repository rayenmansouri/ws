import { injectable } from "inversify";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { Connection, FilterQuery, Model } from "mongoose";
import { inject } from "../container/TypedContainer";
import { MASTER_USER_TENANT_ID } from "../../feature/user-management/master/domain/master.entity";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "./constant";


type PropsOnly<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
  };
@injectable()
export abstract class BaseRepository<Input,Output>{
    connection: Connection;
    abstract dto: new (...args: any[]) => Output;
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) private connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIR) private masterConnection: Connection,
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

    async findOne(query: FilterQuery<Input>): Promise<Output | null> {
        const model = this.getModel();
        const result = await model.findOne(query).populate('roles').lean()
        return result ? new this.dto(result) : null;
    }

    async create(input: Input): Promise<Output> {
        const model = this.getModel();
        const result = await model.create(input);
        return new this.dto(result);
    }

    async findAll(query: FilterQuery<Output> = {}): Promise<Output[]> {
        const model = this.getModel();
        const result = await model.find(query).lean();
        return result.map(item => new this.dto(item));
    }

    async count(query: FilterQuery<Output> = {}): Promise<number> {
        const model = this.getModel();
        return await model.countDocuments(query);
    }
    
    async findAllWithPagination(query: FilterQuery<Output> = {}, page: number = 1, limit: number = 10): Promise<Output[]> {
        const model = this.getModel();
        const result = await model.find(query)
                                  .skip((page - 1) * limit)
                                  .limit(limit)
                                  .lean();
        return result.map(item => new this.dto(item));
    }

    async updateOne(query: FilterQuery<Input>, input: Partial<Input>): Promise<Output | null> {
        const model = this.getModel();
        const result = await model.findOneAndUpdate(query, { $set: input }, { new: true });
        if(!result) return null;
        return new this.dto(result);
    }
    
    abstract getModel(): Model<PropsOnly<Output>>;
}