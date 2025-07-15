import { BadRequestError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { AddParentRequest } from "../../parents/useCases/AddParent.usecase";
import { AddStudentRequest } from "../../students/useCases/AddStudent.usecase";
import { GENDER_ENUM } from "../../users/domain/baseUser.entity";
import { PreRegistration, PreRegistrationMetaData } from "../domains/preRegistration.entity";
import { PreRegistrationDTO } from "../dtos/PreRegistration.dto";
import { PublicPreRegistrationDTO } from "../dtos/PublicPreRegistration.dto";

export class PreRegistrationMapper {
  public static toPublicPreRegistrationDTO(
    preRegistration: Populate<PreRegistrationMetaData, "level" | "classType">,
  ): PublicPreRegistrationDTO {
    return {
      _id: preRegistration._id,
      newId: preRegistration.newId,

      // Parent Information
      parentFullName: preRegistration.parentFullName,
      parentFirstName: preRegistration.parentFirstName,
      parentLastName: preRegistration.parentLastName,
      parentEmail: preRegistration.parentEmail,
      parentPhoneNumber: preRegistration.parentPhoneNumber,
      preferredLanguage: preRegistration.preferredLanguage,
      parentAddress: preRegistration.parentAddress,
      job: preRegistration.job,

      // Student Information
      studentFullName: preRegistration.studentFullName,
      studentFirstName: preRegistration.studentFirstName,
      studentLastName: preRegistration.studentLastName,
      studentEmail: preRegistration.studentEmail,
      studentBirthDate: preRegistration.studentBirthDate,
      studentAddress: preRegistration.studentAddress,
      studentGender: preRegistration.studentGender,
      studentPhoneNumber: preRegistration.studentPhoneNumber,
      nationality: preRegistration.nationality,
      spokenLanguages: preRegistration.spokenLanguages,

      // Enrollment Details
      level: preRegistration.level
        ? {
            _id: preRegistration.level._id,
            name: preRegistration.level.name,
            newId: preRegistration.level.newId,
          }
        : null,
      classType: preRegistration.classType
        ? {
            _id: preRegistration.classType._id,
            name: preRegistration.classType.name,
            newId: preRegistration.classType.newId,
          }
        : null,
      previousSchoolInfo: preRegistration.previousSchoolInfo,

      // File
      birthCertificate: preRegistration.birthCertificate,
      previousTranscripts: preRegistration.previousTranscripts,

      // Other Information
      communicationType: preRegistration.communicationType,
      studentEnrollmentReason: preRegistration.studentEnrollmentReason,
      otherComment: preRegistration.otherComment,
    };
  }

  public static toPreRegistrationDTO(
    preRegistration: Populate<PreRegistrationMetaData, "level" | "classType">,
  ): PreRegistrationDTO {
    return {
      ...this.toPublicPreRegistrationDTO(preRegistration),
      createdAt: preRegistration.createdAt,
      status: preRegistration.status,
      isRegister: preRegistration.isRegister,
    };
  }

  public static toAddParentUseCaseDTO(preRegistration: PreRegistration): AddParentRequest {
    const randomPassword = RandomUtils.generateRandomNumber(8).toString();

    if (!preRegistration.parentFirstName || !preRegistration.parentLastName)
      throw new BadRequestError("preRegistration.missingInformation");

    if (!preRegistration.parentEmail && !preRegistration.parentPhoneNumber)
      throw new BadRequestError("preRegistration.missingInformation");

    return {
      firstName: preRegistration.parentFirstName,
      lastName: preRegistration.parentLastName,
      gender: GENDER_ENUM.MALE,
      email: preRegistration.parentEmail || undefined,
      avatar: null,
      roles: [],
      phoneNumber: preRegistration.parentPhoneNumber || undefined,
      address1: preRegistration.parentAddress || undefined,
      password: randomPassword,
    };
  }

  public static toAddStudentUseCaseDTO(preRegistration: PreRegistration): AddStudentRequest {
    const randomPassword = RandomUtils.generateRandomNumber(8).toString();

    if (
      !preRegistration.studentFirstName ||
      !preRegistration.studentLastName ||
      !preRegistration.studentGender ||
      !preRegistration.level ||
      !preRegistration.classType
    )
      throw new BadRequestError("preRegistration.missingInformation");

    return {
      firstName: preRegistration.studentFirstName,
      lastName: preRegistration.studentLastName,
      gender: preRegistration.studentGender,
      email: preRegistration.studentEmail || undefined,
      avatar: null,
      roles: [],
      level: preRegistration.level,
      classType: preRegistration.classType,
      parents: [],
      password: randomPassword,
    };
  }
}
