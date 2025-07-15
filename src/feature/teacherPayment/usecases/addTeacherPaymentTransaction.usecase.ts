import { calculateTeacherFinalSalaryParamsDto } from "./../shared/TeacherPaymentConfigurationService";
import { TeacherPaymentConfigurationService } from "./../shared/TeacherPaymentConfigurationService";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherPaymentHistoryRepo } from "../domain/TeacherPaymentHistory.repo";
import { BadRequestError, NotFoundError } from "./../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { TTransactionAdjustmentTypeEnum } from "./../domain/teacherPaymentConfiguration.entity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import moment from "moment";

export type AddTeacherPaymentTransactionRequestDto = {
  teacherNewId: string;
  adminId: ID;
  tenantId: string;
  month: number;
  year: number;
  name: string;
  type: TTransactionAdjustmentTypeEnum;
  amount: number;
};
@injectable()
export class AddTeacherPaymentTransactionUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("AdminRepo") private readonly adminRepo: AdminRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("TeacherPaymentHistoryRepo")
    private readonly teacherPaymentHistoryRepo: TeacherPaymentHistoryRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: AddTeacherPaymentTransactionRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    if (teacher.isArchived) throw new NotFoundError("notFound.teacher");

    const [admin, paymentConfiguration, paymentHistory] = await Promise.all([
      this.adminRepo.findOneByIdOrThrow(dto.adminId, "notFound.admin"),
      this.teacherPaymentConfigurationRepo.findOneByTeacherId(teacher._id),
      this.teacherPaymentHistoryRepo.findOneByTeacherMonthAndYear(teacher._id, dto.month, dto.year),
    ]);

    if (!paymentConfiguration) throw new NotFoundError("notFound.teacherPaymentConfiguration");
    if (paymentHistory && paymentHistory.hasPaid) throw new BadRequestError("teacher.alreadyPaid");

    const transactionAdjustment = (paymentHistory?.transactionAdjustment || []).concat({
      type: dto.type,
      amount: dto.amount,
      insertedAt: getCurrentTimeOfSchool(dto.tenantId),
      paidBy: admin._id,
      name: dto.name,
    });

    const startTime = moment({ month: dto.month, year: dto.year }).startOf("month").toDate();
    const endTime = moment({ month: dto.month, year: dto.year }).endOf("month").toDate();

    const hourlyDistributions = await this.sessionRepo.getTeacherHourDistribution(
      startTime,
      endTime,
      teacher._id,
    );

    const calculateTeacherPaymentConfigurationParams: calculateTeacherFinalSalaryParamsDto = {
      transactionsAdjustment: transactionAdjustment,
      currentPaymentType: paymentConfiguration.paymentType,
      currentSalaryAmount: paymentConfiguration.amount,
      hourlyDistributions: hourlyDistributions,
    };

    TeacherPaymentConfigurationService.calculateTeacherFinalSalary(
      calculateTeacherPaymentConfigurationParams,
    );

    if (!paymentHistory) {
      await this.teacherPaymentHistoryRepo.addOne({
        month: dto.month,
        year: dto.year,
        teacher: teacher._id,
        transactionAdjustment: [
          {
            name: dto.name,
            amount: dto.amount,
            type: dto.type,
            insertedAt: getCurrentTimeOfSchool(dto.tenantId),
            paidBy: admin._id,
          },
        ],
        level: null,
        baseAmount: null,
        hasPaid: false,
        paidBy: null,
        paidAt: null,
      });
      return;
    }

    await this.teacherPaymentHistoryRepo.addTransactionAdjustment(
      {
        month: dto.month,
        year: dto.year,
        teacher: teacher._id,
      },
      {
        name: dto.name,
        amount: dto.amount,
        type: dto.type,
        insertedAt: getCurrentTimeOfSchool(dto.tenantId),
        paidBy: admin._id,
      },
    );
  }
}
