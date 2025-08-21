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