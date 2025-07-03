import { z } from "zod";
import {
  emailValidation,
  subDomainValidation,
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";

export const parentInformationValidation = z.object({
  parentFirstName: z.string().optional(),
  parentLastName: z.string().optional(),
  parentEmail: emailValidation().optional(),
  parentPhoneNumber: validatePhoneNumber().optional(),
  preferredLanguage: z.string().optional(),
  parentAddress: z.string().optional(),
  job: z.string().optional(),
});

export const studentInformationValidation = z.object({
  studentFirstName: z.string().optional(),
  studentLastName: z.string().optional(),
  studentEmail: emailValidation().optional(),
  studentPhoneNumber: validatePhoneNumber().optional(),
  nationality: z.string().optional(),
  studentGender: z.nativeEnum(GENDER_ENUM).optional(),
  studentAddress: z.string().optional(),
  studentBirthDate: validateDate().optional(),
  spokenLanguages: z.array(z.string()).optional(),
});

export const enrollmentDetailsValidation = z.object({
  levelNewId: validateNewId().optional(),
  classTypeNewId: validateNewId().optional(),
  previousSchoolInfo: z.string().optional(),
});

export const otherInformation = z.object({
  communicationType: z.string().optional(),
  studentEnrollmentReason: z.string().optional(),
  otherComment: z.string().optional(),
});

export const filesValidation = z.object({
  deletedBirthCertificate: z
    .array(z.string())
    .optional()
    .default([])
    .transform(value => Array.from(new Set(value))),
  deletedPreviousTranscripts: z
    .array(z.string())
    .optional()
    .default([])
    .transform(value => Array.from(new Set(value))),
});

export type TFileValidation = z.infer<typeof filesValidation>;

const body = parentInformationValidation
  .and(studentInformationValidation)
  .and(enrollmentDetailsValidation)
  .and(filesValidation)
  .and(otherInformation)
  .and(z.object({ subdomain: subDomainValidation(), id: validateID().optional() }));

type TBody = z.infer<typeof body>;

export type TEnrollmentDetailsValidation = z.infer<typeof enrollmentDetailsValidation>;

export type UpdatePreRegistrationValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const updatePreRegistrationValidation = {
  body,
};
