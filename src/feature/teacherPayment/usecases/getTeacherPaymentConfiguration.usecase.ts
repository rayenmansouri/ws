import { TPaymentTypeEnum } from "./../../teacherPayment/domain/teacherPaymentConfiguration.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { NotFoundError } from "./../../../core/ApplicationErrors";

export type getTeacherPaymentConfigurationRequestDto = {
  teacherNewId: string;
};

export type getTeacherPaymentConfigurationResponseDto = {
  contractType: string;
  amount: number;
  attachment: { public_id: string; url: string; name: string }[];
  paymentType: TPaymentTypeEnum;
  bankAccountId: string | null;
};

@injectable()
export class GetTeacherPaymentConfigurationUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
  ) {}

  async execute(
    dto: getTeacherPaymentConfigurationRequestDto,
  ): Promise<getTeacherPaymentConfigurationResponseDto> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );
    if (teacher.isArchived) throw new NotFoundError("notFound.teacher");

    const teacherPaymentConfiguration =
      await this.teacherPaymentConfigurationRepo.findOneByTeacherId(teacher._id);

    if (!teacherPaymentConfiguration)
      throw new NotFoundError("notFound.teacherPaymentConfiguration");

    return {
      contractType: teacherPaymentConfiguration.contractType,
      amount: teacherPaymentConfiguration.amount,
      attachment: teacherPaymentConfiguration.attachment,
      paymentType: teacherPaymentConfiguration.paymentType,
      bankAccountId: teacherPaymentConfiguration.bankAccountId,
    };
  }
}
