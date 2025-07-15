import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherPaymentHistoryRepo } from "../domain/TeacherPaymentHistory.repo";
import { NotFoundError } from "./../../../core/ApplicationErrors";
import { ID } from "./../../../types/BaseEntity";
import {
  calculateTeacherFinalSalaryParamsDto,
  TeacherPaymentConfigurationService,
} from "./../shared/TeacherPaymentConfigurationService";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import moment from "moment";

export type deleteTeacherPaymentTransactionRequestDto = {
  teacherPaymentHistoryId: ID;
  transactionId: ID;
};

@injectable()
export class DeleteTeacherPaymentTransactionUseCase {
  constructor(
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("TeacherPaymentHistoryRepo")
    private readonly teacherPaymentHistoryRepo: TeacherPaymentHistoryRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: deleteTeacherPaymentTransactionRequestDto): Promise<void> {
    const teacherPaymentHistory = await this.teacherPaymentHistoryRepo.findOneByIdOrThrow(
      dto.teacherPaymentHistoryId,
      "notFound.paymentHistory",
    );

    const paymentConfiguration = await this.teacherPaymentConfigurationRepo.findOneByTeacherId(
      teacherPaymentHistory.teacher,
    );

    if (!paymentConfiguration) throw new NotFoundError("notFound.teacherPaymentConfiguration");

    const startTime = moment({
      month: teacherPaymentHistory.month,
      year: teacherPaymentHistory.year,
    })
      .startOf("month")
      .toDate();
    const endTime = moment({ month: teacherPaymentHistory.month, year: teacherPaymentHistory.year })
      .endOf("month")
      .toDate();

    const hourlyDistributions = await this.sessionRepo.getTeacherHourDistribution(
      startTime,
      endTime,
      teacherPaymentHistory.teacher,
    );

    const newTransactionAdjustment = teacherPaymentHistory.transactionAdjustment.filter(
      trunc => trunc._id !== dto.transactionId,
    );

    if (newTransactionAdjustment.length === teacherPaymentHistory.transactionAdjustment.length)
      throw new NotFoundError("notFound.transaction");

    const calculateTeacherPaymentConfigurationParams: calculateTeacherFinalSalaryParamsDto = {
      transactionsAdjustment: newTransactionAdjustment,
      currentPaymentType: paymentConfiguration.paymentType,
      currentSalaryAmount: paymentConfiguration.amount,
      hourlyDistributions: hourlyDistributions,
    };

    TeacherPaymentConfigurationService.calculateTeacherFinalSalary(
      calculateTeacherPaymentConfigurationParams,
    );

    await this.teacherPaymentHistoryRepo.updateOneById(dto.teacherPaymentHistoryId, {
      transactionAdjustment: newTransactionAdjustment,
    });
  }
}
