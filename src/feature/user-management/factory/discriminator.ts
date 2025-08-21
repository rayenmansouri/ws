import { OrganizationSystemType } from "../../organization-magement/enums";
import { SeekingGradeParticipant } from "../participant/enums";
import { UserTypeEnum } from "./enums";

export enum DiscriminatorKey {
    MASTER = `${UserTypeEnum.MASTER}`,
    ADMIN = `${UserTypeEnum.ADMIN}`,
    COACH = `${UserTypeEnum.COACH}`,
    DNC_SEEKING_GRADE_PARTICIPANT = `${OrganizationSystemType.DNC}_${SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT}_${UserTypeEnum.PARTICIPANT}`,
    DNC_NOT_SEEKING_GRADE_PARTICIPANT = `${OrganizationSystemType.DNC}_${SeekingGradeParticipant.NOT_SEEKING_GRADE_PARTICIPANT}_${UserTypeEnum.PARTICIPANT}`,
    LIBNA_SEEKING_GRADE_PARTICIPANT = `${OrganizationSystemType.LIBAN}_${SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT}_${UserTypeEnum.PARTICIPANT}`,
    LIBNA_NOT_SEEKING_GRADE_PARTICIPANT = `${OrganizationSystemType.LIBAN}_${SeekingGradeParticipant.NOT_SEEKING_GRADE_PARTICIPANT}_${UserTypeEnum.PARTICIPANT}`,
};

export function getDiscriminatorKey(
    userType: UserTypeEnum,
    organizationSystemType?: OrganizationSystemType,
    seekingGrade?: SeekingGradeParticipant
): DiscriminatorKey {
    switch(userType){
        case UserTypeEnum.MASTER:
            return DiscriminatorKey.MASTER;
        case UserTypeEnum.ADMIN:
            return DiscriminatorKey.ADMIN;
        case UserTypeEnum.COACH:
            return DiscriminatorKey.COACH;
        case UserTypeEnum.PARTICIPANT:
            if(organizationSystemType === undefined || seekingGrade === undefined) {
                throw new Error("Organization system type and seeking grade are required for participant users");
            }
            switch(organizationSystemType){
                case OrganizationSystemType.DNC:
                    return seekingGrade === SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT ? DiscriminatorKey.DNC_SEEKING_GRADE_PARTICIPANT : DiscriminatorKey.DNC_NOT_SEEKING_GRADE_PARTICIPANT;
                case OrganizationSystemType.LIBAN:
                    return seekingGrade === SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT ? DiscriminatorKey.LIBNA_SEEKING_GRADE_PARTICIPANT : DiscriminatorKey.LIBNA_NOT_SEEKING_GRADE_PARTICIPANT;
                default:
                    throw new Error(`Invalid organization system type: ${organizationSystemType}`);
            }
    }
}