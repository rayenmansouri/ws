// import { Connection, Model } from "mongoose";
// import { OrganizationSystemType } from "../../organization-magement/enums";
// import { BaseRepository } from "../../../core/database/baseRepository";
// import { BaseUser, BaseUserKey, BaseUserSchema } from "../base-user/domain/base-user.schema";
// import { BaseUserEntity, CreateBaseUser } from "../base-user/domain/base-user.entity";
// import { inject } from "../../../core/container/TypedContainer";
// import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIER } from "../../../core/database/constant";
// import { ConnectionPool } from "../../../core/database/connectionDB/tenantPoolConnection";
// import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";


// export const LIBNAN_STUDENT = `${OrganizationSystemType.LIBAN}-STUDENT`;

// @Injectable({
//     identifier: LIBNAN_STUDENT,
// })
// export class UserRepository extends BaseRepository<CreateBaseUser, BaseUserEntity> {
//     constructor(
//         @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
//         @inject(MASTER_CONNECTION_IDENTIFIER) masterConnection: Connection, 
//         @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
//     ) {
//         super(connectionPool, masterConnection, currentConnection);
//     }

//     getModel(): Model<BaseUser> {
//         return this.connection.model<BaseUser>(BaseUserKey, BaseUserSchema);
//     }

//     dto = BaseUserEntity;
// } ;