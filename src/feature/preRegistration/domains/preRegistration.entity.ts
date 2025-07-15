import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { Level } from "../../levels/domains/level.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { TGenderEnum } from "../../users/domain/baseUser.entity";

export const REGISTRATION_STEP_ENUM = {
  PARENT_INFORMATION: "parentInformation",
  STUDENT_INFORMATION: "studentInformation",
  ENROLLMENT_DETAILS: "enrollmentDetails",
  FILES: "files",
  OTHER_INFORMATION: "otherInformation",
} as const;
export type TRegistrationStepEnum =
  (typeof REGISTRATION_STEP_ENUM)[keyof typeof REGISTRATION_STEP_ENUM];

export const PRE_REGISTRATION_STATUES_ENUM = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
} as const;
export type TPreRegistrationStatuesEnum =
  (typeof PRE_REGISTRATION_STATUES_ENUM)[keyof typeof PRE_REGISTRATION_STATUES_ENUM];

type ParentInformation = {
  parentFullName: string | null;
  parentFirstName: string | null;
  parentLastName: string | null;
  parentEmail: string | null;
  parentPhoneNumber: string | null;
  preferredLanguage: string | null;
  parentAddress: string | null;
  job: string | null;
};

type StudentInformation = {
  studentFullName: string | null;
  studentFirstName: string | null;
  studentLastName: string | null;
  studentEmail: string | null;
  studentBirthDate: Date | null;
  studentAddress: string | null;
  studentGender: TGenderEnum | null;
  studentPhoneNumber: string | null;
  nationality: string | null;
  spokenLanguages: string[] | null;
};

type EnrollmentDetails = {
  level: ID | null;
  classType: ID | null;
  previousSchoolInfo: string | null;
};

type Files = { birthCertificate: IFile[]; previousTranscripts: IFile[] };

type OtherInformation = {
  communicationType: string | null;
  studentEnrollmentReason: string | null;
  otherComment: string | null;
};

export type PreRegistration = ParentInformation &
  StudentInformation &
  EnrollmentDetails &
  Files &
  OtherInformation & {
    status: TPreRegistrationStatuesEnum;
    isRegister: boolean;
  } & BaseEntity;

export type PreRegistrationMetaData = GenerateMetaData<
  PreRegistration,
  {
    classType: ClassType;
    level: Level;
  }
>;
