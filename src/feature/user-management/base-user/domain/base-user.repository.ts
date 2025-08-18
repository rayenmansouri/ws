import { Connection, Model } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseUserKey, BaseUserSchema } from "./base-user.schema";
import { BaseUser, BaseUserEntity, CreateBaseUser } from "./base-user.entity";
import { BaseRepository } from "../../../../core/database/baseRepository";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../constants";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "../../../../core/database/constant";
import { FileDetails } from "../../../../core/fileManager/FileManager";
import { Organization } from "../../../organization-magement/domain/organization.entity";

@Injectable({
    identifier: BASE_USER_REPOSITORY_IDENTIFIER,
})
export class UserRepository extends BaseRepository<CreateBaseUser, BaseUserEntity> {
    public organization: Organization;
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIR) masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
        @inject("Organization") organization: Organization,
    ) {
        super(connectionPool, masterConnection, currentConnection);
        this.organization = organization;
    }

    getModel(): Model<BaseUser> {
        return this.connection.model<BaseUser>(BaseUserKey, BaseUserSchema);
    }

    dto = BaseUserEntity;

    
    async updateAvatar(userId: string, avatar: FileDetails): Promise<void> {
        await this.connection.model<BaseUser>(BaseUserKey, BaseUserSchema).updateOne(
            { _id: userId },
            { 
                $set: { 
                    avatar: {
                        link: avatar.link,
                        name: avatar.name,
                        path: avatar.path,
                        uploadedAt: avatar.uploadedAt,
                        size: avatar.size,
                        mimeType: avatar.mimeType
                    }
                } 
            }
        );
    }
} ;