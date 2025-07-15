import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Level } from "../../levels/domains/level.entity";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { UserService } from "../../users/domain/User.service";
import { PreRegistration, TPreRegistrationStatuesEnum } from "../domains/preRegistration.entity";
import { PreRegistrationRepo } from "../domains/PreRegistration.repo";
import { TGenderEnum } from "../../users/domain/baseUser.entity";

type TUpdatePreRegistrationValidation = {
  status?: TPreRegistrationStatuesEnum;
} & ParentInformation &
  StudentInformation &
  EnrollmentDetails &
  OtherInformation &
  FilePreRegistration;

@injectable()
export class UpdatePreRegistrationUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(preRegistrationId: ID | null, data: TUpdatePreRegistrationValidation): Promise<ID> {
    let preRegistration: PreRegistration;

    if (preRegistrationId)
      preRegistration = await this.preRegistrationRepo.findOneByIdOrThrow(
        preRegistrationId,
        "notFound.preRegistration",
      );
    else preRegistration = await this.preRegistrationRepo.addEmptyOne();

    let classType: ClassType | undefined = undefined;
    if (data.classTypeNewId)
      classType = await this.classTypeRepo.findOneByNewIdOrThrow(
        data.classTypeNewId,
        "notFound.classType",
      );

    let level: Level | undefined = undefined;
    if (data.levelNewId)
      level = await this.levelRepo.findOneByNewIdOrThrow(data.levelNewId, "notFound.level");

    const newBirthDayCertificate = await this.fileManager.handelEditFile({
      currentFiles: preRegistration.birthCertificate.map(file => ({
        ...file,
        path: file.public_id,
        uploadedAt: file.date,
        link: file.url,
      })),
      newFiles: data.birthCertificateFiles || [],
      filePath: "preRegistration",
      filesPathToBeDeleted: data.deletedBirthCertificate,
    });

    const newPreviousTranscripts = await this.fileManager.handelEditFile({
      currentFiles: preRegistration.previousTranscripts.map(file => ({
        ...file,
        path: file.public_id,
        uploadedAt: file.date,
        link: file.url,
      })),
      newFiles: data.previousTranscriptsFiles || [],
      filePath: "preRegistration",
      filesPathToBeDeleted: data.deletedPreviousTranscripts,
    });

    const newParentFullName = UserService.generateFullName(
      data.parentFirstName || preRegistration.parentFirstName || "",
      data.parentLastName || preRegistration.parentLastName || "",
    );

    const newStudentFullName = UserService.generateFullName(
      data.studentFirstName || preRegistration.studentFirstName || "",
      data.studentLastName || preRegistration.studentLastName || "",
    );

    await this.preRegistrationRepo.updateOneById(preRegistration._id, {
      ...data,
      birthCertificate: newBirthDayCertificate?.map(file => ({
        ...file,
        url: file.link,
        public_id: file.path,
        date: file.uploadedAt,
      })),
      previousTranscripts: newPreviousTranscripts?.map(file => ({
        ...file,
        url: file.link,
        public_id: file.path,
        date: file.uploadedAt,
      })),
      level: level?._id,
      classType: classType?._id,
      studentFullName: newStudentFullName,
      parentFullName: newParentFullName,
    });

    return preRegistration._id;
  }
}

type ParentInformation = {
  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  parentPhoneNumber?: string;
  preferredLanguage?: string;
  parentAddress?: string;
  job?: string;
};

type StudentInformation = {
  studentFirstName?: string;
  studentLastName?: string;
  studentEmail?: string;
  studentPhoneNumber?: string;
  nationality?: string;
  studentGender?: TGenderEnum;
  studentAddress?: string;
  studentBirthDate?: Date;
  spokenLanguages?: string[];
};

type EnrollmentDetails = {
  levelNewId?: string;
  classTypeNewId?: string;
  previousSchoolInfo?: string;
};

type OtherInformation = {
  communicationType?: string;
  studentEnrollmentReason?: string;
  otherComment?: string;
};

type FilePreRegistration = {
  deletedBirthCertificate?: string[];
  deletedPreviousTranscripts?: string[];
  birthCertificateFiles?: FileUploadPayload[] | null;
  previousTranscriptsFiles?: FileUploadPayload[] | null;
};
