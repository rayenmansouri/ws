import { Connection, FilterQuery } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { BaseUserModel } from "./base-user.schema";
import { BaseUser, BaseUserEntity } from "./base-user.entity";

@injectable()
export class UserRepository{
    constructor(
        @inject("Connection") private connection: Connection,
    ){}

    async findOne(query: FilterQuery<BaseUser>):Promise<BaseUserEntity | null>{
        const user = await BaseUserModel.findOne(query);
        return user ? BaseUserEntity.fromJSON(user) : null;
    }
} ;