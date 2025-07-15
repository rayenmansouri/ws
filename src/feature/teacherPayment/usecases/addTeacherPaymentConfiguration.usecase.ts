import { TPaymentTypeEnum } from "../domain/teacherPaymentConfiguration.entity";
import { FileDetails } from "./../../../core/fileManager/FileManager";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { FileUploadPayload } from "../../../core/fileManager/FileManager";
import { FileManager } from "../../../core/fileManager/FileManager";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";

export type addTeacherPaymentConfigurationRequestDto = {
  teacherNewId: string;
  files?: FileUploadPayload[];
  paymentType: TPaymentTypeEnum;
  contractType: string;
  amount: number;
  bankAccountId: string | null;
};
@injectable()
export class AddTeacherPaymentConfigurationUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("FileManager") private readonly fileManager: FileManager,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: addTeacherPaymentConfigurationRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    const uploadedContracts: FileDetails[] = [];
    if (dto.files && dto.files.length > 0) {
      for (const buffer of dto.files) {
        const uploadedContract = await this.fileManager.uploadFile(
          buffer,
          "teacherPaymentConfiguration",
        );
        uploadedContracts.push(uploadedContract);
      }
    }

    await this.teacherPaymentConfigurationRepo.addOne({
      paymentType: dto.paymentType,
      contractType: dto.contractType,
      attachment: uploadedContracts.map(file => {
        return { ...file, public_id: file.path, url: file.link };
      }),
      teacher: teacher._id,
      bankAccountId: dto.bankAccountId,
      amount: dto.amount,
    });

    if (dto.paymentType === "hourly") {
      await this.sessionRepo.updatePaidTeacherStatus(teacher._id, false);
    }
  }
}
