import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { NotFoundError } from "./../../../core/ApplicationErrors";
import { addTeacherPaymentConfigurationRequestDto } from "./addTeacherPaymentConfiguration.usecase";

export type updateTeacherPaymentConfigurationRequestDto =
  Partial<addTeacherPaymentConfigurationRequestDto> & { deletedAttachments?: string[] };

@injectable()
export class UpdateTeacherPaymentConfigurationUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("FileManager") private readonly fileManager: FileManager,
  ) {}

  async execute(dto: updateTeacherPaymentConfigurationRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId!,
      "notFound.teacher",
    );

    const paymentConfiguration = await this.teacherPaymentConfigurationRepo.findOneByTeacherId(
      teacher._id,
    );

    if (!paymentConfiguration) throw new NotFoundError("notFound.teacherPaymentConfiguration");
    const newFiles = [];

    if (dto.files && dto.files.length > 0) {
      for (const buffer of dto.files) {
        const uploadedContract = await this.fileManager.uploadFile(
          buffer,
          "teacherPaymentConfiguration",
        );
        newFiles.push({
          ...uploadedContract,
          public_id: uploadedContract.path,
          url: uploadedContract.link,
        });
      }
    }

    if (dto.deletedAttachments && dto.deletedAttachments.length > 0)
      await this.fileManager.deleteFiles(dto.deletedAttachments);

    const filteredAttachments = paymentConfiguration.attachment
      .filter(attachment => (dto.deletedAttachments || []).includes(attachment.public_id))
      .concat(newFiles);

    await this.teacherPaymentConfigurationRepo.updateOneById(paymentConfiguration._id, {
      attachment: filteredAttachments,
      bankAccountId: dto.bankAccountId || paymentConfiguration.bankAccountId,
      contractType: dto.contractType || paymentConfiguration.contractType,
      amount: dto.amount,
      paymentType: dto.paymentType,
    });
  }
}
