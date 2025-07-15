import { IFile } from "../../sessionManagement/domain/session.entity";

export type PublicPreRegistrationDTO = {
  _id: string;
  newId: string;

  // Parent Information
  parentFullName: string | null;
  parentFirstName: string | null;
  parentLastName: string | null;
  parentEmail: string | null;
  parentPhoneNumber: string | null;
  preferredLanguage: string | null;
  parentAddress: string | null;
  job: string | null;

  // Student Information
  studentFullName: string | null;
  studentFirstName: string | null;
  studentLastName: string | null;
  studentEmail: string | null;
  studentBirthDate: Date | null;
  studentAddress: string | null;
  studentGender: string | null;
  studentPhoneNumber: string | null;
  nationality: string | null;
  spokenLanguages: string[] | null;

  // Enrollment Details
  level: {
    _id: string;
    name: string;
    newId: string;
  } | null;
  classType: {
    _id: string;
    name: string;
    newId: string;
  } | null;
  previousSchoolInfo: string | null;

  // File
  birthCertificate: IFile[];
  previousTranscripts: IFile[];

  // Other Information
  communicationType: string | null;
  studentEnrollmentReason: string | null;
  otherComment: string | null;
};
