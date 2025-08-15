import { Connection, Model } from "mongoose";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";

import { VERIFICATION_CODE_REPOSITORY_IDENTIFIER } from "./constant";
import { VerificationCode, VerificationCodeDto, VerificationCodeInput } from "./verificationCode.entity";
import { VerificationCodeKey, VerificationCodeSchema } from "./verificationCode.schema";
import { BaseRepository } from "../../../core/database/baseRepository";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "../../../core/database/constant";
import { inject } from "../../../core/container/TypedContainer";

@Injectable({
    identifier: VERIFICATION_CODE_REPOSITORY_IDENTIFIER,
})
export class VerificationCodeRepository extends BaseRepository<VerificationCodeInput, VerificationCode> {
    dto = VerificationCodeDto;
    
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIR) masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
    ) {
        super(connectionPool, masterConnection, currentConnection);
    }

    getModel(): Model<VerificationCode> {
        return this.connection.model<VerificationCode>(VerificationCodeKey, VerificationCodeSchema);
    }

    async findByUser(userId: string, userType: string): Promise<VerificationCode | null> {
        return this.findOne({ user: userId, userType, isUsed: false });
    }

    async findByCode(verificationCode: string): Promise<VerificationCode | null> {
        return this.findOne({ verificationCode, isUsed: false });
    }

    async markAsUsed(id: string): Promise<void> {
        const model = this.getModel();
        await model.findByIdAndUpdate(id, { isUsed: true });
    }

    async deleteExpiredCodes(): Promise<void> {
        const model = this.getModel();
        await model.deleteMany({ 
            verificationCodeExpiresAt: { $lt: new Date() } 
        });
    }

    async upsertOne(verificationCode: VerificationCodeInput): Promise<VerificationCode> {
        const model = this.getModel();
        return model
        .findOneAndUpdate({ user: verificationCode.user, userType: verificationCode.userType }, verificationCode, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        })
        .lean();
    }
}
