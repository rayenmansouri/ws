import { OrganizationSystemType } from "../../organization-magement/enums";
import { CreateBaseUser } from "../base-user/domain/base-user.entity";
import { SeekingGradeParticipant } from "../participant/enums";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { dncSchema } from "../participant/validations/dnc.schema";
import { createUserValidationSchema } from "../base-user/domain/validation.schema";
import { BASE_USER_REPOSITORY_IDENTIFIER, DNC_NOT_GRADE_SEEKING_PARTICIPANT_REPOSITORY_IDENTIFIER, DNC_PARTICIPANT_REPOSITORY_IDENTIFIER } from "../constants";
import { UserRepository } from "../base-user/domain/base-user.repository";
import { DncParticipantRepository } from "../participant/dnc/dnc.repository";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { z } from "zod";
import { UserTypeEnum } from "./enums";
import { DncNotSeekingGradeParticipantRepository } from "../participant/dnc-not-grade-seeking/dnc.repository";


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

   getParticipantValidationSchema(organizationSystemType:OrganizationSystemType,seekingGrade:SeekingGradeParticipant){
    switch(organizationSystemType){
        case OrganizationSystemType.DNC:
            return seekingGrade === SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT  ? dncSchema : dncSchema;
        default:
            return createUserValidationSchema
    }
   }

   validateParticipantInput(organizationSystemType:OrganizationSystemType,participantData:Record<string,unknown>){
    try {
      const { seekingGrade = SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT,...rest } = participantData;
      const validationSchema = this.getParticipantValidationSchema(organizationSystemType,seekingGrade as SeekingGradeParticipant);
      validationSchema.parse(rest);
    } catch (error) {
      if(error instanceof z.ZodError) throw new BadRequestError("user.invalidData",error.issues);
      throw error;
    }
   }
   
   validateUserInput(params:validateDataParams){
      const {userType,organizationSystemType,data} = params;
      if(userType === UserTypeEnum.PARTICIPANT){
        this.validateParticipantInput(organizationSystemType,data["participantData"] as Record<string,unknown>);
      }
      const validationSchema = createUserValidationSchema;
      try {
        validationSchema.parse(data);
      } catch (error) {
        if(error instanceof z.ZodError) throw new BadRequestError("user.invalidData",error.issues);
        throw error;
      }
   }

   getParticipantRepository(organizationSystemType:OrganizationSystemType,seekingGrade:SeekingGradeParticipant):UserRepository{
    switch(organizationSystemType){
        case OrganizationSystemType.DNC:
            return seekingGrade === SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT  ? this.dncRepository : this.dncNotGradeSeekingParticipantRepository;
        default:
            throw new BadRequestError(`No participant repository available for organization system type: ${organizationSystemType}`)
    }
   }

   getRepository(userType:UserTypeEnum,organizationSystemType?:OrganizationSystemType,seekingGrade?:SeekingGradeParticipant):UserRepository{
    switch(userType){
        case UserTypeEnum.MASTER:
        case UserTypeEnum.ADMIN:
        case UserTypeEnum.COACH:
            return this.baseUserRepository;
        case UserTypeEnum.PARTICIPANT:
            if(organizationSystemType === undefined || seekingGrade === undefined) {
                throw new BadRequestError("Organization system type and seeking grade are required for participant users");
            }
            return this.getParticipantRepository(organizationSystemType,seekingGrade);
        default:
            throw new BadRequestError(`No repository available for user type: ${userType}`)
    }
   }
}