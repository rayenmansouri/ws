import { Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolSchema } from "./school.schema";
import { School, SchoolEntity } from "./school.entity";
import { injectable } from "inversify";
import { BaseRepository } from "../../../core/baseRepository";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";

@injectable()
export class SchoolRepository extends BaseRepository{
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection,
    ){
        super(connectionPool, masterConnection);
    }

    async findOne(query: FilterQuery<School>): Promise<School | null> {
        const SchoolModel = this.connection.model<School>("School", SchoolSchema);
        return await SchoolModel.findOne(query);
    }

    async create(input: any): Promise<School> {
        const SchoolModel = this.connection.model<School>("School", SchoolSchema);
        const createdSchool = await SchoolModel.create(input);
        return SchoolEntity.fromJSON(createdSchool);
    }

    async findAll(): Promise<School[]> {
        const SchoolModel = this.connection.model<School>("School", SchoolSchema);
        const schools = await SchoolModel.find();
        return schools.map(school => SchoolEntity.fromJSON(school));
    }

}