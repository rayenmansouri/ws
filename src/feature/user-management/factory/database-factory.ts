import { Connection, Model, Schema } from "mongoose";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { OrganizationSystemType } from "../../organization-magement/enums";
import { BaseUser } from "../base-user/domain/base-user.entity";
import { BaseUserSchema } from "../base-user/domain/base-user.schema";
import { MasterSchema } from "../master/domain/master.schema";
import { dncMongoSchema } from "../participant/dnc/dnc-mongo.schema";
import { DiscriminatorKey } from "./discriminator";
import { UserTypeEnum } from "./enums";
import { SeekingGradeParticipant } from "../participant/enums";

export const DatabaseModelFactoryIdentifier = "DatabaseModelFactory";
export type getModelParams = {
    connection:Connection;
    organizationSystemType:OrganizationSystemType;
    userType:UserTypeEnum;
    seekingGrade:SeekingGradeParticipant;
}

@Injectable({
    identifier: DatabaseModelFactoryIdentifier
})
export class DatabaseModelFactory{
    getParticipantSchema(systemType:OrganizationSystemType,seekingGrade:boolean){
        switch(systemType){
            case OrganizationSystemType.DNC:
                return seekingGrade ? dncMongoSchema : dncMongoSchema;
            default:
                throw new Error(`Not participant schema for ${systemType}`)
        }
    }
    getDbSchema(systemType:OrganizationSystemType,userType:UserTypeEnum,seekingGrade:boolean){
        switch(userType){
          case UserTypeEnum.MASTER:
             return MasterSchema;
          case UserTypeEnum.ADMIN:
                return BaseUserSchema;
          case UserTypeEnum.COACH:
            return BaseUserSchema;
          case UserTypeEnum.PARTICIPANT:
            return this.getParticipantSchema(systemType,seekingGrade)
        }
    }

    registerDiscriminator(baseUserModel:Model<BaseUser>,discriminatorKey:DiscriminatorKey,schema:Schema){
        const foundDiscriminator = baseUserModel?.discriminators?.[discriminatorKey] as Model<BaseUser>;
        if(foundDiscriminator !== undefined) {
          return foundDiscriminator;
        }
        return baseUserModel.discriminator<BaseUser>(discriminatorKey, schema);
    }

    getParticipantModel(connection:Connection,systemType:OrganizationSystemType,seekingGrade:SeekingGradeParticipant){
        const BaseUserModel = connection.model<BaseUser>("users", BaseUserSchema);
        switch(systemType){
            case OrganizationSystemType.DNC:
                switch(seekingGrade){
                    case SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT:
                        return this.registerDiscriminator(BaseUserModel,DiscriminatorKey.DNC_SEEKING_GRADE_PARTICIPANT,dncMongoSchema);
                    case SeekingGradeParticipant.NOT_SEEKING_GRADE_PARTICIPANT:
                        return this.registerDiscriminator(BaseUserModel,DiscriminatorKey.DNC_NOT_SEEKING_GRADE_PARTICIPANT,dncMongoSchema);
                }
            default:
                throw new Error(`Not participant model for ${systemType}`)
        }
    }

    getUserModel(params:getModelParams){
        const {connection,organizationSystemType,userType,seekingGrade} = params;
        const BaseUserModel = connection.model<BaseUser>("users", BaseUserSchema);
        switch(userType){
            case UserTypeEnum.MASTER:
                return this.registerDiscriminator(BaseUserModel,DiscriminatorKey.MASTER,MasterSchema);
            case UserTypeEnum.ADMIN:
                return this.registerDiscriminator(BaseUserModel,DiscriminatorKey.ADMIN,BaseUserSchema);
            case UserTypeEnum.COACH:
                return this.registerDiscriminator(BaseUserModel,DiscriminatorKey.COACH,BaseUserSchema);
            case UserTypeEnum.PARTICIPANT:
                return this.getParticipantModel(connection,organizationSystemType,seekingGrade);
        }
    }
}
