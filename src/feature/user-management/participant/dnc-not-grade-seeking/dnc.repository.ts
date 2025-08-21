import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { UserRepository } from "../../base-user/domain/base-user.repository";
import { DNC_NOT_GRADE_SEEKING_PARTICIPANT_REPOSITORY_IDENTIFIER } from "../../constants";
import { inject } from "../../../../core/container/TypedContainer";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "../../../../core/database/constant";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";
import { Connection, Model } from "mongoose";
import { Organization } from "../../../organization-magement/domain/organization.entity";
import { BaseUser } from "../../base-user/domain/base-user.entity";
import { BaseUserKey, BaseUserSchema } from "../../base-user/domain/base-user.schema";
import { SeekingGradeParticipant } from "../enums";
import { DncParticipantEntity } from "../dnc/dnc.entity";
import { getDiscriminatorKey } from "../../factory/discriminator";
import { UserTypeEnum } from "../../factory/enums";

@Injectable({
    identifier: DNC_NOT_GRADE_SEEKING_PARTICIPANT_REPOSITORY_IDENTIFIER,
})
export class DncNotSeekingGradeParticipantRepository extends UserRepository{
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIR) masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
        @inject("Organization") organization: Organization,
    ) {
        super(connectionPool, masterConnection, currentConnection, organization);
        this.organization = organization;
    }

    getModel(): Model<BaseUser> {
        if(this.organization == undefined) {
            return this.connection.model<BaseUser>(BaseUserKey, BaseUserSchema);
        }
        return this.connection.model<BaseUser>(
            getDiscriminatorKey(
                UserTypeEnum.PARTICIPANT,
                this.organization.organizationSystemType,
                SeekingGradeParticipant.NOT_SEEKING_GRADE_PARTICIPANT
            ),
            BaseUserSchema
        );
    }

    dto = DncParticipantEntity;
}