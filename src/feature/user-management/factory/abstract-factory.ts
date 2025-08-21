import { OrganizationSystemType } from "../../organization-magement/enums";
import { CreateBaseUser } from "../base-user/domain/base-user.entity";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { BASE_USER_REPOSITORY_IDENTIFIER, DNC_NOT_GRADE_SEEKING_PARTICIPANT_REPOSITORY_IDENTIFIER, DNC_PARTICIPANT_REPOSITORY_IDENTIFIER } from "../constants";
import { UserRepository } from "../base-user/domain/base-user.repository";
import { DncParticipantRepository } from "../participant/dnc/dnc.repository";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { UserTypeEnum } from "./enums";
import { DncNotSeekingGradeParticipantRepository } from "../participant/dnc-not-grade-seeking/dnc.repository";
import { DiscriminatorKey } from "./discriminator";

export type validateDataParams = {
    organizationSystemType:OrganizationSystemType;
    userType:UserTypeEnum;
    data:CreateBaseUser;
}

export const UserFactoryIdentifier = "UserFactory";

@Injectable({
    identifier: UserFactoryIdentifier
})
export class UserFactory{
   constructor(
     @inject(BASE_USER_REPOSITORY_IDENTIFIER) private baseUserRepository:UserRepository,
     @inject(DNC_NOT_GRADE_SEEKING_PARTICIPANT_REPOSITORY_IDENTIFIER) private dncNotGradeSeekingParticipantRepository:DncNotSeekingGradeParticipantRepository,
     @inject(DNC_PARTICIPANT_REPOSITORY_IDENTIFIER) private dncRepository:DncParticipantRepository,
   ){}

   getParticipantRepository(key:DiscriminatorKey):UserRepository{
    switch(key){
        case DiscriminatorKey.DNC_SEEKING_GRADE_PARTICIPANT:
            return this.dncRepository;
        case DiscriminatorKey.DNC_NOT_SEEKING_GRADE_PARTICIPANT:
            return this.dncNotGradeSeekingParticipantRepository;
        default:
            throw new BadRequestError(`No participant repository available for key: ${key}`)
    }
   }

   getRepository(key?:DiscriminatorKey):UserRepository{
    if(key === undefined) return this.baseUserRepository;
    switch(key){
        case DiscriminatorKey.MASTER:
        case DiscriminatorKey.ADMIN:
        case DiscriminatorKey.COACH:
            return this.baseUserRepository;
        case DiscriminatorKey.DNC_SEEKING_GRADE_PARTICIPANT:
            return this.getParticipantRepository(key);
        default:
            throw new BadRequestError(`No repository available for key: ${key}`)
    }
   }
}